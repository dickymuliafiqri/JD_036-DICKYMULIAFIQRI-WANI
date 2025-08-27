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
          console.log('ditekan');
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
      <div class="w-96 flex flex-wrap justify-between my-5 gap-5">
        <CategoryButton v-for="cat in categoryList" :icon="cat.icon" :name="cat.name" :exec="cat.exec" />
      </div>
    </div>
  </UContainer>
  <div id="contoh" class="w-full flex flex-col justify-center items-center mt-8 border-t-2">
    <UContainer>
      <div class="title flex items-center gap-2 mt-6">
        <span class="text-amber-300 text-4xl font-bold">*</span>
        <div class="text-2xl">Pekerjaan Baru!</div>
      </div>
      <div class="mt-3 flex flex-col gap-5">
        <JobCard v-for="job in jobList" :data="job" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { loggedIn } = useUserSession();

const jobList = ref<Array<any>>([]);
onMounted(async () => {
  await $fetch("/api/job").then((res) => {
    for (const data of res) {
      jobList.value.push(data);
      if (jobList.value.length > 2) break;
    }
  });
});

const categoryList = ref([
  {
    icon: "ic:baseline-construction",
    name: "Utilitas",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:outline-home",
    name: "Servis",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-grass",
    name: "Kebun",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-add-reaction",
    name: "Komunitas",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-pets",
    name: "Pet Care",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-loop",
    name: "Lain - Lain",
    exec: () => {
      window.alert("Halo");
    },
  },
]);
</script>
