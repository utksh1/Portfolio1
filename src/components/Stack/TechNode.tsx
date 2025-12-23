import { useRef, useState, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TechItem } from '@/lib/techStack';

interface TechNodeProps {
  tech: TechItem;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  onNodeClick: (tech: TechItem) => void;
  isActive?: boolean;
  isVisible?: boolean;
}

export default function TechNode({
  tech,
  orbitRadius,
  orbitSpeed,
  initialAngle,
  onNodeClick,
  isActive = false,
  isVisible = true
}: TechNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(initialAngle);

  // Calculate position based on current angle
  const position = useMemo(() => {
    const x = Math.cos(currentAngle) * orbitRadius;
    const z = Math.sin(currentAngle) * orbitRadius;
    return [x, 0, z] as [number, number, number];
  }, [currentAngle, orbitRadius]);

  // Scale based on hover state
  const scale = useMemo(() => {
    const baseScale = isActive ? 1.2 : 1;
    const hoverScale = isHovered ? 1.3 : 1;
    return baseScale * hoverScale;
  }, [isHovered, isActive]);

  // Glow intensity based on state
  const glowIntensity = useMemo(() => {
    if (isActive) return 1.0;
    if (isHovered) return 0.8;
    return 0.4;
  }, [isHovered, isActive]);

  // Animation loop for orbiting
  useFrame((state, delta) => {
    if (!isVisible) return;
    
    // Only rotate if not active (paused when active)
    if (!isActive) {
      const newAngle = currentAngle + orbitSpeed;
      setCurrentAngle(newAngle);
    }

    // Hover animation
    if (nodeRef.current && textRef.current) {
      // Node pulse on hover
      const targetScale = scale;
      nodeRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Text fade in/out on hover
      const textScale = isHovered ? 1 : 0;
      textRef.current.scale.lerp(
        new THREE.Vector3(textScale, textScale, textScale),
        0.1
      );

      // Subtle floating animation
      const time = state.clock.elapsedTime;
      const floatOffset = Math.sin(time + initialAngle) * 0.1;
      nodeRef.current.position.y = floatOffset;
    }
  });

  // Handle click
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onNodeClick(tech);
  };

  // Handle hover
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Technology Node */}
      <Sphere
        ref={nodeRef}
        args={[0.4, 16, 16]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={scale}
      >
        <meshStandardMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Inner Core for Depth */}
      <Sphere args={[0.2, 8, 8]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Connection Line to Core (subtle) */}
      <mesh position={[0, 0, -orbitRadius / 2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, orbitRadius, 4]} />
        <meshBasicMaterial
          color={tech.color}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Technology Label (appears on hover) */}
      <group ref={textRef} position={[0, 0.8, 0]}>
        <Text
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/jetbrains-mono.woff"
          outlineWidth={0.02}
          outlineColor={tech.color}
        >
          {tech.name}
        </Text>
        {/* Background for better readability */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2, 0.6]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Category Badge */}
      <group position={[0, -0.8, 0]}>
        <Text
          fontSize={0.2}
          color={tech.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/jetbrains-mono.woff"
        >
          {tech.category}
        </Text>
      </group>

      {/* Pulsing Ring Effect (when active) */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshBasicMaterial
            color={tech.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}