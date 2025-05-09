import useTextTagStore from "@/app/store/textTagStore";

import TextTagDraft from "../TextTagDraft";
import TextTag from "../TextTag";
import { useBounds } from "@react-three/drei";

function TextTagRenderer() {
    const { textTags } = useTextTagStore();
    const api = useBounds()

    return <>
        <TextTagDraft />
        <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} >
            {
                Object.values(textTags).map((tag) => (
                    <TextTag
                        key={tag.id}
                        textTag={tag}
                    />
                ))
            }
        </group >
    </>

}
export default TextTagRenderer;