<template>
  <div>
    <div class="row justify-center q-mb-md">
      <h3>Текущая погода в Ростове-на-Дону</h3>
    </div>
    <WeatherCard v-if="currentWeather" :data="currentWeather" />
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';

const currentWeather = ref<WeatherNode>();
onMounted(async () => {
  const { data } = await api.get('weather');
  if (data.list.length > 0) {
    currentWeather.value = data;
  }
});
</script>
