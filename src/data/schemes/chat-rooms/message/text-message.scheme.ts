import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    text: z.string().min(1),
});


export const ResolverTextMessageSchema = () =>{
    return toTypedSchema(RecordSchema);
} 