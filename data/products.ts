// // data/products.ts
// const products = [
//   {
//     name: 'CLASSWING',
//     slug: 'classwing',
//     price: 20,
//     rating: 5.0,
//     image: 'classwing.png',
//     description: 'Mild skincare serum for daily use with natural ingredients.',
//   },
//   {
//     name: 'HOLOCANE',
//     slug: 'holocane',
//     price: 23,
//     rating: 5.0,
//     image: 'holocane.png',
//     description: 'Regenerative facial serum perfect for nightly skincare routine.',
//   },
//   {
//     name: 'LIGHTCOOL',
//     slug: 'lightcool',
//     price: 22.5,
//     rating: 5.0,
//     image: 'lightcool.png',
//     description: 'Lightweight cream for hydration and soothing effect.',
//   },
// ];

// export default products;
import { Product } from ".././types/product";

const products: Product[] = [
  {
    name: "CLASSWING",
    slug: "classwing",
    price: 20,
    rating: 5.0,
    image: "classwing.png",
    description: "Gentle skincare mist that refreshes and tones your face.",
  },
  {
    name: "HOLOCANE",
    slug: "holocane",
    price: 23,
    rating: 5.0,
    image: "holocane.png",
    description: "A healing serum infused with botanical ingredients.",
  },
  {
    name: "LIGHTCOOL",
    slug: "lightcool",
    price: 22.5,
    rating: 5.0,
    image: "lightcool.png",
    description: "Cooling gel moisturizer for sensitive skin.",
  },
];

export default products;
