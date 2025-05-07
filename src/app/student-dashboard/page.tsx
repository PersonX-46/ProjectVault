import { getServerSession } from "next-auth";
import {authOptions}  from "../../../lib/auth";
import prisma from "../../../prisma/clients";
import { ProjectCard } from "../components/student/ProjectCard";
import { Filters } from "../components/student/Filters";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  const studentId = session?.user?.id;

  // Fetch all projects initially
  const allProjects = await prisma.project.findMany({
    include: {
      student: true,
      ProjectLike: {  // Matches your schema
        select: {
          student_id: true
        }
      },
      ProjectComment: {  // Matches your schema
        select: {
          id: true
        }
      },
      BorrowRequest: {  // Matches your schema
        select: {
          id: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });

  // Get unique categories from projects
  const categories = [...new Set(allProjects.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-pink-900 p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Project Vault</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {session?.user?.name}</span>
            <button className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Filters Section - Client Component */}
        <Filters 
          categories={categories}
          onFilterChange={async (filters) => {
            'use server';
            // This function will be called when filters change
            // In a real app, you would refetch data here
            // For now, we'll just log the filters
            console.log('Filters changed:', filters);
          }}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {allProjects.map((project) => (
            
            <ProjectCard 
              key={project.id} 
              project={project} 
              studentId={studentId}
            />
          ))}
        </div>
      </main>
    </div>
  );
}