
'use client';
import TextTagMode from "@/components/TextTagMode";
import ModelViewer from "@/components/three/ModelViewer";
import TextTagRenderer from "@/components/three/TextTagRenderer";
import Uploader from "@/components/Uploader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div>
      <Uploader />
      <TextTagMode />
      <div id="canvas-container" className="w-full h-screen">
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={2} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[30, 40, 15]} />
          <ModelViewer />
          <TextTagRenderer />
        </Canvas>
      </div>
    </div>
  );
}
