<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { WeatherNode } from 'src/models';

const currentWeather = ref<WeatherNode>();
onMounted(async () => {
  try {
    const { data } = await api.get('weather');
    currentWeather.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div>
    <p>Current temperature</p>
    <p>{{ currentWeather?.main.temp }} °C</p>
    Weather
    <p :key="weather.id" v-for="weather in currentWeather?.weather">
      {{ weather.description }}
    </p>
  </div>
</template>
