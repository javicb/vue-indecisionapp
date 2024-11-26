<template>
  <h1>Mi primera app</h1>
  <hr />
  <MyCounter :initialCounter="10" />
</template>

<script lang="ts" setup>
import MyCounter from './components/MyCounter.vue'
</script>
