import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => {
    return {
      isOpen: false,
      text: "",
    };
  },

  actions: {
    clear() {
      this.isOpen = false;
      this.text = "";
      this.exec = async () => {};
    },
    async exec() {
      // Custom logic here
    },
  },
});
