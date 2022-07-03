import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Stats,
  PresentationControls,
  useAnimations,
  Plane,
} from "@react-three/drei";

function Model() {
  const { scene, animations } = useGLTF(
    new URL("../static/kangaroo.glb", import.meta.url).toString()
  );
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions["All Animations"].play();
  });

  scene.children[0].children[1].castShadow = true;
  scene.children[0].children[1].receiveShadow = true;

  return <primitive object={scene} />;
}

export function App() {
  return (
    <Canvas
      shadows
      gl={{ logarithmicDepthBuffer: true }}
      dpr={[1, 2]}
      camera={{ fov: 25, position: [0, 0, 8] }}
    >
      <color attach="background" args={["#f5f5f5"]} />
      <fog attach="fog" args={["#f5f5f5", 8, 15]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[1, 2, 8]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={1}
        shadow-camera-bottom={-1}
        shadow-bias={-0.004}
      />

      <PresentationControls
        global
        zoom={0.8}
        rotation={[0.25, -Math.PI / 4, 0]}
        polar={[0, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group position={[0, -0.5, 0]} dispose={null}>
          <Model />
          <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <meshStandardMaterial color="#DBD6CB" />
          </Plane>
        </group>
      </PresentationControls>

      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
}
