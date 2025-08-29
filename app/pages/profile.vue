<template>
  <UContainer>
    <div class="w-full flex justify-center">
      <UAvatar :src="user?.picture" :alt="user?.name" size="3xl" class="shadow" />
    </div>
    <div class="w-full flex justify-center mt-5">
      <div>
        <UForm :schema="schema" :state="state" class="space-y-4 w-64 flex flex-col" @submit="onSubmit">
          <UFormField label="Nama" name="name">
            <UInput :placeholder="user?.name" disabled class="desc w-full" />
          </UFormField>

          <UFormField label="Tentang Kamu" name="about">
            <UTextarea v-model="state.about" :maxrows="4" class="desc w-full" />
          </UFormField>

          <UFormField label="Keahlian Khusus" name="speciality">
            <UInputTags v-model="state.speciality" class="desc w-full" />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput :placeholder="user?.email" disabled class="desc w-full" />
          </UFormField>

          <UFormField label="Lokasi" name="location">
            <USelect
              v-model="zoneSelect.province"
              :items="zoneList.provinces"
              placeholder="Pilih Provinsi"
              class="w-full my-1"
              @change="getRegencies"
            />
            <USelect
              v-if="zoneSelect.province"
              v-model="zoneSelect.regency"
              :items="zoneList.regencies"
              placeholder="Pilih Kabupaten"
              class="w-full my-1"
              @change="getDistricts"
            />
            <USelect
              v-if="zoneSelect.regency"
              v-model="zoneSelect.district"
              :items="zoneList.districts"
              placeholder="Pilih Kecamatan"
              class="w-full my-1"
              @change="setLocation"
            />
          </UFormField>

          <UFormField label="No. HP" name="phone">
            <UInput v-model="state.phone" type="number" class="desc w-full">
              <template #leading>
                <p class="text-sm text-muted">+62</p>
              </template>
            </UInput>
          </UFormField>

          <UButton type="submit" class="mt-3 flex justify-center shadow-solid-sm border-2 border-black">
            Submit
          </UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { user } = useUserSession();

const schema = z.object({
  phone: z.number().min(10, "Minimal 10 digit"),
  location: z.string().min(2, "Minimal 2 karakter"),
  about: z.string().min(16, "Minimal 16 karakter"),
  speciality: z.array(z.string()),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  phone: 0,
  location: "",
  about: "",
  speciality: [],
});

const zoneSelect = ref({
  province: null,
  regency: null,
  district: null,
});
const zoneList = ref<any>({
  provinces: [],
  regencies: [],
  districts: [],
});

onMounted(async () => {
  await getProvinces().then((data) => {
    zoneList.value.provinces = data.map((zone) => {
      return { value: `${zone.id}_${zone.name}`, label: zone.name };
    });
  });
});

async function getRegencies() {
  zoneSelect.value.regency = null;
  await getRegenciesByID(parseInt((zoneSelect.value.province as unknown as string).split("_")[0]!)).then((data) => {
    zoneList.value.regencies = data.map((zone) => {
      return { value: `${zone.id}_${zone.name}`, label: zone.name };
    });
  });
}

async function getDistricts() {
  zoneSelect.value.district = null;
  await getDistrictsByID(parseInt((zoneSelect.value.regency as unknown as string).split("_")[0]!)).then((data) => {
    zoneList.value.districts = data.map((zone) => {
      return { value: `${zone.id}_${zone.name}`, label: zone.name };
    });
  });
}

function setLocation() {
  state.value.location = `${(zoneSelect.value.province as unknown as string).split("_")[1]!}_${(
    zoneSelect.value.regency as unknown as string
  ).split("_")[1]!}_${(zoneSelect.value.district as unknown as string).split("_")[1]!}`;
}

onMounted(async () => {
  await $fetch("/api/user").then((res) => {
    if (res[0]?.location?.split("_").length == 3) {
      const [province, regency, district] = res[0]?.location?.split("_") as string[];
      zoneSelect.value = {
        province: province as any,
        regency: regency as any,
        district: district as any,
      };
    }

    state.value = {
      ...state.value,
      phone: parseInt(res[0]?.phone as string) || 0,
      location: res[0]?.location as string,
      about: res[0]?.about as string,
      speciality: (res[0]?.speciality as string).split(","),
    };
  });
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/user/" + user.value?.sub, {
    method: "PATCH",
    body: event.data,
  })
    .then(() => {
      toast.add({ title: "Success", description: "Data berhasil disimpan", color: "success" });
    })
    .catch(() => {
      toast.add({ title: "Failure", description: "Data gagal disimpan", color: "error" });
    });
}
</script>
