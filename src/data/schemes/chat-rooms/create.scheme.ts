import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(3),
});


export const ResolverCreateChatRoomSchema = () =>{
    return toTypedSchema(RecordSchema);
} 