<template>
  <Line :styles="chartStyles" :chart-data="chartData" />
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

const props = defineProps<{
  weatherLabels: Array<string>;
  weatherData: Array<number>;
}>();
</script>
