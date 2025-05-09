import { create } from 'zustand'


export interface Model {
    id: string;
    name: string;
    url: string;
}

interface ModelStore {
    models: Record<string, Model>;
    addModel: (model: Model) => void;
    removeModel: (id: string) => void;
    resetModels: () => void;
}


const useFileStore = create<ModelStore>((set) => ({
    models: {},
    addModel: (model) =>
        set((state) => {
            const models = { ...state.models };
            models[model.id] = model;
            return {
                models,
            };
        }),
    removeModel: (index) =>
        set((state) => {
            const models = { ...state.models };
            delete models[index];
            return {
                models,
            };
        }),
    resetModels: () =>
        set(() => {
            return {
                models: {},
            };
        }),
}))

export default useFileStore;
