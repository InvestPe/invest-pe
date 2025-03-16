import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFile = async (file: Buffer, fileName: string): Promise<string> => {
  const command = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `resumes/${fileName}`,
    Body: file,
    ContentType: 'application/pdf',
  };

  try {
    await s3Client.send(command);
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/resumes/${fileName}`;
    return url;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file');
  }
}; 