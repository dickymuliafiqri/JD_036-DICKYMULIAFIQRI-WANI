import { defineStore } from "pinia";
import { ADMIN_PHONE } from "~~/constant";

export const useJobsStore = defineStore("jobs", {
  state: () => {
    return {
      fullList: [],
    };
  },
  actions: {
    async getJobList() {
      const data = await $fetch("/api/job");
      this.fullList = data.filter((job) => {
        if (job.jobs_table.anonym) {
          job.users_table = {
            ...job.users_table,
            avatar: "",
            name: "Disembunyikan",
            phone: ADMIN_PHONE,
          };
        }

        return job;
      }) as any;
    },
  },
});
