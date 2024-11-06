import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const RecordSchema = z.object({
    text: z.string().optional(),
    // file: z.string().optional(),
    file: z
                        .any()
                        // .refine((files) => files?.length > 1, "Al menos una imágen es requerida.")
                        .refine((files) => files?.length == 1, "Solo una imágen es requerida.")
                        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `El tamaño máximo del archivo es 5 MB`)
                        .refine(
                        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                        ".jpg, .jpeg, .png y .webp son extensiones válidas."
                        )
                        ,
});


export const ResolverImageMessageSchema = () =>{
    return toTypedSchema(RecordSchema);
} 