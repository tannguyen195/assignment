import useModelStore from "@/app/store/fileStore";
import Model from "../Model";

function ModelViewer() {
    const { models } = useModelStore();
    const modelArr = Object.values(models);
    return (
        <group>
            {modelArr.map((model) => 
            
            <Model key={model.id} model={model} />)}
        </group>
    );
}

export default ModelViewer;