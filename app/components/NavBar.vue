<template>
  <div :class="menuClasses" class="w-full h-18 bg-raka-red-20 border-b-3 shadow-md px-3 py-2 gap-4 transition-all">
    <div class="grid grid-cols-3 h-13">
      <div class="col-span-1 my-auto h-max flex justify-start items-center">
        <div
          class="w-max flex justify-center p-1 rounded-full bg-white border-2 shadow-solid-sm"
          @click="toggleMenu"
          ref="menu"
        >
          <Icon name="ic:round-menu" class="text-2xl bg-raka-blue-10"></Icon>
        </div>
      </div>
      <div class="w-full col-span-1 my-auto h-max">
        <NuxtLink to="/" class="flex justify-center items-center w-full title text-white text-2xl">WANI!</NuxtLink>
      </div>
      <NuxtLink
        v-if="!loggedIn"
        class="col-span-1 my-auto h-max flex justify-end items-center"
        to="/api/auth/google"
        external
      >
        <h1 class="title text-4xl text-white">JOIN!</h1>
      </NuxtLink>
      <div
        v-else
        class="col-span-1 my-auto h-max flex justify-end items-center"
        @click="
          async () => {
            await clear();
            reloadWindow();
          }
        "
      >
        <h1 class="title text-2xl text-white">LOGOUT!</h1>
      </div>
    </div>
    <div v-if="isOpen" class="w-full flex flex-col items-center mt-5">
      <div v-for="nav in navLinks" class="w-full flex justify-end">
        <NuxtLink :to="nav.to" class="font-medium flex title text-2xl text-white my-1" :class="nav.class">{{
          nav.title
        }}</NuxtLink>
      </div>
      <div class="mt-10">
        <UButton
          v-if="!loggedIn"
          size="md"
          color="info"
          to="/api/auth/google"
          icon="i-simple-icons-google"
          label="Login with Google"
          external
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, useTemplateRef } from "vue";
const { loggedIn, user, clear } = useUserSession();

const menuClasses = ref("");
const isOpen = ref(false);
const extendNavbar = ref(false);

async function toggleMenu() {
  extendNavbar.value = !extendNavbar.value;
  if (extendNavbar.value) {
    menuClasses.value = "h-screen";
    await sleep(200);
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = !isOpen.value;
    menuClasses.value = "h-18";
  }
}

const navLinks = ref([
  {
    title: "Tentang",
    to: "/tentang",
    class: "",
  },
  {
    title: "Kebijakan Privasi",
    to: "/privasi",
    class: "",
  },
]);

if (loggedIn.value) {
  navLinks.value.unshift({
    title: "Dashboard",
    to: "/dashboard",
    class: "",
  });

  navLinks.value.push({
    title: "Profile",
    to: "/profile",
    class: "pt-1 mt-1 border-t-1",
  });
}

const target = useTemplateRef<HTMLElement>("menu");
onClickOutside(target, () => {
  if (extendNavbar.value) toggleMenu();
});
</script>
