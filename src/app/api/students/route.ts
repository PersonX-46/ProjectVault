import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Student } from '@/app/types';

export async function GET() {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Student = await request.json();
    const { student_id, name, passwordHash, email, phone, address, prog_id, prog_name } = body;

    const student = await prisma.student.create({
      data: {
        student_id: student_id,
        name: name,
        passwordHash: passwordHash,
        email: email,
        phone: phone,
        address: address,
        prog_id: prog_id,
        prog_name: prog_name,
      },
    });

    const { passwordHash: _, ...studentData } = student;
    return NextResponse.json(studentData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}