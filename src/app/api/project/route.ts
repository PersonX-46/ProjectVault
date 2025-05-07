import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Project } from '@/app/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, student_id, category, admin_id, report_url, grade } = body;

    // Validate required fields
    if (!title || !description || !student_id || !category || !admin_id || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify student exists
    const studentExists = await prisma.student.findUnique({
      where: { student_id }
    });
    
    if (!studentExists) {
      return NextResponse.json(
        { error: `Student with ID ${student_id} does not exist` },
        { status: 404 }
      );
    }

    // Verify admin exists
    const adminExists = await prisma.admin.findUnique({
      where: { admin_id }
    });
    
    if (!adminExists) {
      return NextResponse.json(
        { error: `Admin with ID ${admin_id} does not exist` },
        { status: 404 }
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        student_id,
        category,
        admin_id,
        report_url: report_url || null,
        grade
      }
    });

    return NextResponse.json(project, { status: 201 });

  } catch (error) {
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