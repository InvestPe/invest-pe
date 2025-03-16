import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import * as http from 'http';
import { URL } from 'url';

dotenv.config({ path: '.env.local' });

async function openBrowser(url: string) {
  const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  const util = await import('util');
  const exec = util.promisify(require('child_process').exec);
  await exec(`${start} ${url}`);
}

async function getAuthenticatedClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI
  );

  // Generate the url that will be used for authorization
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets']
  });

  console.log('Opening browser for authorization...');
  await openBrowser(authorizeUrl);

  // Create a local server to listen for the OAuth2 callback
  const getAuthorizationCode = () => {
    return new Promise<string>((resolve, reject) => {
      const server = http.createServer(async (req, res) => {
        try {
          const url = new URL(req.url!, `http://${req.headers.host}`);
          const code = url.searchParams.get('code');
          if (code) {
            resolve(code);
            res.end('Authentication successful! You can close this window.');
            server.close();
          }
        } catch (e) {
          reject(e);
          res.end('Error occurred during authentication');
          server.close();
        }
      });

      server.listen(3001, () => {
        console.log('Waiting for authentication...');
        console.log('Local server is running on port 3001');
      });
    });
  };

  // Wait for the authorization code
  const code = await getAuthorizationCode();
  console.log('Authorization code received!');

  // Get the access token
  const { tokens } = await oauth2Client.getToken(code);
  console.log('\nAuthentication successful! Please add these tokens to your .env.local file:');
  console.log(`GOOGLE_OAUTH_ACCESS_TOKEN=${tokens.access_token}`);
  console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log(`GOOGLE_OAUTH_TOKEN_EXPIRY=${tokens.expiry_date}`);

  return oauth2Client;
}

// Run the authentication flow
getAuthenticatedClient().catch(console.error); 