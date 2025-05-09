import useTextTagStore from "@/app/store/textTagStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Html } from "@react-three/drei";

function TextTagDraft() {
    const { textTagMode, textTagDraft, addTextTag, updateTextTagDraft } = useTextTagStore();

    const handleAddTextTag = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (textTagDraft) {
            const newTextTag = {
                ...textTagDraft,
                id: textTagDraft.id,
            };
            addTextTag(newTextTag);
            updateTextTagDraft(null);
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const value = event.target.value;
        if (textTagDraft) {
            const updatedTextTag = {
                ...textTagDraft,
                text: value,
            };
            updateTextTagDraft(updatedTextTag);
        }
    }

    return <>
        {
            textTagMode && textTagDraft &&
            <group position={[textTagDraft.position.x, textTagDraft.position.y, textTagDraft.position.z]}>
                <Html >
                    <div id="text-tag" className="absolute w-md z-[99] m-4 p-4 bg-accent  shadow-md"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                            <Input onChange={handleInputChange} onPointerDown={(e) => e.stopPropagation()} >
                            </Input>
                            <Button onPointerDown={handleAddTextTag}>
                                Add
                            </Button>

                        </div>
                    </div>
                    <div className=" absolute bg-amber-300 w-4 h-4 rounded-full">.</div>

                </Html>
            </group >
        }
    </>

}
export default TextTagDraft;