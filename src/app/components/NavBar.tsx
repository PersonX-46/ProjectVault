"use client";
import { useState } from "react";
import Link from "next/link";
import { X, Menu, Home, BookOpen, UserCog, Search, GraduationCap } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-11/12 md:w-10/12 lg:w-8/12">
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-red-900/30 floating-container">
        {/* Gradient Outline */}
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-red-700 via-red-500 to-pink-700 p-[2px]">
          <div className="h-full w-full bg-gray-900/80 backdrop-blur-xl rounded-full"></div>
        </div>

        {/* Navbar Content */}
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border border-red-500 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800">
              <GraduationCap className="text-white" size={20} />
            </div>
            <h1 className="ml-3 text-white font-extrabold text-lg">
              <Link href="/" className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                MSU College Project Management
              </Link>
            </h1>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none hover:text-red-300 transition-colors"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Desktop Links with Icons */}
          <div className="hidden md:flex space-x-6 pl-3 items-center">
            {[
              { name: "Home", href: "/", icon: <Home size={18} /> },
              { name: "Browse", href: "/student-login", icon: <Search size={18} /> },
              { name: "Admin", href: "/login", icon: <UserCog size={18} /> },
            ].map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-2 text-gray-300 font-medium hover:text-white transition-colors group"
              >
                <span className="group-hover:text-red-400 transition-colors">{icon}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:flex">
            <Link
              href="/student-login"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full shadow-md hover:shadow-red-900/50 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        {isOpen && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900/95 border-2 border-red-700 shadow-lg rounded-lg py-4 mt-2 w-64 animate-fadeIn"
          >
            <div className="flex flex-col items-center space-y-4">
              {[
                { name: "Home", href: "/", icon: <Home size={18} /> },
                { name: "Browse Projects", href: "/student-login", icon: <Search size={18} /> },
                { name: "Admin Portal", href: "/dashboard", icon: <UserCog size={18} /> },
                {
                  name: "Sign In",
                  href: "/student-login",
                  icon: <BookOpen size={18} />,
                  button: true,
                },
              ].map(({ name, href, icon, button }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-2 ${
                    button
                      ? "px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-full hover:shadow-red-900/30"
                      : "font-medium text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={button ? "" : "text-red-400"}>{icon}</span> {name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        .floating-container::before,
        .floating-container::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: rgba(239, 68, 68, 0.6);
          border-radius: 50%;
          filter: blur(3px);
          animation: floatAnimation 3s infinite alternate ease-in-out;
        }

        .floating-container::before {
          top: 50%;
          left: 15%;
          animation-duration: 3s;
        }

        .floating-container::after {
          top: 40%;
          left: 85%;
          animation-duration: 4s;
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
