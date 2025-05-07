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
    // Check if borrow request already exists
    const existingRequest = await prisma.borrowRequest.findFirst({
      where: {
        project_id: projectId,
        student_id: studentId,
        status: 'pending'
      }
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: 'Borrow request already exists' },
        { status: 400 }
      );
    }

    await prisma.borrowRequest.create({
      data: {
        project_id: projectId,
        student_id: studentId,
        status: 'pending'
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error creating borrow request:', error);
    return NextResponse.json(
      { error: 'Failed to create borrow request' },
      { status: 500 }
    );
  }
}