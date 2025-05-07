import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/clients';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projectId = params.id;
  const studentId = session.user.id;

  try {
    // Check if like already exists
    const existingLike = await prisma.projectLike.findFirst({
      where: {
        project_id: projectId,
        student_id: studentId
      }
    });

    if (existingLike) {
      return NextResponse.json(
        { error: 'Already liked' },
        { status: 400 }
      );
    }

    await prisma.projectLike.create({
      data: {
        project_id: projectId,
        student_id: studentId
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error liking project:', error);
    return NextResponse.json(
      { error: 'Failed to like project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projectId = params.id;
  const studentId = session.user.id;

  try {
    await prisma.projectLike.deleteMany({
      where: {
        project_id: projectId,
        student_id: studentId
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error unliking project:', error);
    return NextResponse.json(
      { error: 'Failed to unlike project' },
      { status: 500 }
    );
  }
}