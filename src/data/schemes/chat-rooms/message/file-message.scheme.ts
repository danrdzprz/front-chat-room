import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const RecordSchema = z.object({
    text: z.string().optional(),
    // file: z.string().optional(),
    file: z
                        .any()
                        .refine((files) => files?.size <= MAX_FILE_SIZE, `El tamaño máximo del archivo es 5 MB`)
                        .refine(
                        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
                        ".jpg, .jpeg, .png y .webp son extensiones válidas."
                        )
                        ,
});


export const ResolverFileMessageSchema = () =>{
    return toTypedSchema(RecordSchema);
} 