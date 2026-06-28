'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Html, OrbitControls } from '@react-three/drei';

const ANIMATION_NAMES = {
  idle: 'idle',
  encourage: 'encourage',
  celebrate: 'celebrate',
};

function CompanionModel({ 
  modelUrl, 
  animation = 'idle', 
  onAnimationComplete,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoPlay = true,
  loop = true,
  className,
  style,
}) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const mixerRef = useRef();
  const actionRef = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!gltf) return;
    setReady(true);
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    if (!gltf || !autoPlay) return;

    const mixer = new THREE.AnimationMixer(gltf.scene);
    mixerRef.current = mixer;

    const clip = gltf.animations.find(a => a.name.toLowerCase().includes(animation.toLowerCase()));
    if (clip) {
      const action = mixer.clipAction(clip);
      action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
      action.clampWhenFinished = !loop;
      action.play();
      actionRef.current = action;

      if (!loop) {
        const onFinish = () => {
          action.removeEventListener('finished', onFinish);
          onAnimationComplete?.();
        };
        action.addEventListener('finished', onFinish);
      }
    }

    return () => {
      if (actionRef.current) {
        actionRef.current.stop();
      }
      mixer.uncacheRoot(gltf.scene);
    };
  }, [gltf, animation, loop, autoPlay, onAnimationComplete]);

  if (!ready || !gltf) {
    return null;
  }

  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      position={position}
      rotation={rotation}
      dispose={null}
    />
  );
}

function CompanionCanvas({ 
  modelUrl, 
  animation = 'idle', 
  onAnimationComplete,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoPlay = true,
  loop = true,
  cameraPosition = [0, 1, 3],
  cameraTarget = [0, 1, 0],
  backgroundColor = 0x000000,
  backgroundOpacity = 0,
  className,
  style,
  enableOrbit = false,
}) {
  const [error, setError] = useState(null);

  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: cameraPosition, fov: 30 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(backgroundColor, backgroundOpacity);
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        <fog attach="fog" args={[backgroundColor, 5, 15]} />
        
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[5, 10, 7]} intensity={1.2} color="#fff8f0" castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#854e60" />
        <hemisphereLight groundColor="#854e60" skyColor="#fff8f0" intensity={0.8} />
        
        <CompanionModel
          modelUrl={modelUrl}
          animation={animation}
          onAnimationComplete={onAnimationComplete}
          scale={scale}
          position={position}
          rotation={rotation}
          autoPlay={autoPlay}
          loop={loop}
        />
        
        {enableOrbit && <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          enableRotate={true}
          autoRotate={false}
          target={cameraTarget}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />}
      </Canvas>
    </div>
  );
}

function CompanionViewer({ 
  companionId, 
  animation = 'idle', 
  onAnimationComplete,
  size = 120,
  variant = 'default',
  className,
  style,
}) {
  const { COMPANIONS } = require('@/app/gcse/data/companions');
  const companion = COMPANIONS.find(c => c.id === companionId);
  
  const configs = {
    default: { scale: 1.5, position: [0, -0.5, 0], cameraPosition: [0, 1, 3] },
    small: { scale: 1, position: [0, -0.3, 0], cameraPosition: [0, 0.8, 2.5] },
    large: { scale: 2.5, position: [0, -1, 0], cameraPosition: [0, 1.5, 5] },
    profile: { scale: 3, position: [0, -1.2, 0], cameraPosition: [0, 1.8, 6] },
    corner: { scale: 1, position: [0, -0.2, 0], cameraPosition: [0, 0.6, 2] },
  };
  
  const config = configs[variant] || configs.default;
  
  if (!companion) {
    return (
      <div 
        className={className} 
        style={{ 
          ...style, 
          width: size, 
          height: size, 
          borderRadius: '50%', 
          background: '#faf3e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #854e60',
        }}
      >
        <span style={{ fontSize: size * 0.4 }}>🐰</span>
      </div>
    );
  }

  return (
    <CompanionCanvas
      className={className}
      style={{ ...style, width: size, height: size }}
      modelUrl={companion.modelUrl}
      animation={animation}
      onAnimationComplete={onAnimationComplete}
      scale={config.scale}
      position={config.position}
      cameraPosition={config.cameraPosition}
      backgroundOpacity={0}
      enableOrbit={variant === 'profile'}
    />
  );
}

export { CompanionViewer, CompanionCanvas, CompanionModel };
export { ANIMATION_NAMES };

import * as THREE from 'three';