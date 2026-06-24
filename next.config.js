/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites removidos para permitir rotas de API nativas do Next.js
  turbopack: {
    root: __dirname,
  }
};

module.exports = nextConfig;
