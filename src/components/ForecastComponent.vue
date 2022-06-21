<template>
  <div class="col-12 q-pa-md">
    <div class="row justify-center q-mb-md">
      <h3>Погода на следующие 3 дня</h3>
    </div>
    <div class="row justify-center">
      <h4>Средняя температура : {{ averageTemp }}</h4>
    </div>

    <WeatherChart
      :weatherLabels="weatherLabels"
      :weatherData="weatherData"
    ></WeatherChart>
    <WeatherCard
      class="q-my-md"
      :key="weatherPoint.dt"
      v-for="weatherPoint in weatherList"
      :data="weatherPoint"
    />
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { WeatherNode } from 'src/models';
import WeatherCard from './WeatherCard.vue';
import WeatherChart from './WeatherChart.vue';
import moment from 'moment';

let weatherList = ref<WeatherNode[]>([]);
let weatherLabels = ref([]);
let weatherData = ref([]);
let averageTemp = ref();

onMounted(async () => {
  const { data } = await api.get('forecast');

  if (data.list.length > 0) {
    weatherList.value = data.list;

    weatherLabels.value = data.list.map((el: WeatherNode) =>
      moment(String(new Date(el.dt * 1000))).format('MM/DD/YYYY hh:mm')
    );
    weatherData.value = data.list.map((el: WeatherNode) => el.main.temp);

    let summaryTemp = 0;
    for (let el in weatherData.value) {
      summaryTemp += weatherData.value[el];
    }
    averageTemp.value = (summaryTemp / 40).toFixed(2);
  }
});
</script>
