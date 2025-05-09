import useTextTagStore, { TextTagProps } from "@/app/store/textTagStore";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from 'gsap';
import * as THREE from 'three';

function TextTag({ textTag }: { textTag: TextTagProps }) {
    const { position, text } = textTag
    const { camera } = useThree();
    const { setTextTagMode } = useTextTagStore()
    const moveCameraTo = (position: { x: number; y: number; z: number }) => {
        setTextTagMode(false)
        const targetPos = new THREE.Vector3(position.x, position.y, position.z);
        const dir = camera.position.clone().sub(targetPos).normalize();

        gsap.to(camera.position, {
            x: targetPos.x + dir.x * 2,
            y: targetPos.y + dir.y * 2,
            z: targetPos.z + dir.z * 2,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
                camera.updateProjectionMatrix();

            },
        });

    };

    return <group

        position={[position.x, position.y, position.z]}>
        <Html >
            <div onPointerDown={(e) => e.stopPropagation()}>
                <div className="flex  justify-center"

                >
                    <div className=" absolute bottom-0 bg-yellow-500 w-[0.8px] h-8">.</div>
                    <div className=" absolute bg-blue-500 w-3 h-3 rounded-full">.</div>
                </div>
                <div id="text-tag" className="absolute left-1/2 
        translate-x-[-50%] 
        bottom-4
        z-[99] min-w-20 m-4 p-2 bg-yellow-500  shadow-md cursor-pointer"
                >
                    <div className="flex gap-2" onDoubleClick={() => moveCameraTo(position)}>
                        <p>
                            {text}
                        </p>

                    </div>
                </div>
            </div>
        </Html>
    </group >
}
export default TextTag;