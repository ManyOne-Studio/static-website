import { useRef } from 'react'
import * as THREE from 'three'
import { GridHelper } from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial, Sparkles, Sky, Clouds, Cloud } from "@react-three/drei"
import Grass from "./Grass"

class CustomElement extends GridHelper {}
extend({ CustomElement })

const FloorMaterial = shaderMaterial(
  {},
  /* glsl */`
  void main() {
      vec3 pos = position;
      float dist = length(pos.xz);
      float drop = pow(dist, 10.0) * 0.1;
      pos.y -= drop;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  /* glsl */`
  void main() {
      gl_FragColor = vec4(0.4, 0.8, 0.3, 1.0); 
  }
  `
)
extend({ FloorMaterial })

export const Experience = (props) => {
  const floorSize = 30
  const cloudsGroupRef = useRef()

  useFrame((state, delta) => {
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.rotation.y += delta * 0.01
    }
  })

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      
      <Sky 
        distance={450000} 
        sunPosition={[100, -0.02, -100]}
        mieCoefficient={0.005} // Gère la clarté de l'air
        mieDirectionalG={0.8}  // Gère la diffusion autour du soleil
        rayleigh={3}           // Gère la couleur du ciel (plus haut = plus de bleu/rouge)
        turbidity={10}         // Gère l'aspect "brumeux" de l'horizon 
        inclination={0} 
        azimuth={0.25} 
      />

      {/* LUNE VIA UNE SPARKLE STATIQUE */}
      <group position={[1, 5, -20]}>
        <Sparkles 
          count={1} 
          size={900} 
          color="white" 
          opacity={0.5} 
          speed={0} 
          noise={0} 
          scale={[1, 1, 1]} 
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </group>

      {/* NUAGES */}
      <group ref={cloudsGroupRef}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud 
            segments={15} bounds={[20, 1, 5]} volume={6} seed={115} fade={100}
            color="#ffffff10" 
            position={[0, 6, -12]} growth={4} speed={0.1} opacity={0.2}
          />
        </Clouds>
      </group>

      <OrbitControls 
        target={[0, 2, 0]} 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2.5}
      />

      <ambientLight intensity={0.05} color="#02040a" />
      
      {/* Éclairage des lucioles */}
      <pointLight position={[0, 2, 0]} intensity={2} distance={15} color="#fff6ce" />
      
      {/* Sparkles d'ambiance */}
      <Sparkles 
        size={ 100 }
        scale={ [13, 10, 5 ] }
        position-y={ -1 }
        speed={ 1 }
        count={ 60 }
        color={ "#f1ed95" }
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
            {/* Sparkles d'ambiance */}
      <Sparkles 
        size={ 30 }
        scale={ [13, 10, 5 ] }
        position-y={ -1 }
        speed={ 1 }
        count={ 30 }
        color={ "#d6c649" }
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />

      <Grass bladeCount={50000} gridSize={floorSize} night={0.4}/>
    </>
  )
}