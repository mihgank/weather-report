<template>
  <q-card class="weather-card q-px-md">
    <q-card-section class="text-white">
      <p>
        <b>{{ data.main.temp }} °C</b>
      </p>

      <q-icon :name="icon"></q-icon> {{ data.weather[0].description }}
      <p v-if="!current">
        {{ dateTransform(data.dt) }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import dateTransform from 'src/utils';
import { computed } from 'vue';
import { WeatherNode } from 'src/models/index';

let icon = computed(() => {
  if (props.data.weather[0].main == 'Clear') {
    return 'mdi-v5 mdi-white-balance-sunny';
  }
  if (props.data.weather[0].main == 'Clouds') {
    return 'mdi-v5 mdi-weather-cloudy';
  }
  if (props.data.weather[0].main == 'Rain') {
    return 'mdi-v5 mdi-weather-pouring';
  }
  if (props.data.weather[0].main == 'Snow') {
    return 'mdi-v mdi-weather-snowy';
  }
  return 'mdi-v5 mdi-alert-circle-outline';
});

const props = defineProps<{
  data: WeatherNode;
  current?: boolean;
}>();
</script>
