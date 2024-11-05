import { defineStore } from 'pinia';
type MenuType = {
  left_menu: boolean;right_menu: boolean;
}
export const useMenuState = defineStore('MENU_STATE', {
    state: (): MenuType => ({ 
        left_menu:true,
        right_menu:false,
     }),
    getters: {
      getLeftMenu: (state):boolean => state.left_menu,
      getRightMenu: (state):boolean => state.right_menu,
    },
    actions: {
      toggleRightMenu() {
        this.right_menu = !this.right_menu;
      },
      toggleLeftMenu() {
        this.left_menu = !this.left_menu;
      },
    }
});