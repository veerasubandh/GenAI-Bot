import { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Chat() {
  const [customerId, setCustomerId] = useState(localStorage.getItem("finai_user_id") || "CUST1001");
  const [sessionId, setSessionId] = useState(localStorage.getItem("finai_session_id") || "");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "bot",
      text: "Hi, I’m FinAI 👋 — your smart credit card assistant. Ask me about card delivery, bills, EMIs or repayments."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // ---- 🎤 Speech Recognition Setup ----
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript, true);
        setListening(false);
      };

      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
      setSpeechSupported(true);
    }
  }, []);

  // ---- 🔊 Text-to-Speech ----
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  };

  // ---- 🎙 Toggle Voice Input ----
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setListening(!listening);
  };

  // ---- Scroll on new messages ----
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ---- ✉️ Sending a Message ----
  const handleSend = async (forcedText = null, isVoice = false) => {
    const messageText = forcedText ?? input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: messageText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customerId ? { "x-user-id": customerId } : {}),
          ...(sessionId ? { "x-session-id": sessionId } : {})
        },
        body: JSON.stringify({ message: messageText, channel: isVoice ? "voice" : "web" })
      });

      const json = await res.json();

      if (!json.success) throw new Error(json.message);

      const { response, intent, requiresAuth, sessionId: newSessionId } = json.data;

      if (newSessionId && newSessionId !== sessionId) {
        setSessionId(newSessionId);
        localStorage.setItem("finai_session_id", newSessionId);
      }

      localStorage.setItem("finai_user_id", customerId);

      const reply = requiresAuth ? "🔐 Please log in to continue." : response;

      setMessages((prev) => [...prev, { id: Date.now(), from: "bot", text: reply, intent }]);
      speak(reply);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), from: "bot", text: "⚠️ Error contacting FinAI." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar remains same as landing page */}
      <Navbar />

      {/* Chat Container WITH FIXED TOP SPACING */}
      <div className="flex justify-center px-4 pt-[100px] pb-6">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl flex flex-col h-[80vh]">

          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} from={msg.from} text={msg.text} intent={msg.intent} />
            ))}

            {loading && <p className="text-gray-500 text-sm animate-pulse">FinAI is typing...</p>}

            <div ref={bottomRef}></div>
          </div>

          {/* Sticky Input Area */}
          <div className="border-t p-4 sticky bottom-0 bg-white">
            <div className="flex items-center gap-3">
              <textarea
                placeholder="Type a message..."
                rows={1}
                className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              />

              {speechSupported && (
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-full ${
                    listening ? "bg-red-500 text-white animate-pulse" : "bg-gray-200"
                  }`}
                >
                  <FaMicrophone />
                </button>
              )}

              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-primary text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---- Chat Bubbles ----
function ChatBubble({ from, text, intent }) {
  const isUser = from === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`px-4 py-2 rounded-xl text-sm max-w-[70%] whitespace-pre-wrap ${
          isUser ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
        {!isUser && intent && (
          <p className="text-[10px] mt-1 text-gray-500 uppercase">intent: {intent}</p>
        )}
      </div>
    </motion.div>
  );
}
