"use client";
import { FaBullseye, FaEye, FaRocket, FaBrain, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="relative bg-black overflow-hidden py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-900/10 to-transparent"></div>
      </div>

      {/* Diagonal Red Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent transform -translate-y-1/2 rotate-3 z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              Our Purpose & Direction
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Driving academic excellence through innovation and collaboration
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600 via-pink-600 to-red-800 p-[2px] opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 overflow-hidden">
              {/* Floating Icon */}
              <div className="absolute -top-10 -right-10 text-red-900/20">
                <FaBullseye className="text-[200px]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                    <FaRocket className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                
                <p className="text-gray-300 mb-6 text-lg">
                  To revolutionize academic project management by providing a secure, intuitive platform that preserves institutional knowledge, fosters innovation, and connects generations of students through their scholarly work.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Preserve academic legacy",
                    "Enable seamless knowledge transfer",
                    "Foster interdisciplinary collaboration",
                    "Empower student innovation"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-red-400 mt-1">
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-600 via-red-600 to-pink-800 p-[2px] opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 overflow-hidden">
              {/* Floating Icon */}
              <div className="absolute -top-10 -left-10 text-pink-900/20">
                <FaEye className="text-[200px]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center">
                    <FaBrain className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                
                <p className="text-gray-300 mb-6 text-lg">
                  To become the global standard for academic project preservation, transforming how institutions curate, access, and build upon student research across generations.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Global academic network",
                    "AI-powered research insights",
                    "Blockchain-secured archives",
                    "Cross-institutional collaboration"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-pink-400 mt-1">
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Our Core Values
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHandshake className="text-4xl" />,
                title: "Collaboration",
                desc: "We believe in the power of shared knowledge across generations"
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Integrity",
                desc: "Academic honesty and proper attribution are fundamental"
              },
              {
                icon: <FaRocket className="text-4xl" />,
                title: "Innovation",
                desc: "Continually evolving to serve the academic community better"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-red-500/50 transition-all text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500 rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
}