<template>
  <div class="col-12 q-pa-5">
    <title>Погода на следующие 3 дня</title>
    <p>Средняя температура : {{ averageTemp }}</p>

    <WeatherCard :data="wt_card"></WeatherCard>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';

const wt_card = ref<WeatherNode>({
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'ясно',
      icon: '01n',
    },
  ],
  main: {
    temp: 37.2,
    feels_like: 22.09,
  },
  dt_txt: '2022-06-21 00:00:00',
});

let weatherLabels = ref([]);
let weatherData = ref([]);
let averageTemp = ref();

onMounted(async () => {
  const { data } = await api.get('forecast');

  if (data.list.length > 0) {
    weatherLabels.value = data.list.map((el: WeatherNode) => el.dt_txt);
    weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);

    let summaryTemp = 0;
    for (let el in weatherData.value) {
      summaryTemp += weatherData.value[el];
      // console.log(el);
    }
    averageTemp.value = (summaryTemp / 40).toFixed(2);
  }
});
</script>
