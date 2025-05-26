import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/clients';
import { Project } from '@/app/types';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id
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

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<Project> = await request.json();
    
    // Validate storage location format if provided
    if (body.storage_location && !/^\d+C\d+R$/.test(body.storage_location)) {
      return NextResponse.json(
        { error: 'Storage location must be in format like "6C4R" (ColumnRow)' },
        { status: 400 }
      );
    }

    // Get the current project to verify it exists and get current student
    const currentProject = await prisma.project.findUnique({
      where: { id: params.id },
      include: { student: true }
    });

    if (!currentProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // If changing student_id, verify new student exists
    if (body.student_id && body.student_id !== currentProject.student_id) {
      const newStudent = await prisma.student.findUnique({
        where: { student_id: body.student_id }
      });
      
      if (!newStudent) {
        return NextResponse.json(
          { error: `Student with ID ${body.student_id} not found` },
          { status: 404 }
        );
      }
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        grade: body.grade,
        report_url: body.report_url,
        storage_location: body.storage_location,
        // Handle student relationship update if needed
        ...(body.student_id && {
          student_id: body.student_id,
          // Update prog_id if student changes, otherwise keep existing or use provided
          prog_id: body.prog_id || (body.student_id !== currentProject.student_id 
            ? (await prisma.student.findUnique({ 
                where: { student_id: body.student_id } 
              }))?.prog_id 
            : currentProject.prog_id)
        }),
        // If student_id not being updated, just use provided prog_id or keep existing
        ...(!body.student_id && {
          prog_id: body.prog_id ?? currentProject.prog_id
        })
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

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update project',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error instanceof Error ? error.message : String(error)
        })
      },
      { status: 500 }
    );
  }
}