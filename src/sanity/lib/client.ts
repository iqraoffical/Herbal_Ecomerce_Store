import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Public client (browser-safe, read-only) — uses CDN for speed
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Server-only client with write token (for API routes — NEVER expose to browser)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
