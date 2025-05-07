"use client";
import { FaGlobe, FaLightbulb, FaGraduationCap, FaUsers, FaChartLine, FaHandsHelping, FaBalanceScale, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";

export default function MissionVision() {
  return (
    <section className="relative bg-black overflow-hidden py-28 px-4">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Stellar Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* Nebula Gradients */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-900/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-cyan-900/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-800 mr-4"></div>
            <span className="text-sm font-semibold tracking-wider text-cyan-300">OUR GUIDING PRINCIPLES</span>
            <div className="w-12 h-1 bg-gradient-to-r  from-red-400 to-red-800 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-100 leading-tight">
            Vision & Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Charting the course for transformative education and global impact
          </p>
        </motion.div>

        {/* Vision Orb */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center mb-28"
        >
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-xl animate-pulse"></div>
          <div className="relative z-10 bg-gray-900/70 backdrop-blur-md border border-gray-800/50 rounded-3xl p-10 max-w-3xl shadow-xl shadow-cyan-900/10 hover:shadow-purple-900/20 transition-all duration-500">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-purple-600 shadow-lg">
                <FiTarget className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Our Vision</h3>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              To emerge as a beacon of transformative education, where cutting-edge research, entrepreneurial spirit, 
              and cultural diversity converge to shape visionary leaders who will pioneer solutions for a sustainable 
              and interconnected global future.
            </p>
          </div>
        </motion.div>

        {/* Mission Constellation */}
        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
          
          {/* Mission Stars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {[
              {
                icon: <FaGraduationCap className="text-3xl text-white" />,
                title: "Transformative Education",
                desc: "Deliver compelling learning experiences through innovative pedagogy that bridges theory and practice, fostering intellectual curiosity and ethical leadership.",
                color: "from-amber-400 to-orange-500"
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: "Global Connectivity",
                desc: "Cultivate a worldwide network of knowledge exchange, maintaining cultural roots while embracing global diversity and mobility.",
                color: "from-emerald-400 to-teal-600"
              },
              {
                icon: <FaLightbulb className="text-3xl" />,
                title: "Innovation Ecosystem",
                desc: "Champion interdisciplinary research and innovation that addresses pressing challenges, translating ideas into tangible societal benefits.",
                color: "from-purple-400 to-indigo-600"
              },
              {
                icon: <FaChartLine className="text-3xl" />,
                title: "Industry Integration",
                desc: "Forge dynamic partnerships with industries to align academic excellence with real-world applications and evolving career landscapes.",
                color: "from-rose-400 to-pink-600"
              },
              {
                icon: <FaHandsHelping className="text-3xl" />,
                title: "Inclusive Empowerment",
                desc: "Ensure equitable access to education, unlocking potential regardless of background, and nurturing talents to their fullest expression.",
                color: "from-blue-400 to-cyan-600"
              },
              {
                icon: <FaBalanceScale className="text-3xl" />,
                title: "Holistic Development",
                desc: "Shape well-rounded individuals equipped with intellectual rigor, emotional intelligence, and social consciousness for lifelong success.",
                color: "from-violet-400 to-fuchsia-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${index % 2 === 0 ? 'lg:mr-auto lg:pr-10 lg:text-right' : 'lg:ml-auto lg:pl-10 lg:text-left'} max-w-md`}
              >
                {/* Animated dot connector */}
                {index > 0 && (
                  <div className={`hidden lg:block absolute top-0 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-3 h-3 rounded-full bg-gradient-to-br ${item.color}`}></div>
                )}
                
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-10 backdrop-blur-sm border border-gray-800 hover:border-opacity-50 transition-all duration-300 ${index % 2 === 0 ? 'lg:border-r-4' : 'lg:border-l-4'} lg:border-t-0 lg:border-b-0`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h4 className={`text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${item.color} text-white`}>{item.title}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Horizon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-gray-800 mb-8">
            <span className="text-sm font-semibold text-cyan-200">TOWARDS 2030</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-6">Building a Better Future</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Through diversified pathways and responsible global citizenship, we commit to transforming lives and 
            contributing professional talent towards sustainable development and human flourishing.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block rounded-full pointer-events-none"
          style={{
            width: Math.random() * 200 + 100 + 'px',
            height: Math.random() * 200 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: `radial-gradient(circle, rgba(${Math.random() > 0.5 ? '100, 200, 255' : '200, 100, 255'}, ${Math.random() * 0.2})`,
            opacity: 0.1
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  );
}