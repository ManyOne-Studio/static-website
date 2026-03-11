import React, { useRef } from 'react'
import * as THREE from 'three'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const GrassMaterial = shaderMaterial(
    {
        color1: new THREE.Color('#a1ae3e'),
        color2: new THREE.Color('#d4dba8'),
        uCameraPosition: new THREE.Vector3(),
        uTime: 0,
        uNight: 1.0, // 1.0 = jour, 0.1 = nuit
    },
    // Vertex Shader (Inchangé)
    /* glsl */`
    uniform vec3 uCameraPosition;
    uniform float uTime;
    attribute vec3 center;
    attribute vec3 offset;
    attribute float tipness;
    varying float vTipness;

    float hash(vec2 p) {
        return fract(sin(dot(p ,vec2(127.1,311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
        float total = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 4; i++) {
            total += noise(p * frequency) * amplitude;
            frequency *= 2.0;
            amplitude *= 0.5;
        }
        return total;
    }

    void main() {
        float dist = length(center.xz);
        float hillDrop = dist * 0.1;
        vec3 hillCenter = center;
        hillCenter.y -= hillDrop;

        vec3 toCamera = normalize(uCameraPosition - hillCenter);
        float angle = -atan(toCamera.x, toCamera.z);
        float c = cos(angle);
        float s = sin(angle);

        vec3 rotatedOffset = vec3(
            offset.x * c - offset.z * s,
            offset.y,
            offset.x * s + offset.z * c
        );

        float swayStrength = 0.4;
        float n = fbm(hillCenter.xz * 0.3 + vec2(uTime * 0.5, uTime * 0.7));
        float sway = (n * 2.0 - 1.0) * tipness * swayStrength;

        rotatedOffset.x += sway;
        vec3 pos = hillCenter + rotatedOffset;
        vTipness = tipness;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    // Fragment Shader (Modifié pour la nuit)
    /* glsl */`
    varying float vTipness;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float uNight; // On récupère la variable de nuit

    void main() {
        vec3 mixedColor = mix(color1, color2, vTipness);
        // On multiplie la couleur finale par uNight pour l'assombrir
        gl_FragColor = vec4(mixedColor * uNight, 1.0);
    }
    `
)

extend({ GrassMaterial })

const Grass = ({ bladeCount = 100, gridSize = 10, night = 1.0 }) => {
    const { camera } = useThree()
    const materialRef = useRef()

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uCameraPosition.copy(camera.position)
            materialRef.current.uTime = clock.getElapsedTime()
            // On met à jour la valeur uNight dynamiquement
            materialRef.current.uNight = night
        }
    })

    const geometry = React.useMemo(() => {
        const positions = []
        const tipness = []
        const centers = []
        const offsets = []
        const indexes = []
        const bladeWidth = 0.1
        const bladeHeightMin = 0.4
        const bladeHeightRandFactor = 0.4
        const cellsPerSide = Math.ceil(Math.sqrt(bladeCount))
        const cellSize = gridSize / cellsPerSide
        let vertexIndex = 0

        for (let i = 0; i < bladeCount; i++) {
            const row = Math.floor(i / cellsPerSide)
            const col = i % cellsPerSide
            const baseX = col * cellSize - gridSize / 2
            const baseZ = row * cellSize - gridSize / 2
            const offsetX = (Math.random() - 0.5) * cellSize * 0.8
            const offsetZ = (Math.random() - 0.5) * cellSize * 0.8
            const bladeX = baseX + offsetX
            const bladeZ = baseZ + offsetZ
            const bladeHeight = bladeHeightMin + Math.random() * bladeHeightRandFactor
            const c = [bladeX, 0, bladeZ]
            const o0 = [-bladeWidth / 2, 0, 0]
            const o1 = [ bladeWidth / 2, 0, 0]
            const o2 = [ 0, bladeHeight, 0]

            ;[o0, o1, o2].forEach((offset, idx) => {
                offsets.push(...offset)
                centers.push(...c)
                tipness.push(idx === 2 ? 1 : 0)
                positions.push(0, 0, 0)
            })

            indexes.push(vertexIndex, vertexIndex + 1, vertexIndex + 2)
            vertexIndex += 3
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        geo.setAttribute('offset', new THREE.Float32BufferAttribute(offsets, 3))
        geo.setAttribute('center', new THREE.Float32BufferAttribute(centers, 3))
        geo.setAttribute('tipness', new THREE.Float32BufferAttribute(tipness, 1))
        geo.setIndex(indexes)
        return geo
    }, [bladeCount, gridSize])

    return (
        <mesh geometry={geometry}>
            <grassMaterial ref={materialRef} night={0.1}/>
        </mesh>
    )
}

export default Grass