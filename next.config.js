const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const dotenv = require('dotenv')
dotenv.config()
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
    WEB_URI: process.env.WEB_URI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
})
