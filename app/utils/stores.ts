import { createPinia } from "pinia";

const pinia = createPinia();

export const alertStore = useAlertStore(pinia);
export const jobsStore = useJobsStore(pinia);
export const windowStore = useWindowStore(pinia);
