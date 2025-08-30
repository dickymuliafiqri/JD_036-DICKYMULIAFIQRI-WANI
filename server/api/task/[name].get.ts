import { useValidatedParams, useValidatedQuery, z } from "h3-zod";

export default eventHandler(async (event) => {
  const { name } = await useValidatedParams(event, {
    name: z.string(),
  });
  const { session } = await useValidatedQuery(event, {
    session: z.string(),
  });

  if (session != process.env.NUXT_SESSION_PASSWORD!) {
    throw createError({
      statusCode: 401,
    });
  }

  const payload = { ...getQuery(event) };
  const { result } = await runTask(name, { payload });

  return { result };
});
