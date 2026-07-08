// Disabled live content API for now
// This feature requires next-sanity version 9.5.0 or higher
// To enable, upgrade next-sanity and uncomment the code below

// import { defineLive } from "next-sanity/live"
// import { client } from './client'

// export const { sanityFetch, SanityLive } = defineLive({
//   client,
// })

// Fallback exports
export const sanityFetch = null
export const SanityLive = null
