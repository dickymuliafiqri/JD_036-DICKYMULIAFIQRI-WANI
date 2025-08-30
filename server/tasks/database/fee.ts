import { getJobsDataByOwnerId } from "~~/server/api/job/index.get";
import { patchUserCredit } from "~~/server/api/user/[id].patch";
import { getUsersData } from "~~/server/api/user/index.get";

export default defineTask({
  meta: {
    name: "database:fee",
    description: "Calculate and charge users for active job",
  },
  async run({ payload, context }) {
    const errors = [];
    const users = await getUsersData();

    for (const user of users) {
      const activeJobs = (await getJobsDataByOwnerId(user.id)).length;
      const totalFee = activeJobs * 1000;

      try {
        await patchUserCredit(user.id, user.credit - totalFee);
      } catch (e: any) {
        errors.push(e.message);
      }
    }

    if (errors.length) {
      return { result: errors.join("\n") };
    }

    return { result: "Success" };
  },
});
