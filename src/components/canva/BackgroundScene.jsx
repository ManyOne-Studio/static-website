import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';

export default function BackgroundScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [1, 5, 40], fov: 10 }}
        dpr={[1, 2]} // Optimisation performance pour écrans Retina
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}