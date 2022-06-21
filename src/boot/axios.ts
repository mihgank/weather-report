import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    lon: 39.719,
    lat: 47.239,
    lang: 'ru',
    appid: '08bcf2bb99c0e82d2b9d0d531384ba9f',
    units: 'metric',
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
