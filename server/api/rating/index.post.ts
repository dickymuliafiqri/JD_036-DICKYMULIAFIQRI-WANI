import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getSelfRatingData } from "./index.get";

export default eventHandler(async (event) => {
  return await postRatingData(event);
});

export async function postRatingData(event: H3Event<EventHandlerRequest>) {
  const { text, rating } = await useValidatedBody(event, {
    text: z.string(),
    rating: z.number().min(1).max(5),
  });

  if ((await getSelfRatingData(event)).length <= 0) {
    const { user } = await requireUserSession(event);

    const rate = await useDB()
      .insert(tables.ratingsTable)
      .values({
        review: text,
        rating: rating,
        raterId: user.sub,
        createdAt: new Date(),
      })
      .returning()
      .get();

    return rate;
  } else {
    throw createError({
      statusCode: 510,
      statusMessage: "Exists!",
    });
  }
}
