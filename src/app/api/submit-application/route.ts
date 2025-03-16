import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import { uploadFile } from '@/lib/s3';
import { join } from 'path';
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const form = formidable({});
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    let resumeLink = null;
    if (files.resume) {
      const file = files.resume[0];
      const fileContent = await readFile(file.filepath);
      const fileName = `${Date.now()}-${file.originalFilename}`;
      resumeLink = await uploadFile(fileContent, fileName);
    }

    const application = await prisma.jobApplication.create({
      data: {
        position: fields.position[0],
        fullName: fields.fullName[0],
        email: fields.email[0],
        phone: fields.phone?.[0] || null,
        resumeLink,
        portfolioLink: fields.portfolio?.[0] || null,
        experience: fields.experience?.[0] || null,
        skills: fields.skills?.[0] || null,
        comments: fields.coverLetter?.[0] || null,
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 