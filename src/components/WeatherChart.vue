<template>
  <Line :styles="chartStyles" :chart-data="chartData" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import moment from 'moment';
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

const props = defineProps<{
  weatherLabels: Array<number>;
  weatherData: Array<number>;
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
moment.locale('RU');
const chartData = computed(() => {
  return {
    labels: props.weatherLabels.map((timestamp) => {
      return moment(new Date(timestamp * 1000)).format('dd. hh:mm');
    }),
    datasets: [
      {
        label: 'Ростов-на-Дону',
        borderColor: '#f87979',
        backgroundColor: '#fff',
        data: props.weatherData,
      },
    ],
  };
});

const chartStyles = computed(() => {
  return {
    position: 'relative',
  };
});
</script>
