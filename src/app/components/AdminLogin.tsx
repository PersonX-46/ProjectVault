"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid admin email");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (email === "admin@projectvault.edu" && password === "admin1234") {
        router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Left Side - Branding Content */}
        <div className="w-1/2 pr-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              Admin Portal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Restricted access to authorized personnel only. All activities are logged and monitored.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 text-red-400"
          >
            <FaUserShield className="text-xl" />
            <span className="font-medium">Institutional credentials required</span>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="ml-10 w-1/2 pl-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Gradient outline */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 via-pink-600 to-red-800 p-[2px] opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Administrator Login
                </span>
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Institutional Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaUserShield />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                      placeholder="admin@institution.edu"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaLock />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-red-900/50 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    "Access Dashboard"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 flex flex-col items-center"
        >
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