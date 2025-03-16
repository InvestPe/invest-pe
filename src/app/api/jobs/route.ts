import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URI
    );

    // Set credentials using the tokens
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      expiry_date: parseInt(process.env.GOOGLE_OAUTH_TOKEN_EXPIRY || '0')
    });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    // Get the current timestamp
    const now = new Date();
    
    // Log that the job ran
    console.log(`Job ran at ${now.toISOString()}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Job executed successfully',
      timestamp: now.toISOString()
    });

  } catch (error: any) {
    console.error('Error in scheduler job:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 