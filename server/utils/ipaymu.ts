import fetch from "node-fetch";
import dayjs from "dayjs";
import { hmacSHA256, sha256 } from "./cipher";
import { IPAYMU_API_KEY, IPAYMU_VA } from "./constant";

export async function createPayment(id: string, amount: number) {
  const body = {
    referenceId: id + ":" + (await hmacSHA256(IPAYMU_API_KEY, id)),
    product: ["Saldo WANI!"],
    qty: [1],
    price: [amount],
    description: ["Mengisi saldo layanan WANI!"],
    returnUrl: "https://wani.nuxt.dev/dashboard",
    notifyUrl: "https://wani.nuxt.dev/api/payment/notify",
    paymentMethod: "qris",
  };

  const bodyEncrypt = await sha256(JSON.stringify(body));
  const stringToSign = "POST:" + IPAYMU_VA + ":" + bodyEncrypt + ":" + IPAYMU_API_KEY;
  const signature = await hmacSHA256(IPAYMU_API_KEY, stringToSign);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    signature: signature,
    va: IPAYMU_VA,
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
