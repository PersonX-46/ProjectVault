import Link from "next/link";
import { FaShieldAlt, FaFileContract, FaQuestionCircle } from "react-icons/fa";

export default function TermsAndPrivacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-pink-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">MSU Project Management</h1>
              <p className="mt-2 opacity-90">Terms & Privacy Information</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <FaShieldAlt className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Navigation */}
          <div className="flex flex-wrap gap-4 border-b pb-6">
            <a href="#terms" className="flex items-center gap-2 text-red-700 font-medium">
              <FaFileContract /> Terms of Service
            </a>
            <a href="#privacy" className="flex items-center gap-2 text-red-700 font-medium">
              <FaShieldAlt /> Privacy Policy
            </a>
            <a href="#contact" className="flex items-center gap-2 text-red-700 font-medium">
              <FaQuestionCircle /> Contact
            </a>
          </div>

          {/* Terms of Service */}
          <section id="terms" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Terms of Service</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">1. Acceptance of Terms</h3>
              <p className="text-gray-600">
                By accessing and using the MSU Project Management System, you agree to comply with these terms.
                If you disagree with any part, you may not use our services.
              </p>

              <h3 className="text-lg font-semibold text-gray-700">2. User Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>You must be a registered student or faculty member of MSU</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>All project submissions must be your original work</li>
                <li>Borrowing requests must be made in good faith</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700">3. Project Ownership</h3>
              <p className="text-gray-600">
                Projects submitted remain the intellectual property of the creator. 
                Borrowing a project grants temporary access only and does not transfer rights.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Privacy Policy</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">1. Data Collection</h3>
              <p className="text-gray-600">
                We collect necessary information including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Name and contact information</li>
                <li>University identification details</li>
                <li>Project submissions and metadata</li>
                <li>Borrowing request history</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700">2. Data Usage</h3>
              <p className="text-gray-600">
                Your data is used solely for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>System functionality and project management</li>
                <li>Academic record-keeping</li>
                <li>Improving user experience</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700">3. Data Protection</h3>
              <p className="text-gray-600">
                We implement industry-standard security measures including encryption, 
                access controls, and regular audits to protect your information.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact" className="pt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Contact Us</h2>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>For questions about these terms or privacy practices:</p>
              <p><strong>Email:</strong> projects@msu.edu</p>
              <p><strong>Office:</strong> MSU Computer Science Department, Room 215</p>
              <p><strong>Hours:</strong> Monday-Friday, 9am-5pm</p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 mt-8 border-t text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="mt-2">© {new Date().getFullYear()} MSU Project Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}