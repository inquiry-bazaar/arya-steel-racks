import crypto from "node:crypto"
import path from "node:path"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const REQUIRED = [
  "CLOUD_FLARE_ACCOUNT_ID",
  "CLOUD_FLARE_ACCESS_KEY_ID",
  "CLOUD_FLARE_SECRET_ACCESS_KEY",
  "CLOUD_FLARE_R2_BUCKET",
  "CLOUD_FLARE_R2_PUBLIC_URL",
]

let client
function r2() {
  const missing = REQUIRED.filter((k) => !process.env[k])
  if (missing.length) throw new Error(`Missing R2 env vars: ${missing.join(", ")}`)
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUD_FLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUD_FLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUD_FLARE_SECRET_ACCESS_KEY,
      },
    })
  }
  return client
}

const publicBase = () => (process.env.CLOUD_FLARE_R2_PUBLIC_URL || "").replace(/\/$/, "")

export async function uploadImage(buffer, { folder = "arya", contentType, fileName = "" } = {}) {
  const ext = path.extname(fileName).toLowerCase().replace(/[^.a-z0-9]/g, "")
  const key = `${folder}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`
  await r2().send(
    new PutObjectCommand({
      Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  )
  return { url: `${publicBase()}/${key}`, key }
}

export async function deleteImage(key) {
  if (!key) return
  try {
    await r2().send(new DeleteObjectCommand({ Bucket: process.env.CLOUD_FLARE_R2_BUCKET, Key: key }))
  } catch (e) {
    console.error("R2 delete failed:", e.message) // never block the request on cleanup
  }
}
