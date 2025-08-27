<template>
  <div class="w-full h-76">
    <div class="absolute -z-10">
      <div class="absolute inset-0 bg-gradient-to-r from-black opacity-50"></div>
      <img src="/images/hero.jpg" />
    </div>
    <div class="text-white ml-8 pt-10">
      <div class="absolute text-amber-300 ml-33 -mt-4 text-4xl font-black">*</div>
      <div class="font-bold">Sejak Kapan Cari</div>
      <div class="title text-4xl w-64">CUAN SEGAMPANG INI??</div>
    </div>
    <SolidShadowButton
      text="BURUAN GABUNG SEKARANG!"
      inner-class="bg-raka-blue-20 -rotate-2"
      class="mt-3 ml-6"
      :exec="
        () => {
          if (!loggedIn) {
            navigateTo('/api/auth/google');
          } else {
            navigateTo('/dashboard');
          }
        }
      "
    />
  </div>
  <UContainer class="mt-20">
    <div class="w-full flex justify-center">
      <SearchBar />
    </div>
    <div class="w-full flex flex-col justify-center items-center mt-8">
      <div class="title text-4xl">Kategori</div>
      <PageCategoryList class="my-5" />
    </div>
  </UContainer>
  <div class="w-full flex flex-col justify-center items-center mt-8 border-t-2">
    <UContainer>
      <div class="title flex items-center gap-2 mt-6">
        <span class="text-amber-300 text-4xl font-bold">*</span>
        <div class="text-2xl">Pekerjaan Baru!</div>
      </div>
      <PageJobList class="mt-3" />
    </UContainer>
  </div>
  <div id="rating" class="w-full flex flex-col justify-center items-center mt-8 border-t-2">
    <UContainer>
      <div class="title flex items-center gap-2 mt-6">
        <span class="text-amber-300 text-4xl font-bold">*</span>
        <div class="text-2xl">Rating Pengguna!</div>
      </div>
      <PageRatingCarousel class="mt-3" />
      <PageRatingForm v-if="loggedIn" class="mt-5" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { loggedIn } = useUserSession();
</script>
