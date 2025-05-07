"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLaptopCode, FaDatabase, FaRobot, FaCode, FaSearch, FaUserShield } from "react-icons/fa";
import { SiJavascript, SiPython, SiReact } from "react-icons/si";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 45° Gradient Divider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-transparent w-1/2"></div>
        <div 
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-red-600 to-transparent"
          style={{ transform: 'rotate(45deg) translateX(-50%)' }}
        ></div>
        <div className="absolute inset-0 left-1/2 bg-gradient-to-br from-transparent via-black to-black"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-screen flex items-center px-6">
        {/* Left Side - Text Content */}
        <div className="w-1/2 pr-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              Project Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            The definitive archive for final year projects. Search, discover, and manage academic work from your institution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <Link
              href="/student/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-bold text-white hover:shadow-xl hover:shadow-red-900/50 transition-all flex items-center gap-2"
            >
              <FaSearch /> Browse Projects
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-red-500 text-red-400 rounded-lg font-bold hover:bg-red-900/30 transition-all flex items-center gap-2"
            >
              <FaUserShield /> Admin Portal
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Tech Icons */}
        <div className="ml-10 w-1/2 pl-10">
          <div className="grid grid-cols-3 gap-8 relative">
            {/* Floating Tech Icons with Animation */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <FaLaptopCode className="text-red-400 text-4xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <SiReact className="text-red-400 text-4xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <FaDatabase className="text-red-400 text-4xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <SiPython className="text-red-400 text-4xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <FaRobot className="text-red-400 text-4xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="col-span-1 row-span-1 flex justify-center"
            >
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition-all">
                <SiJavascript className="text-red-400 text-4xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Abstract Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 flex flex-col items-center"
        >
          <span className="mb-2">Scroll to explore</span>
          <div className="w-4 h-8 border-2 border-red-500 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-red-400 rounded-full mt-1"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}