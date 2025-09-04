import { Xendit } from "xendit-node";
import { XENDIT_SECRET_KEY } from "./constant";

export const xenditClient = new Xendit({
  secretKey: XENDIT_SECRET_KEY,
});
