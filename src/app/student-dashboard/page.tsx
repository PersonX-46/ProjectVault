import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "../../../prisma/clients";
import { ProjectCard } from "../components/student/ProjectCard";
import { Filters } from "../components/student/Filters";
import { redirect } from "next/navigation";
import { FaClock, FaCheck, FaTimes, FaBook } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import PrintButton from "../components/student/PrintButton";
import PrintSingleRequest from "../components/student/PrintSingleRequest";

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
      student_id: studentId
    },
    include: {
      project: {
        select: {
          title: true,
          storage_location: true,  // Include storage location
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
          <h1 className="text-2xl font-bold">MSU College Project Management</h1>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaBook className="text-red-400" /> My Borrow Requests
            </h2>
            {myBorrowRequests.length > 0 && (
              <PrintButton />
            )}
          </div>

          {/* Printable version - hidden except when printing */}
          {/* Printable version - hidden except when printing */}
          <div className="hidden print:block">
            <div className="max-w-4xl mx-auto p-6">
              {/* Header with logo and student info */}
              <div className="flex justify-between items-start mb-8 border-b-2 border-gray-200 pb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">Borrow Requests</h1>
                  <p className="text-gray-600">Generated from MSU Project Management System</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700 font-medium">{session.user.name}</p>
                  <p className="text-gray-500 text-sm">{session.user.email || 'MSU Student'}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Printed on: {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Hidden print templates for individual requests */}
{myBorrowRequests.map((request) => (
  <div key={`print-${request.id}`} id={`print-content-${request.id}`} className="hidden">
    <h1 className="text-2xl font-bold mb-4">Borrow Request Details</h1>
    <table>
      <tbody>
        <tr>
          <th>Project Title</th>
          <td>{request.project.title}</td>
        </tr>
        <tr>
          <th>Owner</th>
          <td>{request.project.student.name}</td>
        </tr>
        <tr>
          <th>Request Date</th>
          <td>{new Date(request.request_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td className={`status-${request.status}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </td>
        </tr>
        <tr>
          <th>Storage Location</th>
          <td>{request.project.storage_location || 'Not assigned'}</td>
        </tr>
      </tbody>
    </table>
    <div className="footer">
      <p>Generated from MSU Project Management System</p>
      <p>Printed on: {new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </div>
))}

              {/* Requests table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage Location</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myBorrowRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{request.project.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.project.student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.request_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${request.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : request.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.project.storage_location ? (
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              {request.project.storage_location}
                            </span>
                          ) : (
                            <span className="text-gray-400">Not assigned</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t-2 border-gray-200 text-xs text-gray-500">
                <div className="flex justify-between">
                  <div>
                    <p>MSU Project Management System</p>
                    <p>© {new Date().getFullYear()} All rights reserved</p>
                  </div>
                  <div className="text-right">
                    <p>This document is system-generated</p>
                    <p>Page 1 of 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular version - hidden when printing */}
          <div className="print:hidden bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
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
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
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
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-2">
                <PrintSingleRequest request={request} />
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
          <h2 className="text-xl font-bold mb-4 print:hidden">Available Projects</h2>
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