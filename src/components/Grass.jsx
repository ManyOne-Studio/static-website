import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  attribute float aOffset; // Décalage unique par brin d'herbe

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Calcul du vent : on utilise uTime + le décalage unique du brin
    // On ajoute aussi un peu de position X/Z pour créer des "vagues" de vent
    float speed = 1.5;
    float noise = sin(uTime * speed + aOffset * 10.0);
    
    // Oscillation secondaire plus rapide pour le côté organique
    float smallWaves = cos(uTime * 3.0 + aOffset * 5.0) * 0.2;

    // L'herbe ne bouge que vers le haut (uv.y)
    float windStrength = (noise + smallWaves) * 0.3;
    pos.x += windStrength * pow(uv.y, 2.0);
    pos.z += windStrength * 0.5 * pow(uv.y, 2.0);

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    vec3 baseColor = vec3(0.08, 0.2, 0.08);
    vec3 tipColor = vec3(0.5, 0.8, 0.3);
    vec3 color = mix(baseColor, tipColor, vUv.y);
    
    // Style dessin : bords noirs
    if(vUv.x < 0.12 || vUv.x > 0.88 || vUv.y > 0.96) {
      color = vec3(0.01);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Grass({ count = 25000 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 1. On génère les positions et les offsets une seule fois
  const { positions, offsets } = useMemo(() => {
    const pos = [];
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos.push([(Math.random() - 0.5) * 35, 0, (Math.random() - 0.5) * 20]);
      off[i] = Math.random(); // Chaque brin a un chiffre entre 0 et 1
    }
    return { positions: pos, offsets: off };
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      // Effet Stop-motion (12 fps) pour le look dessiné
      const fps = 12;
      const snappedTime = Math.floor(state.clock.elapsedTime * fps) / fps;
      meshRef.current.material.uniforms.uTime.value = snappedTime;
      
      // On place les brins
      positions.forEach((p, i) => {
        dummy.position.set(p[0], p[1], p[2]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <coneGeometry args={[0.05, 1.2, 3]}>
        {/* On injecte l'offset dans la géométrie pour le shader */}
        <instancedBufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
      </coneGeometry>
      <shaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}