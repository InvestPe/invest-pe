import { google } from 'googleapis';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function testAuth() {
  try {
    console.log('Testing Google Sheets API authentication...');
    console.log('Client Email:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL);
    console.log('Private Key length:', process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    console.log('Successfully authenticated!');
    console.log('Client type:', client.constructor.name);

  } catch (error) {
    console.error('Authentication error:', error);
    process.exit(1);
  }
}

testAuth(); 