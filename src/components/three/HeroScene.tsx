'use client';

import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Stars,
  ContactShadows,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
} from '@react-three/postprocessing';
import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  VideoTexture,
  Color,
  DoubleSide,
  Vector3,
  Group,
  MeshStandardMaterial,
  LinearFilter,
} from 'three';
import { CitySkyline, GridHelper3D } from './ProceduralBuildings';
import type { BuildingConfig } from '@/types';

function VideoPlane({ videoSrc, opacity = 0.35 }: { videoSrc: string; opacity?: number }) {
  const meshRef = useRef<Mesh>(null);
  const textureRef = useRef<VideoTexture | null>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    const texture = new VideoTexture(video);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    textureRef.current = texture;

    if (meshRef.current) {
      const mat = meshRef.current.material as MeshBasicMaterial;
      mat.map = texture;
      mat.needsUpdate = true;
    }

    return () => {
      video.pause();
      video.src = '';
      texture.dispose();
    };
  }, [videoSrc]);

  return (
    <mesh ref={meshRef} position={[0, 4, -40]} rotation={[0, 0, 0]}>
      <planeGeometry args={[140, 60]} />
      <meshBasicMaterial transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3(0, 3, 28));

  useFrame((state, delta) => {
    const p = scrollProgress.current;
    const target = new Vector3(
      Math.sin(p * Math.PI * 0.5) * 4,
      3 + p * 3,
      28 - p * 10
    );
    targetPos.current.lerp(target, delta * 2);
    camera.position.lerp(targetPos.current, delta * 1.5);
    camera.lookAt(0, 4, 0);
  });

  return null;
}

function FloatingParticles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={positions} />
    </group>
  );
}

function Points({ positions }: { positions: Float32Array }) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={new Color(0x9daaf8)}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function LightBeam({ position, height = 25 }: { position: [number, number, number]; height?: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as MeshStandardMaterial;
      mat.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.04;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], height / 2 + position[1], position[2]]}
      rotation={[0, 0, 0]}
    >
      <cylinderGeometry args={[0.5, 4, height, 16, 1, true]} />
      <meshStandardMaterial
        color={new Color(0x9daaf8)}
        transparent
        opacity={0.1}
        side={DoubleSide}
        depthWrite={false}
        blending={2}
      />
    </mesh>
  );
}

function SceneContent({
  buildings,
  scrollProgress,
}: {
  buildings: BuildingConfig[];
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <>
      <fog attach="fog" args={[new Color(0x0a1442), 20, 90]} />
      <ambientLight color={new Color(0x2a3a5a)} intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        color={new Color(0xfff5e0)}
        castShadow
      />
      <directionalLight position={[-10, 10, -10]} intensity={0.3} color={new Color(0x4a6a9a)} />

      <pointLight position={[0, 15, 5]} intensity={2} color={new Color(0x9daaf8)} distance={60} />
      <pointLight position={[-15, 8, 10]} intensity={1} color={new Color(0x4a8ac8)} distance={50} />
      <pointLight position={[15, 10, -10]} intensity={0.8} color={new Color(0xc85a8a)} distance={50} />

      <Stars
        radius={150}
        depth={60}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <Suspense fallback={null}>
        <CitySkyline buildingConfigs={buildings} />
      </Suspense>

      <GridHelper3D size={160} divisions={64} />

      <FloatingParticles />

      <LightBeam position={[-12, 0, -8]} height={30} />
      <LightBeam position={[10, 0, -12]} height={22} />
      <LightBeam position={[0, 0, 5]} height={18} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.8}
        scale={120}
        blur={3}
        far={30}
        resolution={1024}
        color={new Color(0x000000)}
      />

      <CameraRig scrollProgress={scrollProgress} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />

      <EffectComposer>
        <SMAA />
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={1.2} />
      </EffectComposer>
    </>
  );
}

function generateCityBuildings(): BuildingConfig[] {
  const configs: BuildingConfig[] = [];
  const types: Array<'skyscraper' | 'residential' | 'commercial' | 'industrial' | 'hotel'> = [
    'skyscraper',
    'residential',
    'commercial',
    'industrial',
    'hotel',
  ];

  const palette = [0x1a2a4a, 0x24345a, 0x2d3f66, 0x1e3054, 0x28395e];
  const emissives = [0xffd88a, 0xffc864, 0xffe8a8, 0xf0c860, 0xffe090];

  for (let i = 0; i < 42; i++) {
    const angle = (i / 42) * Math.PI * 2;
    const radius = 18 + Math.random() * 28;
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
    const z = Math.sin(angle) * radius - Math.random() * 15;

    const type = types[Math.floor(Math.random() * types.length)];
    let height = 0;
    if (type === 'skyscraper') height = 14 + Math.random() * 22;
    else if (type === 'hotel') height = 10 + Math.random() * 12;
    else if (type === 'commercial') height = 7 + Math.random() * 10;
    else if (type === 'residential') height = 5 + Math.random() * 9;
    else height = 4 + Math.random() * 7;

    const floors = Math.max(2, Math.round(height / 3));
    const width = 3 + Math.random() * 4;
    const depth = 3 + Math.random() * 4;

    configs.push({
      width,
      height,
      depth,
      floors,
      windowsPerFloor: Math.max(2, Math.round(width / 1.2)),
      color: palette[Math.floor(Math.random() * palette.length)],
      emissiveColor: emissives[Math.floor(Math.random() * emissives.length)],
      position: [x, 0, z],
      rotation: [0, Math.random() * Math.PI, 0],
      type,
    });
  }

  configs.push({
    width: 7,
    height: 28,
    depth: 7,
    floors: 9,
    windowsPerFloor: 6,
    color: 0x1e3054,
    emissiveColor: 0xffd88a,
    position: [0, 0, -5],
    rotation: [0, 0, 0],
    type: 'skyscraper',
  });

  return configs;
}

interface HeroSceneProps {
  videoSrc?: string;
}

export function HeroScene({ videoSrc = '/videos/hero-1.mp4' }: HeroSceneProps) {
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useRef(0);

  const buildings = useMemo(() => generateCityBuildings(), []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const max = window.innerHeight;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [canUseWebGL, setCanUseWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (!gl) setCanUseWebGL(false);
    } catch {
      setCanUseWebGL(false);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="canvas-container interactive">
      {canUseWebGL ? (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 3, 28], fov: 55, near: 0.1, far: 500 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          shadows
        >
          <SceneContent buildings={buildings} scrollProgress={scrollProgress} />
          <VideoPlane videoSrc={videoSrc} />
        </Canvas>
      ) : (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-slide.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </div>
  );
}