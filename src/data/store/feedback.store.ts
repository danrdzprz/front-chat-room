import { defineStore } from 'pinia';
import type { FeedbackDomain } from '../modules/shared/domain/feedback.domain';

export const useFeedbackStore = defineStore('FEEDBACK_STORE', {
    state: ():FeedbackDomain => ({ 
        visible:false,
        message:"",
        color:"",
     }),
    getters: {
      get_visible: (state):boolean => state.visible,
      get_message: (state):string => state.message,
    },
    actions: {
      openSuccess(data: { message:string, color?:string}) {
        this.visible = true;
        this.message = data.message;
        this.color = 'green';
      },
      openError(data: { message:string, color?:string}) {
        this.visible = true;
        this.message = data.message;
        this.color = 'red-accent-4';
      },
      close() {
        this.visible = false;
      },
    }
});