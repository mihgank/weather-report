<template>
  <q-page class="row items-center justify-evenly container">
    <CurrentWeather class="q-pa-md q-mb-sm" />
    <ForecastComponent />
  </q-page>
</template>

<script setup lang="ts">
import ForecastComponent from 'src/components/ForecastComponent.vue';
import CurrentWeather from 'src/components/CurrentWeather.vue';
</script>
