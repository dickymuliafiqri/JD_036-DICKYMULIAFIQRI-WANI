import { eq } from "drizzle-orm";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";

export default eventHandler(async (event) => {
  return await patchUserData(event);
});

export async function patchUserData(event: H3Event<EventHandlerRequest>) {
  const { phone, location, about, speciality } = await useValidatedBody(event, {
    phone: z.number().min(10),
    location: z.string(),
    about: z.string(),
    speciality: z.array(z.string()),
  });
  const { user } = await requireUserSession(event);

  const update = await useDB()
    .update(tables.usersTable)
    .set({
      phone: phone,
      location: location,
      about: about,
      speciality: (speciality as Array<string>).join(","),
    })
    .where(eq(tables.usersTable.id, user.sub))
    .returning()
    .get();

  return update;
}

export async function patchUserCredit(id: string, credit: number) {
  const update = await useDB()
    .update(tables.usersTable)
    .set({
      credit: credit,
    })
    .where(eq(tables.usersTable.id, id))
    .returning()
    .get();

  return update;
}
