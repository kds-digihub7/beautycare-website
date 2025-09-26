// src/data/products.js
const products = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    description: "Deeply moisturizes and rejuvenates skin",
    price: 25,
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1720000000/cream1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1720000000/cream2.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1720000000/cream3.jpg",
    ],
    video: "https://res.cloudinary.com/demo/video/upload/v1720000000/cream-demo.mp4",
    reviews: [
      { user: "Ayesha", comment: "Bohot acha product hai!", rating: 5 },
      { user: "Ali", comment: "Skin smooth ho gayi.", rating: 4 },
    ],
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    description: "Brightens skin and reduces dark spots",
    price: 30,
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1720000000/serum1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1720000000/serum2.jpg",
    ],
    video: "https://res.cloudinary.com/demo/video/upload/v1720000000/serum-demo.mp4",
    reviews: [
      { user: "Sara", comment: "Skin glow karti hai!", rating: 5 },
      { user: "Hassan", comment: "Accha hai but mehnga.", rating: 3 },
    ],
  },
];

export default products;
