<template>
  <UContainer>
    <div class="w-full flex justify-center items-center flex-col text-center">
      <div class="text-xl font-bold">WANI!</div>
      <div class="font-medium mb-3">Solusi Para Pencari Kerja Mikro</div>
      <div>Mendorong kekuatan ekonomi masyarakat dalam tingkat mikro.</div>
      <div class="w-48 bg-white rounded-xl p-2 shadow rotate-3 transition-all my-5">
        <img src="/images/hero.jpg" class="rounded" />
      </div>
      <div class="mt-3">
        <div class="">Solusi Yang Kami Tawarkan</div>
        <div class="bg-white rounded-xl shadow w-62 mt-2 p-3">
          <div v-for="offer in offers" class="text-start p-3">
            <div class="font-medium">{{ offer.title }}</div>
            <div class="text-sm">{{ offer.desc }}</div>
          </div>
          <div class="flex flex-col justify-center items-center mt-5 gap-2">
            <div>Kamu Tertarik ?</div>
            <UButton color="info">Daftar Sekarang</UButton>
          </div>
        </div>
      </div>
      <div class="mt-5" id="contoh">
        <div>Contoh Pekerjaan Yang Lain</div>
        <div class="mt-2">
          <UCarousel v-slot="{ item }" loop auto-scroll :items="items" class="w-full max-w-xs mx-auto">
            <img :src="item.photo" width="320" height="320" class="rounded-lg" />
            <div>{{ item.desc }}</div>
          </UCarousel>
          <div class="mt-3">dan masih banyak lagi, tulis aja kamu perlu bantuan apa...</div>
          <div class="mt-1 flex gap-1 justify-center">
            <UInput color="info" placeholder="Tolong dong ..." />
            <UButton size="md" color="info">Kirim</UButton>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const offers = ref([
  {
    title: "Stay Productive",
    desc: "Dapetin uang sembari menikmati waktu luang dengan bantuin orang :)",
  },
  {
    title: "Cari Pekerja Mikro",
    desc: "Kamu perlu orang untuk stalking gebetan, cari di sini aja",
  },
  {
    title: "Jadi Mitra",
    desc: "Kamu bisa jadi mitra kami, nanti akan dibayar kalo kerjaannya udah kelar. Say NO to nganggur",
  },
]);

const items = ref([
  { photo: "/images/mekanik.jpg", desc: "Mekanik Motor" },
  { photo: "/images/stalking-pacar.jpg", desc: "Tukang Stalking" },
  { photo: "/images/temen-curhat.jpg", desc: "Temen Curhat/Nongkrong" },
  { photo: "/images/temen-jogging.jpg", desc: "Temen Jogging" },
  { photo: "/images/tukang-angkat.jpg", desc: "Tukang Angkat Barang" },
]);
</script>
