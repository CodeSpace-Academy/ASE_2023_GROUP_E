/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env:{
    MONGODB_URI : `mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority`,
  }
}

module.exports = nextConfig
