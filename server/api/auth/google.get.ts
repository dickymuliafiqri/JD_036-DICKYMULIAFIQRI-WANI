import { getUserData } from "../user/index.get";
import { postUserData } from "../user/index.post";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user });

    const isExists = await getUserData(event);
    if (isExists.length < 1) {
      await postUserData(event);
    }

    return sendRedirect(event, "/dashboard");
  },
});
