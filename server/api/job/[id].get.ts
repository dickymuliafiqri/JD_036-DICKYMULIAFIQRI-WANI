import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedParams, z } from "h3-zod";
import { getJobDataByID } from "./index.get";

export default eventHandler(async (event) => {
  return await applyJobData(event);
});

export async function applyJobData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);
  const { id } = await useValidatedParams(event, {
    id: z.uuid(),
  });

  const data = await getJobDataByID(id);

  return data;
}
