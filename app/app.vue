<template>
  <UApp>
    <div>
      <NuxtRouteAnnouncer />
      <div v-if="isMobile">
        <FullAlert v-if="alertStore.isOpen" class="fixed z-50">
          {{ alertStore.text }}
        </FullAlert>
        <div class="min-w-full h-max flex justify-center fixed top-0 z-40 bg-red-500">
          <NavBar />
        </div>
        <div class="min-h-screen mt-18">
          <NuxtPage />
        </div>
        <div class="mt-10">
          <Footer></Footer>
        </div>
      </div>
      <div v-else class="min-h-screen min-w-screen flex justify-center items-center">
        Hanya Bisa Diakses Menggunakan Handphone
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

const { y, x } = useWindowScroll();
const { isMobile } = useDevice();

watch(y, () => {
  windowStore.y = y.value;
  windowStore.x = x.value;
});

useHead({
  title: "WANI! - Platform Pencari Kerja Mikro",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "WANI! adalah platform pencari kerja mikro yang menghubungkan pekerja dengan peluang kerja jangka pendek dan tugas-tugas kecil. Temukan pekerjaan yang sesuai dengan keahlian Anda dan mulai menghasilkan uang hari ini!",
    },
    { name: "keywords", content: "kerja mikro, pekerjaan jangka pendek, tugas kecil, freelance, peluang kerja" },
    { name: "author", content: "WANI!" },
    { name: "google-site-verification", content: "JH4w48d89OGvXgH0hsodi_YDyJXi5SQbP7WNP3roog8" },
    { property: "og:title", content: "WANI! - Platform Pencari Kerja Mikro" },
    {
      property: "og:description",
      content:
        "WANI! adalah platform pencari kerja mikro yang menghubungkan pekerja dengan peluang kerja jangka pendek dan tugas-tugas kecil. Temukan pekerjaan yang sesuai dengan keahlian Anda dan mulai menghasilkan uang hari ini!",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://wani.nuxt.dev" },
    { property: "og:image", content: "https://wani.nuxt.dev/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "WANI! - Platform Pencari Kerja Mikro" },
    {
      name: "twitter:description",
      content:
        "WANI! adalah platform pencari kerja mikro yang menghubungkan pekerja dengan peluang kerja jangka pendek dan tugas-tugas kecil. Temukan pekerjaan yang sesuai dengan keahlian Anda dan mulai menghasilkan uang hari ini!",
    },
    { name: "twitter:image", content: "https://wani.nuxt.dev/twitter-image.jpg" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
