import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Single client — reads use CDN, writes use token when available
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_KEY,
})

// Alias for clarity in API routes
export const serverClient = client
