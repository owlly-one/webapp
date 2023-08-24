/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['blog.logrocket.com', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  //pageExtensions: ["page.jsx", "api.js"]
}

module.exports = nextConfig
