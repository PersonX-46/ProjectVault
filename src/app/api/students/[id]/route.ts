// pages/api/student/[id].ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/clients';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const student = await prisma.student.findUnique({
      where: { student_id: params.id },
      select: {
        student_id: true,
        name: true,
        prog_id: true,
        prog_name: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}