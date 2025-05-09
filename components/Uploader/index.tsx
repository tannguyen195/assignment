import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Input } from "../ui/input";
import useModelStore from "@/app/store/fileStore";
import { Label } from "../ui/label";
import { generateUUID } from "three/src/math/MathUtils.js";

function Uploader() {
    const { addModel, models, removeModel } = useModelStore();

    const modelArr = Object.values(models);
    const FormSchema = z.object({
        model: z.instanceof(File).refine((file) => file?.size < 1000_0000, 'Max 100Kb upload size.'
        ).array()
        ,
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length === 1) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            addModel({ name: file.name, url, id: generateUUID() });
            form.reset()
        }
    };

    const modelRef = form.register("model");

    return <div className="absolute w-md z-[99] m-4 p-4 bg-accent rounded-lg shadow-md">
        <Form {...form}>
            <FormField
                control={form.control}
                name="model"
                render={() => {
                    return <>
                        <Label className="mb-3 block text-sm font-medium text-black ">
                            Upload Model
                        </Label>
                        <FormItem className="mb-4.5">
                            <FormLabel className="mb-3 block text-sm font-medium text-black ">
                                Select file from your computer
                            </FormLabel>
                            <FormControl className="border-transparent text-white ">

                                <Input
                                    type="file"
                                    className=" text-white bg-primary"
                                    accept=".gltf, .glb"
                                    {...modelRef}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormMessage >
                                {form.formState.errors.model?.message && (
                                    <p className="text-red-500">{form.formState.errors.model.message}</p>
                                )}
                            </FormMessage>
                        </FormItem>
                    </>
                }}
            />

        </Form>


        <div>
            {
                modelArr.map((model, index) => (
                    <div key={index} className="flex items-center justify-between mt-2">
                        <span>{model.name}</span>
                        <button
                            onClick={() => removeModel(model.id)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))
            }
        </div>
    </div>;
}
export default Uploader;