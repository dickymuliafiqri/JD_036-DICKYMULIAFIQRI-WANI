import { v4 as uuidv4 } from "uuid";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../user/index.get";
import { patchUserCredit } from "../user/[id].patch";
import { chatWithAi } from "~~/server/utils/ai";

export default eventHandler(async (event) => {
  return await postJobData(event);
});

export async function postJobData(event: H3Event<EventHandlerRequest>) {
  const { title, desc, category, offers } = await useValidatedBody(event, {
    title: z.string().min(8),
    desc: z.string().min(16),
    category: z.string(),
    offers: z.number().min(10000),
  });

  const checkPromp = `Apakah teks berikut mengandung unsur SARA atau unsur tidak pantas lain dalam bahasa apapun termasuk simbol dan angka ?, jawab dengan Ya atau Tidak.\n\n${title}\n${desc}`;
  const isForbidden = (await chatWithAi(checkPromp)).search(/ya/i) >= 0;

  if (isForbidden) {
    throw createError({
      statusCode: 403,
      statusMessage: "Kata tidak diizinkan terdeteksi!",
    });
  }

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
        offers: offers,
        createdAt: new Date(),
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
