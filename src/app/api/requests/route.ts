import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const requests = await prisma.borrowRequest.findMany({
      include: {
        student: {
          select: {
            name: true,
            student_id: true
          }
        },
        project: {
          select: {
            title: true,
            id: true
          }
        }
      },
      orderBy: {
        request_date: 'desc'
      }
    });

    // Format the response to match your frontend expectations
    const formattedRequests = requests.map(request => ({
      id: request.id,
      student_id: request.student_id,
      student_name: request.student.name,
      project_id: request.project_id,
      project_title: request.project.title,
      status: request.status,
      created_at: request.request_date,
      response_date: request.response_date
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}