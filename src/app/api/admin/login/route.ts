import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/clients';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin by email (assuming email is unique)
    const admin = await prisma.admin.findFirst({
      where: { name: email } // Using name field as email since your model doesn't have email
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords (plain text for testing)
    const passwordMatches = admin.passwordHash === password;
    // In production, use: await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatches) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return admin data without password
    const { passwordHash, ...adminData } = admin;
    return NextResponse.json({ admin: adminData });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}