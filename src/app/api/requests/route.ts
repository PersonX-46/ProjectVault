import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Request, RequestStatus } from '@/app/types';

export async function GET() {
  try {
    const requests = await prisma.requests.findMany();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<Request, 'created_at' | 'updated_at'> = await request.json();
    const { id, student_id, project_id, status } = body;

    // Validate status
    const validStatuses: RequestStatus[] = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status as RequestStatus)) {
      return NextResponse.json(
        { error: 'Invalid request status' },
        { status: 400 }
      );
    }

    const requestItem = await prisma.requests.create({
      data: {
        id,
        student_id,
        project_id,
        status,
      },
    });

    return NextResponse.json(requestItem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    );
  }
}