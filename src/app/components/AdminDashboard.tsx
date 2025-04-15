 "use client";
import { useState } from "react";
import { 
  FaChartPie, 
  FaBook, 
  FaUsers, 
  FaBell, 
  FaSearch, 
  FaCalendarAlt,
  FaFileDownload,
  FaFileUpload,
  FaUserShield
} from "react-icons/fa";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#FF4560", "#00E396", "#008FFB", "#FEB019", "#775DD0"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for charts
  const projectData = [
    { name: "Computer Science", value: 45 },
    { name: "Electrical", value: 30 },
    { name: "Mechanical", value: 25 },
    { name: "Civil", value: 20 },
    { name: "Biotech", value: 15 }
  ];

  const yearlyData = [
    { year: "2020", projects: 35 },
    { year: "2021", projects: 42 },
    { year: "2022", projects: 58 },
    { year: "2023", projects: 65 },
    { year: "2024", projects: 28 }
  ];

  // Sample borrow requests
  const borrowRequests = [
    { id: 1, student: "John Doe", project: "AI Chatbot Development", date: "2023-05-15", status: "pending" },
    { id: 2, student: "Jane Smith", project: "Renewable Energy System", date: "2023-05-10", status: "approved" },
    { id: 3, student: "Mike Johnson", project: "Blockchain Implementation", date: "2023-05-05", status: "rejected" },
    { id: 4, student: "Sarah Williams", project: "IoT Smart Home", date: "2023-05-01", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-red-900 to-pink-900 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <FaUserShield className="text-red-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-200 hover:text-white">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500"></div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex">
        {/* Sidebar */}
        <aside className="w-64 pr-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <nav className="space-y-2">
              {[
                { icon: <FaChartPie />, name: "Overview", tab: "overview" },
                { icon: <FaBook />, name: "Projects", tab: "projects" },
                { icon: <FaUsers />, name: "Students", tab: "students" },
                { icon: <FaFileDownload />, name: "Borrow Requests", tab: "requests" },
                { icon: <FaFileUpload />, name: "Upload Project", tab: "upload" },
                { icon: <FaCalendarAlt />, name: "Calendar", tab: "calendar" }
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.tab ? "bg-gradient-to-r from-red-600/30 to-pink-600/30 text-red-300 border border-red-500/30" : "text-gray-400 hover:bg-gray-700/50 hover:text-white"}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-white">143</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Pending Requests</p>
                <p className="text-2xl font-bold text-red-400">7</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-white">89</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                {[
                  { title: "Projects Uploaded", value: "143", change: "+12%", icon: <FaBook className="text-2xl" />, color: "from-red-600 to-pink-600" },
                  { title: "Active Requests", value: "7", change: "-3%", icon: <FaFileDownload className="text-2xl" />, color: "from-orange-600 to-red-600" },
                  { title: "Registered Students", value: "89", change: "+5%", icon: <FaUsers className="text-2xl" />, color: "from-purple-600 to-pink-600" }
                ].map((card, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">{card.title}</p>
                        <p className="text-3xl font-bold mt-2">{card.value}</p>
                        <p className={`text-sm mt-1 ${card.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {card.change} from last month
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Projects by Department</h3>
                  <div className="h-64">
                    <PieChart width={400} height={300}>
                      <Pie
                        data={projectData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">Projects by Year</h3>
                  <div className="h-64">
                    <BarChart
                      width={400}
                      height={300}
                      data={yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                      <XAxis dataKey="year" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563" }}
                      />
                      <Legend />
                      <Bar dataKey="projects" fill="#FF4560" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Borrow Requests</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {borrowRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{request.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.project}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "approved" ? "bg-green-900/50 text-green-300" :
                              request.status === "rejected" ? "bg-red-900/50 text-red-300" :
                              "bg-yellow-900/50 text-yellow-300"
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex space-x-2">
                              <button className="text-green-400 hover:text-green-300">Approve</button>
                              <button className="text-red-400 hover:text-red-300">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold mb-6">Project Management</h2>
                {/* Project management content would go here */}
                <p className="text-gray-400">Project list and management tools will be displayed here.</p>
              </div>
            </motion.div>
          )}

          {/* Other tabs would follow the same pattern */}
        </main>
      </div>
    </div>
  );
}