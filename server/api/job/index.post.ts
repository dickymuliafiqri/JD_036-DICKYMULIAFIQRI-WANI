import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";

export default eventHandler(async (event) => {
  return await postJobData(event);
});

export async function postJobData(event: H3Event<EventHandlerRequest>) {
  const { title, desc, location, offers, expiredAt } = await useValidatedBody(event, {
    title: z.string().min(8),
    desc: z.string().min(16),
    location: z.string().min(2),
    offers: z.number().min(10000),
    expiredAt: z.string(),
  });
  const { user } = await requireUserSession(event);

  const add = await useDB()
    .insert(tables.jobsTable)
    .values({
      title: title,
      desc: desc,
      location: location,
      offers: offers,
      createdAt: new Date(),
      expiredAt: new Date(expiredAt),
      owner: user.sub,
    })
    .returning()
    .get();

  return add;
}
