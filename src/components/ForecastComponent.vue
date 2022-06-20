<template>
  <Line :chart-data="chartData" />
  <WeatherCard :data="wt_card"></WeatherCard>
  <p>Средняя температура на следующие 3 дня: {{ averageTemp }}</p>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { Line } from 'vue-chartjs';
import { ref, onMounted, computed } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

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

const chartData = computed(() => {
  return {
    labels: weatherLabels.value,
    datasets: [
      {
        label: 'Ростов-на-Дону',
        borderColor: '#f87979',
        backgroundColor: '#000',
        data: weatherData.value,
      },
    ],
  };
});

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
