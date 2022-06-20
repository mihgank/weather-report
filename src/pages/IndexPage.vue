<template>
  <q-page class="row items-center justify-evenly">
    <ChartForecast />
    <CurrentWeather />
  </q-page>
</template>

<script setup lang="ts">
import ChartForecast from 'src/components/ChartForecast.vue';
import CurrentWeather from 'src/components/CurrentWeather.vue';
</script>
