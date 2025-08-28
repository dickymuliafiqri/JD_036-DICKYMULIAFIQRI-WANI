import { v4 as uuidv4 } from "uuid";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../user/index.get";
import { patchUserCredit } from "../user/[id].patch";

export default eventHandler(async (event) => {
  return await postJobData(event);
});

export async function postJobData(event: H3Event<EventHandlerRequest>) {
  const { title, desc, category, location, offers, expiredAt } = await useValidatedBody(event, {
    title: z.string().min(8),
    desc: z.string().min(16),
    category: z.string(),
    location: z.string().min(2),
    offers: z.number().min(10000),
    expiredAt: z.string(),
  });

  const { user } = await requireUserSession(event);
  const userData = (await getUserDataById(user.sub))[0];

  if (userData.credit >= 2000) {
    const add = await useDB()
      .insert(tables.jobsTable)
      .values({
        id: uuidv4(),
        title: title,
        desc: desc,
        category: category,
        location: location,
        offers: offers,
        createdAt: new Date(),
        expiredAt: new Date(expiredAt),
        owner: user.sub,
      })
      .returning()
      .get();

    await patchUserCredit(userData.id, userData.credit - 2000);

    return add;
  } else {
    throw createError({
      statusCode: 402,
      statusText: "Saldo tidak mencukupi",
    });
  }
}
