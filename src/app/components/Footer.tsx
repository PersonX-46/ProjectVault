"use client";
import { FaGithub, FaLinkedin, FaTwitter, FaUniversity, FaBook, FaShieldAlt, FaArrowRight } from "react-icons/fa";
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                <FaUniversity className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                ProjectVault
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              The definitive archive for final year projects at your institution.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-red-400 transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-400 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaArrowRight className="text-red-400" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Browse Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Submission Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Library Access</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Academic Calendar</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaBook className="text-red-400" />
              <span>Resources</span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Templates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Citing Sources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">FAQ</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-red-400" />
              <span>Legal</span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Copyright</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">GDPR Compliance</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} ProjectVault. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <a href="#" className="text-gray-500 hover:text-red-400 transition-colors text-sm">Accessibility</a>
            <a href="#" className="text-gray-500 hover:text-red-400 transition-colors text-sm">Cookies</a>
            <a href="#" className="text-gray-500 hover:text-red-400 transition-colors text-sm">Contact</a>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500 rounded-full"
            style={{
              width: Math.random() * 5 + 1 + 'px',
              height: Math.random() * 5 + 1 + 'px',
              left: Math.random() * 100 + '%',
              bottom: Math.random() * 20 + 'px',
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, -Math.random() * 30 - 10],
              x: [0, (Math.random() - 0.5) * 20],
              opacity: [0.1, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </footer>
  );
}