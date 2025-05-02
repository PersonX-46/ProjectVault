import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // Read the request as FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectTitle = formData.get('projectTitle') as string;
    const studentId = formData.get('studentId') as string;

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: 'No file was uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF and DOCX files are allowed' },
        { status: 400 }
      );
    }

    // Create upload directory if needed
    const uploadDir = './public/uploads/projects';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a sanitized filename
    const safeTitle = (projectTitle || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .substring(0, 50);
    
    const ext = path.extname(file.name);
    const timestamp = Date.now();
    const newFilename = `${safeTitle}-${studentId || 'unknown'}-${timestamp}${ext}`;
    const newPath = path.join(uploadDir, newFilename);

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(newPath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/projects/${newFilename}`;
    return NextResponse.json({ url: publicUrl });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'An error occurred while uploading the file' },
      { status: 500 }
    );
  }
}

// Explicitly declare other HTTP methods as not allowed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}