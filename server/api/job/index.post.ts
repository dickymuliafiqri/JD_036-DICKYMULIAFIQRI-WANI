import { v4 as uuidv4 } from "uuid";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables } from "~~/server/utils/database";
import { getUserDataById } from "../user/index.get";
import { isForbidden } from "./utils";
import { JOB_CREATE_FEE, JOB_ANONYM_FEE } from "../../../constant";
import { eq } from "drizzle-orm";
import { runTxs } from "~~/server/database/tx";

export default eventHandler(async (event) => {
  return await postJobData(event);
});

export async function postJobData(event: H3Event<EventHandlerRequest>) {
  const { title, desc, category, offers, anonym } = await useValidatedBody(event, {
    title: z.string(),
    desc: z.string(),
    category: z.string(),
    offers: z.number().min(10000),
    anonym: z.boolean(),
  });

  if (await isForbidden(title, desc)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pekerjaan mengandung unsur yang tidak diizinkan!",
    });
  }

  const { user } = await requireUserSession(event);
  const userData = (await getUserDataById(user.sub))[0];

  if (userData.credit >= JOB_CREATE_FEE) {
    return await runTxs(async (tx) => {
      await tx.insert(tables.jobsTable).values({
        id: uuidv4(),
        title: title,
        desc: desc,
        category: category,
        offers: offers,
        createdAt: new Date(),
        anonym: anonym ? 1 : 0,
        owner: user.sub,
      });

      await tx
        .update(tables.usersTable)
        .set({
          credit: userData.credit - (JOB_CREATE_FEE + (anonym ? JOB_ANONYM_FEE : 0)),
        })
        .where(eq(tables.usersTable.id, userData.id));
    });
  } else {
    throw createError({
      statusCode: 402,
      statusText: "Saldo tidak mencukupi",
    });
  }
}
