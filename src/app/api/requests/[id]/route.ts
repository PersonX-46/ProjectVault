import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/clients';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.borrowRequest.update({
      where: { id: params.id },
      data: {
        status,
        response_date: status !== 'pending' ? new Date() : null
      },
      include: {
        student: {
          select: {
            name: true
          }
        },
        project: {
          select: {
            title: true
          }
        }
      }
    });

    // Format the response
    const formattedRequest = {
      id: updatedRequest.id,
      student_id: updatedRequest.student_id,
      student_name: updatedRequest.student.name,
      project_id: updatedRequest.project_id,
      project_title: updatedRequest.project.title,
      status: updatedRequest.status,
      created_at: updatedRequest.request_date,
      response_date: updatedRequest.response_date
    };

    return NextResponse.json(formattedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Failed to update request' },
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

  try {
    await prisma.borrowRequest.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json(
      { error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}