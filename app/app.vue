<template>
  <UApp>
    <div>
      <NuxtRouteAnnouncer />
      <div v-if="isMobile">
        <div class="min-w-full min-h-16 px-10 pt-5 flex justify-center fixed top-0 z-50">
          <NavBar />
        </div>
        <div class="mt-20 scroll-smooth">
          <NuxtPage />
        </div>
        <div class="mt-10 bottom-0">
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
const { isMobile } = useDevice();
</script>
