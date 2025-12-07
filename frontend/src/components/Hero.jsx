import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      <motion.h1
        className="text-5xl font-extrabold text-dark leading-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Meet <span className="text-primary">FinAI</span> — Your Smart Credit Card Assistant
      </motion.h1>

      <motion.p
        className="mt-6 text-gray-600 max-w-xl text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Track expenses, check statements, manage EMIs, and resolve card issues instantly — powered by AI.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Link
          to="/chat"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
        >
          Start Chatting
        </Link>

        <Link
          to="/signup"
          className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition"
        >
          Create Account
        </Link>
      </motion.div>
    </section>
  );
}
