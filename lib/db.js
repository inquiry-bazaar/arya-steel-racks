import mongoose from "mongoose"

// Cache the connection on `global` so dev hot-reloads and serverless
// invocations reuse one connection instead of opening a new one per call.
let cached = global._mongoose
if (!cached) cached = global._mongoose = { conn: null, promise: null }

export default async function db() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not set. Copy .env.example to .env.local and fill it in.")

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 })
      .then((m) => m)
      .catch((e) => {
        cached.promise = null // allow a retry on the next request
        throw e
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}
