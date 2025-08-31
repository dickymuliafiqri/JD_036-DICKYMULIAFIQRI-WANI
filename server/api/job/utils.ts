export async function isForbidden(title: string, desc: string) {
  const checkPromp = `
Anda adalah seorang ahli bahasa yang profesional, khususnya dalam bahasa Indonesia dan anda berkerja sebagai validator job di platform WANI yang menerima segala jenis pekerjaan.  
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
5. Tidak mengandung konteks pekerjaan/permintaan.

Jika teks tidak memenuhi salah satu kriteria di atas, maka jawab "Tidak".  

Contoh Kasus:  
- "t3m3n!n" → Jawaban: "Ya" (teks disamarkan).  
- "t i dur" → Jawaban: "Ya" (kata tidak jelas).  
- "itunya dianuin" → Jawaban: "Ya" (konteks tidak jelas).  
- "Tolong antar saya ke lapangan" → Jawaban: "Tidak" (jelas, wajar, dan merupakan pekerjaan).  
- "Butuh bantuan stalking pacar" → Jawaban: "Tidak" (merupakan pekerjaan dan meminta bantuan).  
- "Temen push rank" → Jawaban: "Tidak" (meminta bantuan)

Teks yang akan diperiksa:  
---  
JUDUL: ${title}  
DESKRIPSI: ${desc}  
---`;
  return (await chatWithAi(checkPromp)).search(/ya/i) >= 0;
}
