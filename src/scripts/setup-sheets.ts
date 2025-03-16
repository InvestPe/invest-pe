import { google } from 'googleapis';
import type { sheets_v4 } from 'googleapis';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function setupGoogleSheet() {
  try {
    // Initialize the OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      'http://localhost:3001/oauth2callback'
    );

    // Set credentials from the stored tokens
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      expiry_date: parseInt(process.env.GOOGLE_OAUTH_TOKEN_EXPIRY || '0', 10)
    });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'InvestPE Job Applications',
        },
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    if (!spreadsheetId) {
      throw new Error('Failed to create spreadsheet');
    }

    console.log(`Created spreadsheet with ID: ${spreadsheetId}`);

    // Define headers
    const headers = [
      'Submission Date',
      'Position',
      'Full Name',
      'Email',
      'Phone',
      'Resume Link',
      'Cover Letter',
      'Experience',
      'Current Company',
      'Notice Period',
      'Expected CTC',
      'Current Location',
      'Preferred Location',
      'Status',
    ];

    // Update headers in the first row
    const headerUpdateRequest: sheets_v4.Schema$Request = {
      updateCells: {
        range: {
          sheetId: 0,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: headers.length,
        },
        rows: [
          {
            values: headers.map((header) => ({
              userEnteredValue: { stringValue: header },
              userEnteredFormat: {
                textFormat: { bold: true },
                backgroundColor: { red: 0.8, green: 0.8, blue: 0.8 },
              },
            })),
          },
        ],
        fields: 'userEnteredValue,userEnteredFormat',
      },
    };

    // Auto-resize columns
    const autoResizeRequest: sheets_v4.Schema$Request = {
      autoResizeDimensions: {
        dimensions: {
          sheetId: 0,
          dimension: 'COLUMNS',
          startIndex: 0,
          endIndex: headers.length,
        },
      },
    };

    // Apply formatting
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [headerUpdateRequest, autoResizeRequest],
      },
    });

    console.log('Successfully set up headers and formatting');
    console.log('\nPlease update your .env.local file with the new spreadsheet ID:');
    console.log(`GOOGLE_SHEETS_SPREADSHEET_ID=${spreadsheetId}`);
    console.log('\nYou can access the spreadsheet at:');
    console.log(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error: any) {
    console.error('Error setting up Google Sheet:', error);
    if (error.message?.includes('invalid_grant')) {
      console.log('\nYour authentication has expired. Please run:');
      console.log('npm run setup-oauth');
      console.log('to get new authentication tokens.');
    }
    process.exit(1);
  }
}

setupGoogleSheet(); 