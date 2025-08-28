import { CreateInvoiceRequest, Invoice } from "xendit-node/invoice/models";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";

export default eventHandler(async (event) => {
  return await postInvoiceData(event);
});

export async function postInvoiceData(event: H3Event<EventHandlerRequest>) {
  const { amount } = await useValidatedBody(event, {
    amount: z.number().min(10000),
  });
  const { user } = await requireUserSession(event);

  const externalId = `invoice_${new Date().getTime()}_${user.sub}`;
  const invoiceData: CreateInvoiceRequest = {
    amount: amount,
    externalId: externalId,
    successRedirectUrl: "https://wani.nuxt.dev/dashboard",
  };

  const invoiceRes: Invoice = await xenditClient.Invoice.createInvoice({ data: invoiceData });

  return invoiceRes;
}
