import type { ResponseFailure } from "~/data/modules/shared/domain/ResponseFailure";
import { useFeedbackStore } from "~/data/store/feedback.store";

export const HandleServerErrors = (e: any, ):  ResponseFailure["message"]=>{
    const feedback = useFeedbackStore();
    try {
        const {message, error, statusCode} = e as ResponseFailure;
        if(message && typeof message === 'object' && message !== null){
          for (const key in message) {
            if (Object.prototype.hasOwnProperty.call(message, key)) {
              const element = message[key];
              for (const msg of element) {
                feedback.openError({message:`${msg}`});
              }
            }
          }
          return message;
        }
        if(message && typeof message === 'string' && message !== null){
          feedback.openError({message:`${message}`});
        }
        return message;
      } catch (error) {
        feedback.openError({message:'Error en el servidor'});
        return '';
      }
}