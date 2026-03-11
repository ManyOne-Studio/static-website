
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { BackSide } from 'three'

export default function SkySphere({ textureUrl }) {
  const texture = useLoader(TextureLoader, textureUrl)

  return (
    <mesh>
      {/* Sphère inversée (faces internes visibles) */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  )
}