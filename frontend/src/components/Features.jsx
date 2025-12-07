import { FaRobot, FaShieldAlt, FaBolt, FaHandHoldingUsd } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { icon: <FaRobot />, title: "AI-Powered Support", text: "Instant answers—no wait times." },
  { icon: <FaShieldAlt />, title: "Secure & Private", text: "Bank-grade authentication and encryption." },
  { icon: <FaBolt />, title: "Fast Execution", text: "Check statements, EMIs, limits in seconds." },
  { icon: <FaHandHoldingUsd />, title: "Smart Insights", text: "Spend analysis and tailored suggestions." },
];

export default function Features() {
  return (
    <section className="py-20 bg-lightGray" id="features">
      <motion.h2
        className="text-3xl font-bold text-center mb-10 text-dark"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why FinAI?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-primary text-4xl mb-4">{f.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
