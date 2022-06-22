<template>
  <q-card class="weather-card q-px-md">
    <q-card-section class="text-white">
      <p>
        <b>{{ data.main.temp }} °C</b>
      </p>

      <q-icon :name="icon"></q-icon> {{ data.weather[0].description }}
      <p v-if="!current">
        {{ moment(data.dt * 1000).format('DD MMMM hh:mm') }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WeatherNode } from 'src/models/index';
import moment from 'moment';

const WEATHER = {
  Clear: 'mdi-white-balance-sunny',
  Clouds: ' mdi-weather-cloudy',
  Rain: 'mdi-weather-pouring',
  Snow: 'mdi-weather-snowy',
};

let icon = computed(
  () =>
    'mdi-v5 ' +
    (WEATHER[props.data.weather[0].main] || 'mdi-alert-circle-outline')
);

const props = defineProps<{
  data: WeatherNode;
  current?: boolean;
}>();
</script>
