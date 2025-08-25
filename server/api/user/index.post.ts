import { EventHandlerRequest, H3Event } from "h3";
import { tables, useDB } from "~~/server/utils/database";

export default eventHandler(async (event) => {
  return await postUserData(event);
});

export async function postUserData(event: H3Event<EventHandlerRequest>) {
  const { user } = await requireUserSession(event);

  const register = await useDB()
    .insert(tables.usersTable)
    .values({
      id: user.sub,
      name: user.name,
      email: user.email,
    })
    .returning()
    .get();

  return register;
}
