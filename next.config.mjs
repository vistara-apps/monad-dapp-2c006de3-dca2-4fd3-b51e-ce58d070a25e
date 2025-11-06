/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'react-native': false,
        'fs': false,
        'net': false,
        'tls': false,
      };
    }
    
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    return config;
  },
}

export default nextConfig
