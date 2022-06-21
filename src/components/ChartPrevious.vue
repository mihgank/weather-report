<template>
  <Line :chart-data="chartData" />
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { Line } from 'vue-chartjs';
import { ref, onMounted, computed } from 'vue';
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
import { WeatherNode } from 'src/models';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

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

onMounted(async () => {
  const { data } = await api.get('forecast');

  if (data.list.length > 0) {
    weatherLabels.value = data.list.map((el: WeatherNode) => el.dt_txt);
    weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);
  }
});
</script>
