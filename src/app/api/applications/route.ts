import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const application = await prisma.jobApplication.create({
      data: {
        position: data.position,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        resumeLink: data.resumeLink || null,
        portfolioLink: data.portfolioLink || null,
        experience: data.experience || null,
        skills: data.skills || null,
        comments: data.comments || null,
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all applications
    const applications = await prisma.jobApplication.findMany({
      orderBy: {
        submissionDate: 'desc'
      }
    });

    return NextResponse.json({ data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
} 