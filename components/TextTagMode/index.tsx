import useTextTagStore, { TextTagProps } from "@/app/store/textTagStore";
import { useState } from "react";

function TextTagMode() {

    const { textTagMode, setTextTagMode, textTags, removeTextTag, updateTextTag } = useTextTagStore()
    const [editingTagId, setEditingTagId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    const handleToggleTextTagMode = () => {
        setTextTagMode(!textTagMode);
    };

    const handleEditTag = (tag: TextTagProps) => {
        setEditingTagId(tag.id);
        setEditingText(tag.text);
    };

    const handleSaveTag = (tagId: string) => {
        const updatedTag = {
            ...textTags[tagId],
            text: editingText,
        };
        updateTextTag(updatedTag);
        setEditingTagId(null);
        setEditingText("");
    };

    const handleCancelEdit = () => {
        setEditingTagId(null);
        setEditingText("");
    };

    const handleDeleteTag = (tag: TextTagProps) => {
        removeTextTag(tag.id);
    };

    return <div className="absolute top-4 right-4 z-[99] p-4 bg-accent rounded-lg shadow-md">
        <button onClick={handleToggleTextTagMode} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            {
                textTagMode ? "Exiting Text Tag Mode" : " Entering Text Tag Mode"
            }
        </button>

        <div>
            {
                textTags && Object.keys(textTags).length > 0 ? (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Text Tags:</h3>
                        <ul className="list-disc list-inside">
                            {Object.values(textTags).map((tag) => (
                                <li key={tag.id} className="mt-2 flex justify-between items-center">
                                    {editingTagId === tag.id ? (
                                        <input
                                            type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            className="border p-1 rounded"
                                        />
                                    ) : (
                                        <span className="font-medium">{tag.text}</span>
                                    )}
                                    <div className="flex gap-2">
                                        {editingTagId === tag.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveTag(tag.id)}
                                                    className="text-green-500"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="text-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEditTag(tag)}
                                                    className="text-blue-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTag(tag)}
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="mt-4">
                        <p>No text tags created yet.</p>
                    </div>
                )
            }
        </div>
    </div>;
}
export default TextTagMode;