import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface CoreHubProps {
  onClick?: () => void;
  isActive?: boolean;
}

export default function CoreHub({ onClick, isActive }: CoreHubProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Create a custom shader material for glowing effect
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#00ff88') },
        intensity: { value: 1.0 }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Add subtle pulsing displacement
          vec3 pos = position + normal * sin(time * 2.0 + length(position) * 3.0) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.3 + 0.7;
          float glow = intensity * pulse * 1.5;
          
          // Create radial gradient effect
          float dist = length(vPosition);
          float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
          
          vec3 finalColor = color * glow;
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }, []);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      
      // Update shader uniforms
      glowMaterial.uniforms.time.value = state.clock.elapsedTime;
      glowMaterial.uniforms.intensity.value = isActive ? 1.5 : 1.0;
    }

    if (lightRef.current) {
      lightRef.current.intensity = isActive ? 2 : 1.5;
      lightRef.current.distance = isActive ? 15 : 12;
    }
  });

  return (
    <group>
      {/* Central Core - Glowing Sphere */}
      <Sphere
        ref={meshRef}
        args={[1.5, 64, 64]}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>

      {/* Secondary Layer - Geometric Shape */}
      <mesh ref={meshRef} rotation={[Math.PI / 4, 0, 0]}>
        <icosahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>

      {/* Point Light at Core */}
      <pointLight
        ref={lightRef}
        color="#00ff88"
        intensity={1.5}
        distance={12}
        decay={2}
        position={[0, 0, 0]}
      />

      {/* Ambient Light */}
      <ambientLight color="#404040" intensity={0.3} />

      {/* Additional Core Lights for Better Visibility */}
      <directionalLight
        color="#ffffff"
        intensity={0.2}
        position={[5, 5, 5]}
      />
      <directionalLight
        color="#a855f7"
        intensity={0.1}
        position={[-5, -3, -5]}
      />
    </group>
  );
}