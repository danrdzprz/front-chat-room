import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const RecordSchema = z.object({
    name: z.string().min(3).max(100).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, 'Debe contener solo letras'),
    email: z.string().email(),
    password: z.string()
    .min(8,"La contraseña debe tener una longitud mínima de 8 caracteres")
    .regex( /[A-Z]/ , "Debe contener al menos una letra mayúscula")
    .regex( /[0-9]/ , "Debe contener al menos una número")
    .regex( /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/ , "Debe contener al menos un carácter especial"),
    password_confirmation: z.string()
    .min(8,"La contraseña debe tener una longitud mínima de 8 caracteres")
    .regex( /[A-Z]/ , "Debe contener al menos una letra mayúscula")
    .regex( /[0-9]/ , "Debe contener al menos una número")
    .regex( /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/ , "Debe contener al menos un carácter especial"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"], // path of error
  });


export const ResolverRegisterSchema = () =>{
    return toTypedSchema(RecordSchema);
} 