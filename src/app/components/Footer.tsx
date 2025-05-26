"use client";
import { FaGithub, FaLinkedin, FaTwitter, FaUniversity, FaBook, FaShieldAlt, FaArrowRight, FaLifeRing, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-pink-900/10 to-transparent"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Footer Grid - Simplified to 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                <FaUniversity className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                MSU College Project Management
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The definitive project management system for academic institutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-red-400 transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-400 transition-colors">
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </motion.div>

          {/* Essential Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaArrowRight className="text-red-400" />
                <span>System</span>
              </h3>
              <ul className="space-y-3">
                <li><a href="/student-dashboard" className="text-gray-400 hover:text-red-400 transition-colors">Dashboard</a></li>
                <li><a href="/student-dashboard" className="text-gray-400 hover:text-red-400 transition-colors">Projects</a></li>
                <li><a href="/student-dashboard" className="text-gray-400 hover:text-red-400 transition-colors">Requests</a></li>
                <li><a href="/admin" className="text-gray-400 hover:text-red-400 transition-colors">Admin</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-red-400" />
                <span>Legal</span>
              </h3>
              <ul className="space-y-3">
                <li><a href="/terms-privacy#terms" className="text-gray-400 hover:text-red-400 transition-colors">Terms</a></li>
                <li><a href="/terms-privacy#privacy" className="text-gray-400 hover:text-red-400 transition-colors">Privacy</a></li>
                <li><a href="/terms-privacy#contact" className="text-gray-400 hover:text-red-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent my-6"></div>

        {/* Bottom Bar - Simplified */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} MSU College Project Management. Academic use only.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="/contact-support" 
              className="text-gray-500 hover:text-red-400 transition-colors text-sm flex items-center gap-1"
            >
              <FaLifeRing className="text-sm" /> Support
            </a>
          </motion.div>
        </div>
      </div>

      {/* Minimal Floating Particles */}
      <div className="absolute bottom-0 left-0 w-full h-10 overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500 rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              bottom: Math.random() * 10 + 'px',
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [0, -Math.random() * 20 - 5],
              opacity: [0.1, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </footer>
  );
}