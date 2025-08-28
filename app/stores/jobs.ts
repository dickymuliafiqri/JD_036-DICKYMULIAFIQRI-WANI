import { defineStore } from "pinia";

export const useJobsStore = defineStore("jobs", {
  state: () => {
    return {
      fullList: [],
    };
  },
  actions: {
    async getJobList() {
      const data = await $fetch("/api/job");
      this.fullList = data as any;
    },
  },
});
