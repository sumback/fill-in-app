import { NuxtAxiosInstance } from '@nuxtjs/axios';

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance): void {
  $axios = axiosInstance;
  $axios.setBaseURL(<string>process.env.AXIOS_BASE_URL);
}

export { $axios };
