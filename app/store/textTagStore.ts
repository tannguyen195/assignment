import { create } from 'zustand';

export interface TextTagProps {
    id: string;
    text: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    meshUuid: string;
}

export interface TextTagStore {
    textTagDraft: TextTagProps | null;
    textTags: Record<string, TextTagProps>;
    addTextTag: (textTag: TextTagProps) => void;
    removeTextTag: (id: string) => void;
    resetTextTags: () => void;
    setTextTagMode: (textTagMode: boolean) => void;
    updateTextTagDraft: (textTagDraft: TextTagProps | null) => void;
    updateTextTag: (textTag: TextTagProps) => void;
    textTagMode: boolean;
}

const useTextTagStore = create<TextTagStore>((set) => ({
    textTagDraft: null,
    textTagMode: false,
    textTags: {},
    updateTextTagDraft: (textTagDraft) => set(() => ({ textTagDraft })),
    setTextTagMode: (textTagMode) => set(() => ({ textTagMode })),
    addTextTag: (textTag) =>
        set((state) => {
            const textTags = { ...state.textTags };
            textTags[textTag.id] = textTag;
            return {
                textTags,
            };
        }),
    removeTextTag: (id) =>
        set((state) => {
            const textTags = { ...state.textTags };
            delete textTags[id];
            return {
                textTags,
            };
        }),
    updateTextTag: (textTag) => set((state) => {
        const textTags = { ...state.textTags };
        textTags[textTag.id] = textTag;
        return {
            textTags,
        };
    }),
    resetTextTags: () =>
        set(() => {
            return {
                textTags: {},
            };
        }),
}));

export default useTextTagStore;

