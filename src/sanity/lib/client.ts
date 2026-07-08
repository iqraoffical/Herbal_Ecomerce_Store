import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for development to see changes immediately
  token: process.env.NEXT_PUBLIC_SANITY_API_KEY,
})
