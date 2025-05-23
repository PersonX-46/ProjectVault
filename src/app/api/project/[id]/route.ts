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
    
    // Get the current project to maintain program info
    const currentProject = await prisma.project.findUnique({
      where: { id: params.id },
      select: { student_id: true }
    });

    if (!currentProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Get student info to maintain program data
    const student = await prisma.student.findUnique({
      where: { student_id: currentProject.student_id },
      select: { prog_id: true, prog_name: true }
    });

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...body,
        // Maintain program info if not provided
        prog_id: body.prog_id || student?.prog_id
      },
      include: {
        student: {
          select: {
            prog_id: true,
            prog_name: true
          }
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update project',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message 
        })
      },
      { status: 500 }
    );
  }
}