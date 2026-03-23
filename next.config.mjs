/** @type {import('next').NextConfig} */
const nextConfig = {
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
        '@grpc/grpc-js'
    ]
};

export default nextConfig;
