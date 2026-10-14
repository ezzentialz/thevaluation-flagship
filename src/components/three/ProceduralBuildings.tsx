'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, Group, DoubleSide } from 'three';
import type { BuildingConfig } from '@/types';

interface BuildingProps {
  config: BuildingConfig;
  index: number;
  time?: number;
}

export function ProceduralBuilding({ config, index, time = 0 }: BuildingProps) {
  void index;
  void time;

  const { width, height, depth, floors, windowsPerFloor, color, emissiveColor, type } = config;

  const floorHeight = height / floors;
  const windowWidth = (width * 0.8) / windowsPerFloor;
  const windowHeight = floorHeight * 0.6;

  const frontBackWindows = useMemo(() => {
    const items: React.ReactNode[] = [];
    const sideCount = Math.max(2, Math.ceil(depth / (width / windowsPerFloor)));
    const sideWindowWidth = (depth * 0.8) / sideCount;
    const winColor = new Color(emissiveColor ?? 0xffeeaa);

    for (let f = 0; f < floors; f++) {
      const y = (f - (floors - 1) / 2) * floorHeight + height / 2;

      for (let w = 0; w < windowsPerFloor; w++) {
        const x = (w - (windowsPerFloor - 1) / 2) * (width * 0.8) / windowsPerFloor;
        items.push(
          <mesh key={`f${f}-w${w}`} position={[x, y, depth / 2 + 0.01]}>
            <planeGeometry args={[windowWidth * 0.9, windowHeight * 0.9]} />
            <meshStandardMaterial transparent opacity={0.9} side={DoubleSide} emissive={winColor} emissiveIntensity={0.5} color={winColor} />
          </mesh>
        );
        items.push(
          <mesh key={`f${f}-w${w}-b`} position={[x, y, -depth / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[windowWidth * 0.9, windowHeight * 0.9]} />
            <meshStandardMaterial transparent opacity={0.9} side={DoubleSide} emissive={winColor} emissiveIntensity={0.5} color={winColor} />
          </mesh>
        );
      }

      for (let d = 0; d < 2; d++) {
        for (let w = 0; w < sideCount; w++) {
          const z = (w - (sideCount - 1) / 2) * (depth * 0.8) / sideCount;
          items.push(
            <mesh
              key={`f${f}-s${d}-w${w}`}
              position={[(d - 0.5) * (width / 2 + 0.01), y, z]}
              rotation={[0, d === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
            >
              <planeGeometry args={[sideWindowWidth * 0.9, windowHeight * 0.9]} />
              <meshStandardMaterial transparent opacity={0.9} side={DoubleSide} emissive={winColor} emissiveIntensity={0.5} color={winColor} />
            </mesh>
          );
        }
      }
    }
    return items;
  }, [floors, height, depth, width, windowsPerFloor, floorHeight, windowWidth, windowHeight, emissiveColor]);

  return (
    <group position={config.position} rotation={config.rotation || [0, 0, 0]}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={new Color(color)} roughness={0.7} metalness={0.1} />
      </mesh>

      {frontBackWindows}

      {type === 'skyscraper' && (
        <>
          <mesh position={[0, height + height * 0.075, 0]}>
            <boxGeometry args={[width * 0.3, height * 0.15, depth * 0.3]} />
            <meshStandardMaterial color={new Color(color)} roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0, height + height * 0.15 + height * 0.05, 0]}>
            <boxGeometry args={[0.2, height * 0.1, 0.2]} />
            <meshStandardMaterial color={new Color(0x333333)} metalness={0.8} roughness={0.2} />
          </mesh>
        </>
      )}

      {type === 'hotel' && (
        <mesh position={[0, height * 0.95, depth / 2 + 0.05]}>
          <boxGeometry args={[width * 0.6, height * 0.08, 0.1]} />
          <meshStandardMaterial color={new Color(0xffaa00)} emissive={new Color(0xffaa00)} emissiveIntensity={1} />
        </mesh>
      )}

      {type === 'industrial' && (
        <>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[(i - 1) * width * 0.25, height + height * 0.15, depth * 0.3]}>
              <boxGeometry args={[1, height * 0.3, 1]} />
              <meshStandardMaterial color={new Color(0x444444)} roughness={0.9} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

export function CitySkyline({ buildingConfigs, time = 0 }: { buildingConfigs: BuildingConfig[]; time?: number }) {
  return (
    <group>
      {buildingConfigs.map((config, index) => (
        <ProceduralBuilding key={index} config={config} index={index} time={time} />
      ))}
    </group>
  );
}

interface GroundPlaneProps {
  size?: number;
  divisions?: number;
  color?: number;
}

export function GroundPlane({ size = 200, divisions = 50, color = 0x0a1428 }: GroundPlaneProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[size, size, divisions, divisions]} />
      <meshStandardMaterial color={new Color(color)} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export function GridHelper3D({ size = 200, divisions = 50, color1 = 0x1a2a4a, color2 = 0x0a1428 }: { size?: number; divisions?: number; color1?: number; color2?: number }) {
  const gridRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.z += delta * 0.002;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size, divisions, divisions]} />
        <meshStandardMaterial color={new Color(color1)} wireframe transparent opacity={0.15} side={DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size, divisions, divisions]} />
        <meshStandardMaterial color={new Color(color2)} wireframe transparent opacity={0.1} side={DoubleSide} />
      </mesh>
    </group>
  );
}