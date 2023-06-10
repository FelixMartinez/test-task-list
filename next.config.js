/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      });
    }
    return config;
  },
}

module.exports = nextConfig
