import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/clients';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Get session and verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // 3. Verify project exists
    const projectExists = await prisma.project.findUnique({
      where: { id: params.id }
    });
    if (!projectExists) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // 4. Verify student exists
    const studentExists = await prisma.student.findUnique({
      where: { student_id: session.user.id }
    });
    if (!studentExists) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // 5. Create comment
    const comment = await prisma.projectComment.create({
      data: {
        content,
        project_id: params.id,
        student_id: session.user.id,
      },
      include: {
        student: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(comment);
    
  } catch (error) {
    console.error('Error creating comment:', error);
    
    // Handle Prisma foreign key constraint error
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid project or student reference' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}