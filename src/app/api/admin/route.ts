import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/clients';
import { Admin } from '@/app/types';


export async function GET() {
  try {
    const admins = await prisma.admin.findMany();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Admin = await request.json();
    const { admin_id, name, passwordHash } = body;

    const admin = await prisma.admin.create({
      data: {
        id: admin_id,
        name: name,
        passwordHash: passwordHash,
      },
    });

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}