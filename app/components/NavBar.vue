<template>
  <div class="min-w-[50%] h-max grid bg-white shadow-md px-3 py-2 gap-4 transition-all rounded-full">
    <div class="row-span-1">
      <div class="grid grid-cols-6">
        <div class="col-span-5 flex justify-start items-center gap-1">
          <span class="font-medium text-xs">WANI | Platform Pekerja Mikro</span>
        </div>
        <div class="flex justify-center items-center" @click="isOpen = !isOpen" ref="menu">
          <Icon name="uil:ellipsis-v" class="text-xl"></Icon>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isOpen"
    class="flex flex-col min-w-[45%] transition-all h-1 bg-white absolute -z-10 rounded-2xl mt-10 shadow-md p-3 gap-1"
    :class="isOpen ? 'h-max' : 'h-1'"
  >
    <div v-for="nav in navLinks">
      <NuxtLink :to="nav.to" class="font-medium">{{ nav.title }}</NuxtLink>
    </div>
    <div>
      <UButton
        v-if="!loggedIn"
        size="xs"
        color="info"
        to="/api/auth/google"
        icon="i-simple-icons-google"
        label="Login with Google"
        external
      />
      <UButton
        v-else
        size="xs"
        color="error"
        @click="
          async () => {
            await clear();
            reloadWindow();
          }
        "
        :label="'Logout ' + user?.given_name"
        external
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, useTemplateRef } from "vue";
const { loggedIn, user, clear } = useUserSession();

const isOpen = ref(false);
const navLinks = ref([
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Contoh Pekerjaan",
    to: "#contoh",
  },
]);

if (loggedIn.value) {
  navLinks.value.push({
    title: "Dashboard",
    to: "/dashboard",
  });
}

const target = useTemplateRef<HTMLElement>("menu");
onClickOutside(target, () => {
  if (isOpen.value == true) {
    isOpen.value = !isOpen.value;
  }
});
</script>
