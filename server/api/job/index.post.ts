import { v4 as uuidv4 } from "uuid";
import { EventHandlerRequest, H3Event } from "h3";
import { useValidatedBody, z } from "h3-zod";
import { tables, useDB } from "~~/server/utils/database";
import { getUserDataById } from "../user/index.get";
import { patchUserCredit } from "../user/[id].patch";
import { chatWithAi } from "~~/server/utils/ai";

export default eventHandler(async (event) => {
  return await postJobData(event);
});

export async function postJobData(event: H3Event<EventHandlerRequest>) {
  const { title, desc, category, offers } = await useValidatedBody(event, {
    title: z.string().min(8),
    desc: z.string().min(16),
    category: z.string(),
    offers: z.number().min(10000),
  });

  const checkPromp = `
Anda adalah seorang ahli bahasa yang profesional, khususnya dalam bahasa Indonesia.  
Tugas Anda adalah menentukan apakah teks berikut harus diberi label "Ya" atau "Tidak".  

Jawablah hanya dengan salah satu dari dua pilihan berikut:  
- "Ya"  
- "Tidak"  

Aturan:  
Jawab "Ya" jika teks memenuhi salah satu dari kondisi berikut:  
1. Mengandung unsur SARA (Suku, Agama, Ras, dan Antargolongan) atau hal yang tidak etis.  
2. Tidak memiliki konteks tujuan yang jelas (membingungkan atau tidak masuk akal).  
3. Mengandung kata atau kalimat yang tidak jelas (contoh: terpotong, typo berlebihan, atau tidak bermakna).  
4. Mengandung teks yang berusaha disamarkan dengan cara mengganti huruf/angka/simbol sehingga tidak terbaca normal.  

Jika teks tidak memenuhi salah satu kriteria di atas, maka jawab "Tidak".  

Contoh Kasus:  
- "t3m3n!n" → Jawaban: "Ya" (teks disamarkan).  
- "t i dur" → Jawaban: "Ya" (kata tidak jelas).  
- "itunya dianuin" → Jawaban: "Ya" (konteks tidak jelas).  
- "Hari ini saya belajar memasak" → Jawaban: "Tidak" (jelas dan wajar).  

Teks yang akan diperiksa:  
---  
JUDUL: ${title}  
DESKRIPSI: ${desc}  
---`;
  const isForbidden = (await chatWithAi(checkPromp)).search(/ya/i) >= 0;

  if (isForbidden) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pekerjaan mengandung unsur yang tidak diizinkan!",
    });
  }

  const { user } = await requireUserSession(event);
  const userData = (await getUserDataById(user.sub))[0];

  if (userData.credit >= 2000) {
    const add = await useDB()
      .insert(tables.jobsTable)
      .values({
        id: uuidv4(),
        title: title,
        desc: desc,
        category: category,
        offers: offers,
        createdAt: new Date(),
        owner: user.sub,
      })
      .returning()
      .get();

    await patchUserCredit(userData.id, userData.credit - 2000);

    return add;
  } else {
    throw createError({
      statusCode: 402,
      statusText: "Saldo tidak mencukupi",
    });
  }
}
