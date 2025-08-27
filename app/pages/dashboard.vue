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
        <div
          ref="addDialog"
          v-show="addDialogOpen"
          class="h-max flex justify-center items-center mt-5 bg-white shadow rounded-xl p-2"
        >
          <div class="">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
              <UFormField label="Judul" name="title">
                <UInput v-model="state.title" placeholder="Tulis Judul" />
              </UFormField>

              <UFormField label="Deskripsi" name="desc">
                <UTextarea v-model="state.desc" autoresize :maxrows="4" placeholder="Tulis Deskripsi" />
              </UFormField>

              <UFormField label="Kategori" name="category">
                <USelect v-model="state.category" :items="jobCategories" />
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
                <UButton @click="addDialogOpen = false" color="warning"> Batal </UButton>
                <UButton type="submit" color="info"> Kirim </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
      <div class="w-full h-max mt-16 flex flex-col gap-2">
        <div v-for="job in jobsList" class="bg-white w-full h-full rounded-xl p-2 shadow text-wrap overflow-hidden">
          <div class="font-medium">{{ job.jobs_table.title }}</div>
          <div class="w-full text-xs break-words">{{ job.jobs_table.desc }}</div>
          <hr class="my-2" />
          <div class="w-full flex gap-2 justify-between">
            <div class="text-xs"><Icon name="ic:baseline-location-on" />{{ job.jobs_table.location }}</div>
            <div class="text-xs"><span class="font-bold"> Rp. </span> {{ job.jobs_table.offers }}</div>
            <div class="text-xs">
              <Icon name="ic:baseline-event-busy" />{{ dayjs(job.jobs_table.expiredAt).format("YYYY-DD-MM") }}
            </div>
          </div>
          <div class="w-full flex gap-2 items-center justify-between">
            <div class="text-xs"><Icon name="ic:sharp-person" />{{ job.users_table.name[0] + "*****" }}</div>
            <div v-if="job.jobs_table.owner == user?.sub">
              <UBadge label="Hapus" size="sm" color="error" @click="deleteJob(job.jobs_table.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { onClickOutside } from "@vueuse/core";
import { ref, useTemplateRef } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

const { user } = useUserSession();
const jobCategories = ref(["Utilitas", "Servis", "Kebun", "Komunitas", "Pet Care", "Lainnya"]);
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

const target = useTemplateRef<HTMLElement>("addDialog");
onClickOutside(target, () => {
  if (addDialogOpen.value == true) addDialogOpen.value = false;
});

const schema = z.object({
  title: z.string().min(8, "Minimal 8 karakter"),
  desc: z.string().min(16, "Minimal 16 karakter"),
  category: z.string(),
  location: z.string().min(2, "Minimal 2 karakter"),
  offers: z.number().min(10000, "Harga penawaran minimal 10.000"),
  expiredAt: z.string(),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  title: "",
  desc: "",
  category: jobCategories.value[jobCategories.value.length - 1],
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

async function deleteJob(id: number) {
  console.log(id);
  await $fetch("/api/job/" + id, {
    method: "DELETE",
  })
    .then(async () => {
      toast.add({ title: "Success", description: "Job berhasil dihapus", color: "success" });
      await getJobsData();
    })
    .catch(() => {
      toast.add({ title: "Failure", description: "Job gagal dihapus", color: "error" });
    });
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/job", {
    method: "POST",
    body: event.data,
  })
    .then(async () => {
      toast.add({ title: "Success", description: "Form berhasil dikirimkan", color: "success" });
      addDialogOpen.value = false;

      await getJobsData();
    })
    .catch(() => {
      toast.add({ title: "Failure", description: "Form gagal dikirimkan", color: "error" });
    });
}
</script>

<style scoped>
span {
  margin-right: 1px;
}
</style>
