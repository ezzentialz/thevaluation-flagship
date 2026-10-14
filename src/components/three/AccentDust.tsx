'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, Points as ThreePoints } from 'three';

function Dust({ count: COUNT }: { count: number }) {
  const ref = useRef<ThreePoints>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speeds[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions, speeds };
  }, [COUNT]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    const attr = points.geometry.getAttribute('position') as BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.3 + i) * delta * 0.05;
      if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = -7;
    }
    attr.needsUpdate = true;

    // pointer parallax: the dust field drifts against the cursor for depth
    points.rotation.y += (state.pointer.x * 0.25 - points.rotation.y) * 0.04;
    points.rotation.x += (-state.pointer.y * 0.12 - points.rotation.x) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#C7CFFD"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export function AccentDust({ active = true }: { active?: boolean }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={mobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <Dust count={mobile ? 120 : 260} />
    </Canvas>
  );
}
