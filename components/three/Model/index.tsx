import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import useTextTagStore from "@/app/store/textTagStore";
import { generateUUID } from "three/src/math/MathUtils.js";

function Model({
    model,
}: {
    model: {
        name: string;
        url: string;
    };
}) {
    const { url } = model;
    const { scene } = useGLTF(url);

    const { textTagMode, updateTextTagDraft, } = useTextTagStore()

    const [hoveredObject, setHoveredObject] = useState<THREE.Object3D | null>(null);
    const [originalColor, setOriginalColor] = useState(null);

    const handlePointerOver = (event: ThreeEvent<MouseEvent>) => {
        if (!textTagMode) {
            return;
        }
        event.stopPropagation();
        const obj = event.object;
        if (obj instanceof THREE.Mesh) {
            const color = obj.material.color.clone();
            setOriginalColor(color);
            obj.material = obj.material.clone();
            obj.material.color = new THREE.Color('blue');
            setHoveredObject(obj);
        }
    };

    const handlePointerOut = (event: ThreeEvent<MouseEvent>) => {
        if (!textTagMode) {
            return;
        }
        event.stopPropagation();
        const obj = event.object;
        if (obj instanceof THREE.Mesh && hoveredObject && obj === hoveredObject) {
            obj.material.color.copy(originalColor);
            setHoveredObject(null);
            setOriginalColor(null);
        }
    };

    const handlePointerDown = (event: ThreeEvent<MouseEvent>) => {
        if (!textTagMode) {
            return;
        }
        event.stopPropagation();
        const obj = event.object;

        if (obj instanceof THREE.Mesh &&
            event.nativeEvent.target instanceof HTMLElement && !event.nativeEvent.target.closest('.text-tag')) {
            const point = event.point.clone();

            const textTag = {
                id: generateUUID(),
                position: {
                    x: point.x,
                    y: point.y,
                    z: point.z,
                },
                meshUuid: obj.uuid,
                text: "New Tag",
            }

            updateTextTagDraft(textTag);

        }

    }
    return <group>
        <primitive
            object={scene}
            onPointerDown={handlePointerDown}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut} />
    </group>
}

export default Model;