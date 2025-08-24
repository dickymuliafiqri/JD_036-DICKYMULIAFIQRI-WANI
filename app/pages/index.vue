<template>
  <UContainer>
    <div class="w-full flex justify-center items-center flex-col text-center">
      <div class="text-xl font-bold">WANI!</div>
      <div class="font-medium mb-3">Solusi Para Pencari Kerja Mikro</div>
      <div>Mendorong kekuatan ekonomi masyarakat dalam tingkat mikro.</div>
      <div class="w-48 bg-white rounded-xl p-2 shadow hover:rotate-3 transition-all my-5">
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
</script>
