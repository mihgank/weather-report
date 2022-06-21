<template>
  <div class="col-12 q-pa-md">
    <title>Погода на следующие 3 дня</title>
    <p>Средняя температура : {{ averageTemp }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';
import WeatherChart from './WeatherChart.vue';
import moment from 'moment';
// const wt_card = ref<WeatherNode>({
//   weather: [
//     {
//       id: 800,
//       main: 'Clear',
//       description: 'ясно',
//       icon: '01n',
//     },
//   ],
//   main: {
//     temp: 37.2,
//     feels_like: 22.09,
//   },
//   dt: 1655802000,
// });

let weatherList = ref<WeatherNode[]>([]);
let weatherLabels = ref([]);
let weatherData = ref([]);
let averageTemp = ref();

onMounted(async () => {
  const { data } = await api.get('forecast');

  if (data.list.length > 0) {
    weatherList.value = data.list;

    weatherLabels.value = data.list.map((el: WeatherNode) =>
      moment(String(new Date(el.dt * 1000))).format('MM/DD/YYYY hh:mm')
    );
    weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);

    let summaryTemp = 0;
    for (let el in weatherData.value) {
      summaryTemp += weatherData.value[el];
    }
    averageTemp.value = (summaryTemp / 40).toFixed(2);
  }
});
</script>
