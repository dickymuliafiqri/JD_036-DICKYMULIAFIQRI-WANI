import { deleteJobByIds } from "~~/server/api/job/[id].delete";
import { getJobsDataByOwnerId } from "~~/server/api/job/index.get";
import { patchUserCredit } from "~~/server/api/user/[id].patch";
import { getUsersData } from "~~/server/api/user/index.get";
import { JOB_ACTIVE_FEE } from "../../../constant";

export default defineTask({
  meta: {
    name: "database:fee",
    description: "Calculate and charge users for active job",
  },
  async run({ payload, context }) {
    const errors = [];
    const users = await getUsersData();

    for (const user of users) {
      try {
        const jobs = await getJobsDataByOwnerId(user.id);

        if (user.credit <= 0) {
          await deleteJobByIds(jobs.map((job) => job.id));
          break;
        }

        await patchUserCredit(user.id, user.credit - JOB_ACTIVE_FEE);
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
