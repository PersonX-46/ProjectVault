import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Project } from '@/app/types';
// POST: Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, student_id, category, admin_id, report_url, grade, storage_location } = body;

    // Validate required fields
    if (!title || !description || !student_id || !category || !admin_id || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate storage location format if provided
    if (storage_location && !/^\d+C\d+R$/.test(storage_location)) {
      return NextResponse.json(
        { error: 'Storage location must be in format like "6C4R" (ColumnRow)' },
        { status: 400 }
      );
    }

    // Verify student exists and get program info
    const student = await prisma.student.findUnique({
      where: { student_id },
      select: {
        student_id: true,
        prog_id: true,
        prog_name: true,
      }
    });
    
    if (!student) {
      return NextResponse.json(
        { error: `Student with ID ${student_id} does not exist` },
        { status: 404 }
      );
    }

    // Verify admin exists
    const admin = await prisma.admin.findUnique({
      where: { admin_id }
    });
    
    if (!admin) {
      return NextResponse.json(
        { error: `Admin with ID ${admin_id} does not exist` },
        { status: 404 }
      );
    }

    // Create project including prog_id from student
    const project = await prisma.project.create({
      data: {
        title,
        description,
        student_id,
        prog_id: student.prog_id,
        category,
        admin_id,
        report_url: report_url || null,
        grade,
        storage_location: storage_location || null
      },
      include: {
        student: {
          select: {
            name: true,
            prog_id: true,
            prog_name: true
          }
        }
      }
    });

    return NextResponse.json(project, { status: 201 });

  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create project',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          stack: error.stack 
        })
      },
      { status: 500 }
    );
  }
}

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        student: {
          select: {
            name: true,
            prog_id: true,
            prog_name: true
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      }
    });

    return NextResponse.json(projects, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          stack: error.stack 
        })
      },
      { status: 500 }
    );
  }
}
