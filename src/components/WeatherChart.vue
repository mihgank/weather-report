<template>
  <Line :chart-data="chartData" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
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

const chartData = computed(() => {
  return {
    labels: props.weatherLabels,
    datasets: [
      {
        label: 'Ростов-на-Дону',
        borderColor: '#f87979',
        backgroundColor: '#000',
        data: props.weatherData,
      },
    ],
  };
});

const props = defineProps<{
  weatherLabels: Array<string>;
  weatherData: Array<number>;
}>();
// onMounted(async () => {
//   const { data } = await api.get('forecast');

//   if (data.list.length > 0) {
//     weatherLabels.value = data.list.map((el: WeatherNode) => new Date(el.dt));
//     weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);
//   }
// });
</script>
