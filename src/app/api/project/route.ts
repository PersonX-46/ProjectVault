import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Project } from '@/app/types';

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<Project, 'created_at' | 'updated_at'> = await request.json();
    const { id, title, description, student_id, category, admin_id, report_url, grade } = body;

    const project = await prisma.project.create({
      data: {
        id,
        title,
        description,
        student_id,
        category,
        admin_id,
        report_url,
        grade,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}