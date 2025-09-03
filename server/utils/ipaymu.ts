import fetch from "node-fetch";
import dayjs from "dayjs";
import { hmacSHA256, sha256 } from "./cipher";

export async function createPayment(id: string, amount: number) {
  const body = {
    referenceId: id,
    product: ["Saldo WANI!"],
    qty: [1],
    price: [amount],
    description: ["Mengisi saldo layanan WANI!"],
    returnUrl: "https://wani.nuxt.dev/dashboard",
    notifyUrl: "https://wani.nuxt.dev/api/payment/notify",
  };

  const apiKey = process.env.IPAYMU_API_KEY!;
  const va = process.env.IPAYMU_VA!;
  const bodyEncrypt = await sha256(JSON.stringify(body));
  const stringToSign = "POST:" + va + ":" + bodyEncrypt + ":" + apiKey;
  const signature = await hmacSHA256(apiKey, stringToSign);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    signature: signature,
    va: va,
    timestamp: dayjs().format("YYYYMMDDhhmmss"),
  };

  try {
    const res = await fetch("https://sandbox.ipaymu.com/api/v2/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const jsData = await res.json();

    return jsData;
  } catch (e: any) {
    console.log(e);
    throw createError({
      statusCode: 500,
      statusMessage: e.message,
    });
  }
}
