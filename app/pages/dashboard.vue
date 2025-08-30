<template>
  <UContainer>
    <div id="home" class="w-full flex justify-center px-5">
      <div class="flex flex-col justify-center items-center fixed w-full z-10">
        <div class="w-max h-max rounded-full p-2 flex gap-2">
          <UButton
            v-for="menu in menuButtons"
            class="rounded-full w-7 h-7 flex justify-center items-center bg-raka-red-20 solid-shadow-sm"
            :color="menu.color"
            :icon="menu.icon"
            @click="menu.click()"
          />
        </div>
        <div
          ref="addDialog"
          v-show="addDialogOpen"
          class="w-max h-max flex justify-center items-center mt-5 bg-white rounded-xl p-2 shadow-solid-sm border-2 border-black"
        >
          <div>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
              <UFormField label="Judul" name="title">
                <UInput v-model="state.title" placeholder="Tulis Judul" class="w-full" />
              </UFormField>

              <UFormField label="Deskripsi" name="desc">
                <UTextarea v-model="state.desc" autoresize :maxrows="4" placeholder="Tulis Deskripsi" class="w-full" />
              </UFormField>

              <UFormField label="Kategori" name="category">
                <USelect v-model="state.category" :items="jobCategories" class="w-full" placeholder="Pilih Kategori" />
              </UFormField>

              <UFormField label="Penawaran" name="offers">
                <UInputNumber v-model="state.offers" :min="10000" :step="2000" />
              </UFormField>

              <div class="flex justify-center gap-2">
                <UButton @click="addDialogOpen = false" color="warning" class="solid-shadow"> Batal </UButton>
                <UButton type="submit" color="info" class="solid-shadow"> Kirim </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
      <div class="w-full h-max mt-16 flex flex-col gap-2"></div>
    </div>
    <PageJobList />
    <div class="mt-5">
      <div>
        TOPUP:
        <UInput type="number" v-model="topupAmount"></UInput>
      </div>
      <div>
        <UButton
          class="solid-shadow bg-raka-red-20"
          color="error"
          @click="
            async () => {
              await sendTopup();
            }
          "
          >Kirim</UButton
        >
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

const { user } = useUserSession();
const jobCategories = ref(["Utilitas", "Servis", "Kebun", "Komunitas", "Pet Care", "Lainnya"]);
const toast = useToast();
const addDialogOpen = ref(false);
const menuButtons = ref<
  Array<{
    icon: string;
    color: "info" | "primary" | "secondary" | "success" | "warning" | "error" | "neutral";
    click: Function;
  }>
>([
  {
    icon: "ic:baseline-plus",
    color: "error",
    click: () => {
      addDialogOpen.value = !addDialogOpen.value;
    },
  },
  {
    icon: "ic:sharp-search",
    color: "error",
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
  offers: z.number().min(10000, "Harga penawaran minimal 10.000"),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  title: "",
  desc: "",
  category: undefined,
  offers: 10000,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/job", {
    method: "POST",
    body: event.data,
  })
    .then(async () => {
      toast.add({ title: "Success", description: "Form berhasil dikirimkan", color: "success" });
      addDialogOpen.value = false;
      await jobsStore.getJobList();
    })
    .catch((e) => {
      console.log(e);
      if (e.statusCode == 400) {
        alertStore.text = "Job tidak memenuhi kriteria!";
      } else {
        alertStore.text = e.errorMessage;
      }
      alertStore.isOpen = true;
    });
}

// Topup
const topupAmount = ref(10000);
async function sendTopup() {
  await $fetch("/api/payment", {
    method: "POST",
    body: JSON.stringify({
      amount: topupAmount.value,
    }),
  }).then(async (e) => {
    await navigateTo(e.invoiceUrl, {
      external: true,
    });
  });
}

// Mounted
onMounted(async () => {
  const userData = await $fetch("/api/user");
  if (!userData[0]?.phone) {
    alertStore.exec = async () => {
      await navigateTo("/profile");
    };
    alertStore.text = "Silahkan isi nomor handphone terlebih dahulu";
    alertStore.isOpen = true;
  }
});
</script>

<style scoped>
span {
  margin-right: 1px;
}
</style>
