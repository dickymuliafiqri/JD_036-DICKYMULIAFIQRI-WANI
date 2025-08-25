<template>
  <UContainer>
    <div id="home" class="w-full flex justify-center px-5">
      <div class="flex flex-col justify-center items-center fixed w-full z-10">
        <div class="w-max h-max rounded-full shadow bg-white p-2 flex gap-2">
          <UButton
            v-for="menu in menuButtons"
            class="rounded-full w-7 h-7 flex justify-center items-center"
            :color="menu.color"
            :icon="menu.icon"
            @click="menu.click()"
          />
        </div>
        <div v-show="addDialogOpen" class="h-max flex justify-center items-center mt-5 bg-white shadow rounded-xl p-2">
          <div class="">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
              <UFormField label="Judul" name="title">
                <UInput v-model="state.title" />
              </UFormField>

              <UFormField label="Deskripsi" name="desc">
                <UTextarea v-model="state.desc" autoresize :maxrows="4" />
              </UFormField>

              <UFormField label="Lokasi" name="location">
                <UInput v-model="state.location" />
              </UFormField>

              <UFormField label="Penawaran" name="offers">
                <UInputNumber v-model="state.offers" :min="10000" :step="2000" />
              </UFormField>

              <UFormField label="Batas Waktu" name="expired">
                <UInput v-model="state.expiredAt" type="date" />
              </UFormField>

              <div class="flex justify-center gap-2">
                <UButton type="submit" color="info"> Kirim </UButton>
                <UButton @click="addDialogOpen = false" color="warning"> Batal </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
      <div class="w-full h-max mt-16 flex flex-col gap-2">
        <div v-for="job in jobsList" class="bg-white w-full h-full rounded-xl p-2 shadow text-wrap overflow-hidden">
          <div class="font-medium">{{ job.title }}</div>
          <div class="w-full text-xs break-words">{{ job.desc }}</div>
          <hr class="my-2" />
          <div class="w-full flex gap-2">
            <div class="text-xs"><Icon name="ic:baseline-location-on" />{{ job.location }}</div>
            <div class="text-xs"><span class="font-bold"> Rp. </span> {{ job.offers }}</div>
            <div class="text-xs">
              <Icon name="ic:baseline-event-busy" />{{ dayjs(job.expiredAt).format("YYYY-DD-MM") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

const toast = useToast();
const addDialogOpen = ref(false);
const jobsList = ref<Array<any>>([]);
const menuButtons = ref<
  Array<{
    icon: string;
    color: "info" | "primary" | "secondary" | "success" | "warning" | "error" | "neutral";
    click: Function;
  }>
>([
  {
    icon: "ic:baseline-plus",
    color: "info",
    click: () => {
      addDialogOpen.value = !addDialogOpen.value;
    },
  },
  {
    icon: "ic:sharp-search",
    color: "info",
    click: () => {},
  },
]);

const schema = z.object({
  title: z.string().min(16, "Minimal 18 karakter"),
  desc: z.string().min(32, "Minimal 32 karakter"),
  location: z.string().min(3, "Minimal 3 karakter"),
  offers: z.number().min(10000, "Harga penawaran minimal 10.000"),
  expiredAt: z.string(),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  title: "",
  desc: "",
  location: "",
  offers: 10000,
  expiredAt: "",
});

async function getJobsData() {
  const data = await $fetch("/api/job");
  jobsList.value = data.reverse();
}

onMounted(async () => {
  await getJobsData();
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/job", {
    method: "POST",
    body: event.data,
  });
  toast.add({ title: "Success", description: "Form berhasil dikirimkan", color: "success" });
  addDialogOpen.value = false;

  await getJobsData();
}
</script>

<style scoped>
span {
  margin-right: 1px;
}
</style>
