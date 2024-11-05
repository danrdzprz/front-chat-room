import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8,"La contraseña debe tener una longitud mínima de 8 caracteres")
        .regex( /[A-Z]/ , "Debe contener al menos una letra mayúscula")
        .regex( /[0-9]/ , "Debe contener al menos una número")
        .regex( /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/ , "Debe contener al menos un caracter especial")
});


export const ResolverLoginSchema = () =>{
    return toTypedSchema(RecordSchema);
} 