import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "Faltan fileName o fileType" });
    }

    const uniqueKey = `products/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    return res.status(200).json({ uploadUrl, publicUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error generando la URL de subida" });
  }
}
