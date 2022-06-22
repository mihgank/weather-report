<template>
  <router-view />
</template>

<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue';

moment.locale('ru');
export default defineComponent({
  name: 'App',
});
</script>
