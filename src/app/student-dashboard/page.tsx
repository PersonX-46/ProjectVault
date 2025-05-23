import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "../../../prisma/clients";
import { ProjectCard } from "../components/student/ProjectCard";
import { Filters } from "../components/student/Filters";
import { redirect } from "next/navigation";
import { FaClock, FaCheck, FaTimes, FaBook } from "react-icons/fa";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  // Redirect if no session or not a student
  if (!session || session.user.role !== "student") {
    redirect("/student-login");
  }

  const studentId = session.user.id;

  // Fetch all projects
  const allProjects = await prisma.project.findMany({
    include: {
      student: true,
      ProjectLike: {
        select: {
          student_id: true,
        },
      },
      ProjectComment: {
        select: {
          id: true,
        },
      },
      BorrowRequest: {
        where: {
          student_id: studentId // Only include this student's requests
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // Fetch only this student's borrow requests
  const myBorrowRequests = await prisma.borrowRequest.findMany({
    where: {
      student_id: studentId // Only requests made by this student
    },
    include: {
      project: {
        select: {
          title: true,
          student: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      request_date: "desc",
    },
  });

  const categories = [...new Set(allProjects.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-pink-900 p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MSU Project Management</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {session.user.name}</span>
            <form action="/api/auth/signout" method="POST">
              <button 
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* My Borrow Requests Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaBook className="text-red-400" /> My Borrow Requests
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            {myBorrowRequests.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                You haven't made any borrow requests yet.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Request Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {myBorrowRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{request.project.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {request.project.student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(request.request_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {request.status === "pending" && (
                            <>
                              <FaClock className="text-yellow-400" />
                              <span className="text-yellow-400">Pending</span>
                            </>
                          )}
                          {request.status === "approved" && (
                            <>
                              <FaCheck className="text-green-400" />
                              <span className="text-green-400">Approved</span>
                            </>
                          )}
                          {request.status === "rejected" && (
                            <>
                              <FaTimes className="text-red-400" />
                              <span className="text-red-400">Rejected</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Available Projects Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Available Projects</h2>
          <Filters
            categories={categories}
            onFilterChange={async (filters) => {
              'use server';
              console.log('Filters changed:', filters);
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {allProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                studentId={studentId} 
                hasRequested={project.BorrowRequest.length > 0}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}