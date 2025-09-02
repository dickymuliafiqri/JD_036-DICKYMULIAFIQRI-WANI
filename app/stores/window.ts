import { defineStore } from "pinia";

export const useWindowStore = defineStore("window", {
  state: () => {
    return {
      x: 0,
      y: 0,
    };
  },
});
