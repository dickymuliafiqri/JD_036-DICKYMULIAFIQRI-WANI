import { SQLiteTransaction } from "drizzle-orm/sqlite-core";

type TxQuery = (tx: SQLiteTransaction<"async", any, any, any>) => Promise<any>;

export async function runTxs(query: TxQuery) {
  return await useDB().transaction(async (tx) => {
    await query(tx);

    return "OK";
  });
}
