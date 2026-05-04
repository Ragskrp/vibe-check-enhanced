const nextConfig = {
    trailingSlash: false,
    transpilePackages: [
        'three', 
        '@react-three/fiber',
        '@react-three/drei',
        '@react-three/postprocessing',
        'postprocessing'
    ],
    serverExternalPackages: [
        'firebase',
        'firebase/firestore',
        'firebase/app',
        'protobufjs', 
        '@grpc/proto-loader', 
        '@grpc/grpc-js',
        'lodash.camelcase'
    ],
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.vibemenow.uk',
            },
          ],
          destination: 'https://vibemenow.uk/:path*',
          permanent: true,
        },
        {
          source: '/vibe-or-die',
          destination: '/vibeordie',
          permanent: true,
        },
        {
          source: '/vocab-vibe',
          destination: '/vocab-match',
          permanent: true,
        },
        {
          source: '/merge-vibe',
          destination: '/2048-vibe',
          permanent: true,
        },
      ];
    },
};

export default nextConfig;
