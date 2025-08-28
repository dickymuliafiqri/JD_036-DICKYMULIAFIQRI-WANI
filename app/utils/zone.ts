type ZoneData = {
  id: number;
  name: string;
};

export async function getProvinces() {
  const data: ZoneData[] = await $fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");

  return data;
}

export async function getRegenciesByID(id: number) {
  const data: ZoneData[] = await $fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`);

  return data;
}

export async function getDistrictsByID(id: number) {
  const data: ZoneData[] = await $fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`);

  return data;
}

export async function getVillagesByID(id: number) {
  const data: ZoneData[] = await $fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`);

  return data;
}
