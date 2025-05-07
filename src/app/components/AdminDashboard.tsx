"use client";
import { useCallback, useEffect, useState } from "react";
import {
  FaChartPie,
  FaBook,
  FaUsers,
  FaBell,
  FaSearch,
  FaCalendarAlt,
  FaFileDownload,
  FaFileUpload,
  FaUserShield,
  FaTrash,
  FaEdit,
  FaTimes,
  FaPlus,
  FaFileAlt
} from "react-icons/fa";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { report } from "process";
import { useSession } from "next-auth/react";

type Admin = {
  admin_id: string;
  name: string;
  passwordHash: string;
};

type Student = {
  student_id: string;
  name: string;
  passwordHash: string;
  email: string;
  phone: string;
  address: string;
  prog_id: string;
  prog_name: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  student_id: string;
  category: string;
  admin_id: string;
  report_url?: string | null;
  grade: string;
  created_at: Date;
  updated_at: Date;
};

type Request = {
  id: string;
  student_id: string;
  project_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
};

type RequestStatus = 'pending' | 'approved' | 'rejected';


const COLORS = ["#FF4560", "#00E396", "#008FFB", "#FEB019", "#775DD0"];

export default function AdminDashboard() {

  // State hooks must be at the top level of the component
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: session } = useSession();

  // Project states
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Add these to your existing state declarations
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null); // Add this

  const categories = ["Web Application", "Mobile App", "Machine Learning", "Data Science", "IoT", "Cybersecurity"];

  // Form state - matches your existing structure
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    student_id: "",
    category: "",
    grade: "",
    report_url: ""
  });

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/project');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on search
  useEffect(() => {
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new project
  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      title: "",
      description: "",
      student_id: "",
      category: "",
      grade: "",
      report_url: ""
    });
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Only PDF and DOCX files are allowed');
      return;
    }

    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }

    setFile(selectedFile);
  };

  // Open modal for editing project
  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      student_id: project.student_id,
      category: project.category,
      grade: project.grade,
      report_url: project.report_url || ""
    });
    setIsModalOpen(true);
  };

  // Handle form submission (add/edit)
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionError(null);

    try {
      // Validate required fields
      const requiredFields = {
        'Project Title': formData.title.trim(),
        'Description': formData.description.trim(),
        'Student ID': formData.student_id.trim()
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([name]) => name);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Handle file upload
      let reportUrl = formData.report_url || null;
      if (file) {
        try {
          setIsUploading(true);
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          uploadFormData.append('projectTitle', formData.title);
          uploadFormData.append('studentId', formData.student_id);

          const uploadResponse = await fetch('/api/project/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`File upload failed: ${uploadResponse.status} - ${errorText}`);
          }

          const uploadResult = await uploadResponse.json();
          reportUrl = uploadResult.url;
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          throw new Error(`File upload failed: ${uploadError.message}`);
        } finally {
          setIsUploading(false);
        }
      }

      // Prepare submission data
      const submissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        student_id: formData.student_id.trim(),
        category: formData.category,
        grade: formData.grade,
        admin_id: "admin1",
        report_url: reportUrl,
        ...(currentProject ? { id: currentProject.id } : {}),
      };

      // Submit project data
      const url = currentProject
        ? `/api/project/${currentProject.id}`
        : '/api/project';
      const method = currentProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusText = response.statusText || 'Unknown error';
        throw new Error(
          errorData.message ||
          errorData.error ||
          `Server responded with ${response.status}: ${statusText}`
        );
      }

      const result = await response.json();

      // Update state
      if (currentProject) {
        setProjects(projects.map(p => p.id === currentProject.id ? result : p));
      } else {
        setProjects(prevProjects => [...prevProjects, result]);
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        student_id: "",
        category: "",
        grade: "",
        report_url: ""
      });
      setFile(null);
      setIsModalOpen(false);

    } catch (error) {
      console.error('Project submission error:', error);
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const yearlyData = [
    { year: "2020", projects: 35 },
    { year: "2021", projects: 42 },
    { year: "2022", projects: 58 },
    { year: "2023", projects: 65 },
    { year: "2024", projects: 28 }
  ];

  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];






  type Program = {
    id: string;
    name: string;
  };

  // State management for students
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isStudentLoading, setIsStudentLoading] = useState(false);


  // Form state - explicitly typed
  const [studentFormData, setStudentFormData] = useState({
    student_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    prog_id: "",
    prog_name: "",
    passwordHash: ""
  });


  const projectData = [
    { name: "Computer Science", value: 45 },
    { name: "Electrical", value: 30 },
    { name: "Mechanical", value: 25 },
    { name: "Civil", value: 20 },
    { name: "Biotech", value: 15 }
  ];

  // Mock programs data - should eventually come from API
  const [programs] = useState<Program[]>([
    { id: "CS101", name: "Computer Science" },
    { id: "EE101", name: "Electrical Engineering" },
    { id: "ME101", name: "Mechanical Engineering" },
    { id: "CE101", name: "Civil Engineering" }
  ]);

  // Fetch students from API
  const fetchStudents = useCallback(async () => {
    setIsStudentLoading(true);
    try {
      const response = await fetch('/api/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data: Student[] = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsStudentLoading(false);
    }
  }, []);

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Filter students based on search query
  useEffect(() => {
    const filtered = students.filter(student =>
      student.student_id.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
      student.prog_name.toLowerCase().includes(studentSearchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [studentSearchQuery, students]);

  // Handle form input changes
  const handleStudentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setStudentFormData(prev => ({
      ...prev,
      // Handle both 'password' and 'passwordHash' names
      [name === 'password' ? 'passwordHash' : name]: value,
      // Update program name when program ID changes
      ...(name === "prog_id" ? {
        prog_name: programs.find(p => p.id === value)?.name || ""
      } : {})
    }));
  };
  // Open modal for adding new student
  const openStudentAddModal = () => {
    setCurrentStudent(null);
    setStudentFormData({
      student_id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      prog_id: "",
      prog_name: "",
      passwordHash: ""
    });
    setIsStudentModalOpen(true);
  };

  // Open modal for editing student
  const openStudentEditModal = (student: Student) => {
    setCurrentStudent(student);
    setStudentFormData({
      student_id: student.student_id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      prog_id: student.prog_id,
      prog_name: student.prog_name,
      passwordHash: "" // Don't show password hash
    });
    setIsStudentModalOpen(true);
  };

  // Handle form submission (add/edit)
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStudentLoading(true);

    try {
      const url = currentStudent
        ? `/api/students/${currentStudent.student_id}`
        : '/api/students';
      const method = currentStudent ? 'PUT' : 'POST';

      // Prepare the data to send
      const requestData: Partial<Student> & { password?: string } = {
        student_id: studentFormData.student_id,
        name: studentFormData.name,
        email: studentFormData.email,
        phone: studentFormData.phone,
        address: studentFormData.address,
        prog_id: studentFormData.prog_id,
        prog_name: studentFormData.prog_name,
        passwordHash: studentFormData.passwordHash,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to save student');
      }

      const savedStudent: Student = await response.json();

      // Update state based on whether we're adding or editing
      if (currentStudent) {
        setStudents(students.map(s =>
          s.student_id === currentStudent.student_id ? savedStudent : s
        ));
      } else {
        setStudents(prev => [...prev, savedStudent]);
      }

      setIsStudentModalOpen(false);
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsStudentLoading(false);
    }
  };

  // Delete student
  const deleteStudent = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    setIsStudentLoading(true);
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      setStudents(prev => prev.filter(s => s.student_id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    } finally {
      setIsStudentLoading(false);
    }
  };








  // State management for requests
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [requestSearchQuery, setRequestSearchQuery] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState<"all" | Request['status']>("all");
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  // Fetch requests from API
  const fetchRequests = useCallback(async () => {
    setIsRequestLoading(true);
    try {
      const response = await fetch('/api/requests');
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data: Request[] = await response.json();
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsRequestLoading(false);
    }
  }, []);

  // Load requests on component mount
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Filter requests based on search and status
  useEffect(() => {
    let filtered = requests;

    // Apply status filter
    if (requestStatusFilter !== "all") {
      filtered = filtered.filter(request => request.status === requestStatusFilter);
    }

    // Apply search filter
    if (requestSearchQuery) {
      const query = requestSearchQuery.toLowerCase();
      filtered = filtered.filter(request =>
        request.id.toLowerCase().includes(query) ||
        (request.student_id || request.student_id).toLowerCase().includes(query) ||
        (request.project_id || request.project_id).toLowerCase().includes(query) ||
        request.status.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  }, [requestSearchQuery, requestStatusFilter, requests]);

  // Update request status
  const updateRequestStatus = async (requestId: string, newStatus: Request['status']) => {
    setIsRequestLoading(true);
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update request');
      }

      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? data : request
        )
      );
    } catch (error) {
      console.error('Error updating request:', error);
      alert(error.message || 'Failed to update request');
    } finally {
      setIsRequestLoading(false);
    }
  };

  // Delete request
  const deleteRequest = async (requestId: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    setIsRequestLoading(true);
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete request');
      }

      setRequests(prev => prev.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      setIsRequestLoading(false);
    }
  };






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
              <span className="font-medium">elcome, {session?.user?.name}</span>
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
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{request.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.project}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === "approved" ? "bg-green-900/50 text-green-300" :
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
              className="space-y-6"
            >
              {/* Project Management Header (unchanged) */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Project Management
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => openAddModal()}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-900/30 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Project
                  </button>
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400">
                    Loading projects...
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    {searchQuery ? "No projects match your search" : "No projects found"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Grade</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Report</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-white">{project.title}</div>
                              <div className="text-sm text-gray-400 line-clamp-1">{project.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{project.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{project.student_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.grade === "A+" ? "bg-green-900/50 text-green-300" :
                                ["A", "A-", "B+"].includes(project.grade) ? "bg-blue-900/50 text-blue-300" :
                                  ["B", "B-", "C+"].includes(project.grade) ? "bg-yellow-900/50 text-yellow-300" :
                                    "bg-red-900/50 text-red-300"
                                }`}>
                                {project.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              <a
                                href={`${project.report_url}`} // Adjust this URL as needed
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                              >
                                <FaFileAlt /> View Report
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {new Date(project.updated_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => openEditModal(project)}
                                  className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-900/20 transition-colors"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => deleteProject(project.id)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/20 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add/Edit Project Modal (unchanged) */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {currentProject ? "Edit Project" : "Add New Project"}
                        </h3>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <form onSubmit={handleProjectSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                              <input
                                type="text"
                                name="student_id"
                                value={formData.student_id}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                              <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Grade</label>
                              <select
                                name="grade"
                                value={formData.grade}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              >
                                <option value="">Select Grade</option>
                                {grades.map(grade => (
                                  <option key={grade} value={grade}>{grade}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-900/30 transition-all"
                            disabled={isLoading}
                          >
                            {isLoading ? "Processing..." : currentProject ? "Update Project" : "Add Project"}
                          </button>
                        </div>

                        {/* Add this to your form inside the modal */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Project Report (PDF/DOCX)
                          </label>
                          <div className="mt-1 flex items-center">
                            <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600">
                              <span className="text-white">
                                {file ? file.name : 'Choose file...'}
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                              />
                            </label>
                            {file && (
                              <button
                                type="button"
                                onClick={() => setFile(null)}
                                className="ml-2 text-red-400 hover:text-red-300"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-400">Only PDF and DOCX files are accepted</p>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
          {activeTab === "students" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Student Management Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Student Management
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                    />
                    {studentSearchQuery && (
                      <button
                        onClick={() => setStudentSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setIsStudentModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-900/30 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Student
                  </button>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                {isStudentLoading ? (
                  <div className="p-8 text-center text-gray-400">
                    Loading students...
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    {studentSearchQuery ? "No students match your search" : "No students found"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Program</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredStudents.map((student) => (
                          <tr key={student.student_id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                              {student.student_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold bg-blue-900/50 text-blue-300 rounded-full">
                                {student.prog_name}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => openStudentEditModal(student)}
                                  className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-900/20 transition-colors"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => deleteStudent(student.student_id)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/20 transition-colors"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add/Edit Student Modal */}
              {isStudentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {currentStudent ? "Edit Student" : "Add New Student"}
                        </h3>
                        <button
                          onClick={() => openStudentAddModal}
                          className="text-gray-400 hover:text-white"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <form onSubmit={handleStudentSubmit}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                              <input
                                type="text"
                                name="student_id"
                                value={studentFormData.student_id}
                                onChange={handleStudentInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                                disabled={!!currentStudent} // Disable editing of ID for existing students
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                              <input
                                type="text"
                                name="name"
                                value={studentFormData.name}
                                onChange={handleStudentInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={studentFormData.email}
                              onChange={handleStudentInputChange}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                              <input
                                type="tel"
                                name="phone"
                                value={studentFormData.phone}
                                onChange={handleStudentInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Program</label>
                              <select
                                name="prog_id"
                                value={studentFormData.prog_id}
                                onChange={handleStudentInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                              >
                                <option value="">Select Program</option>
                                {programs.map(program => (
                                  <option key={program.id} value={program.id}>{program.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                            <textarea
                              name="address"
                              value={studentFormData.address}
                              onChange={handleStudentInputChange}
                              rows={2}
                              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                              required
                            />
                          </div>

                          {!currentStudent && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                              <input
                                type="password"
                                name="password"
                                value={studentFormData.passwordHash}
                                onChange={handleStudentInputChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required={!currentStudent}
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsStudentModalOpen(false)}
                            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-900/30 transition-all"
                            disabled={isStudentLoading}
                          >
                            {isStudentLoading ? "Processing..." : currentStudent ? "Update Student" : "Add Student"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "requests" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Requests Management Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Borrow Requests
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      value={requestSearchQuery}
                      onChange={(e) => setRequestSearchQuery(e.target.value)}
                    />
                    {requestSearchQuery && (
                      <button
                        onClick={() => setRequestSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={requestStatusFilter}
                      onChange={(e) => setRequestStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requests Table */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                {isRequestLoading ? (
                  <div className="p-8 text-center text-gray-400 flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Loading requests...
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    {requestSearchQuery || requestStatusFilter !== "all"
                      ? "No matching requests found"
                      : "No borrow requests yet"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Request ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                              {request.id.slice(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{request.student_name}</div>
                              <div className="text-xs text-gray-400">{request.student_id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{request.project_title}</div>
                              <div className="text-xs text-gray-400">{request.project_id.slice(0, 8)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {new Date(request.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${request.status === "approved" ? "bg-green-900/50 text-green-300" :
                                request.status === "rejected" ? "bg-red-900/50 text-red-300" :
                                  "bg-yellow-900/50 text-yellow-300"
                                }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                {request.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => updateRequestStatus(request.id, "approved")}
                                      className="px-3 py-1 bg-green-900/30 text-green-300 rounded-md hover:bg-green-800/50 transition-colors text-sm"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => updateRequestStatus(request.id, "rejected")}
                                      className="px-3 py-1 bg-red-900/30 text-red-300 rounded-md hover:bg-red-800/50 transition-colors text-sm"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => deleteRequest(request.id)}
                                  className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50 transition-colors"
                                  title="Delete request"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {/* Other tabs would follow the same pattern */}
        </main>
      </div>
    </div>
  );
}