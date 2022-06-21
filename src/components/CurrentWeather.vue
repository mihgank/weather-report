<template>
  <section class="rectangle-wrapper">
    <div class="row q-mb-md justify-center">
      <p class="rectangle-wrapper__title">Текущая погода в Ростове-на-Дону</p>
    </div>
    <WeatherCard v-if="currentWeather" current :data="currentWeather" />
  </section>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';

const currentWeather = ref<WeatherNode>();

const weatherRequest = async () => {
  const { data } = await api.get('weather');
  if (data) {
    currentWeather.value = data;
  }
  setTimeout(weatherRequest, 60000);
};
onMounted(async () => {
  await weatherRequest();
});
</script>
