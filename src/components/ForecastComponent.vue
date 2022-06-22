<template>
  <section class="col-12 q-pa-md rectangle-wrapper">
    <div class="row q-mb-md justify-center">
      <p class="rectangle-wrapper__title">Погода на следующие 3 дня</p>
    </div>
    <div class="row justify-center">
      <p class="rectangle-wrapper__subtitle">
        Средняя температура : {{ averageTemp }} °C
      </p>
    </div>

    <WeatherChart
      :weatherLabels="weatherLabels"
      :weatherData="weatherData"
    ></WeatherChart>
    <WeatherCard
      class="q-my-md"
      :key="weatherPoint.dt"
      v-for="weatherPoint in weatherList"
      :data="weatherPoint"
    />
  </section>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted, onUnmounted } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';
import WeatherChart from './WeatherChart.vue';

let weatherList = ref<WeatherNode[]>([]);
let weatherLabels = ref([]);
let weatherData = ref<number[]>([]);
let averageTemp = ref();

const forecastRequest = async () => {
  const { data } = await api.get('forecast');
  if (data.list.length > 0) {
    weatherList.value = data.list;

    weatherLabels.value = data.list.map((el: WeatherNode) => el.dt);
    weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);

    averageTemp.value = (
      weatherData.value.reduce((a, b) => a + b) / weatherData.value.length
    ).toFixed(1);
  }
};

let forecastInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  forecastRequest();
  forecastInterval = setInterval(forecastRequest, 60000);
});
onUnmounted(() => {
  clearInterval(forecastInterval);
});
</script>
