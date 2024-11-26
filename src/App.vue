<template>
  <h1>Mi primera app</h1>
  <hr />
  <MyCounter :initialCounter="1" />
  <MyCounterScript :initialCounter="2" />
  <MyCounterScript2 :initialCounter="3" />
</template>

<script lang="ts" setup>
import MyCounter from './components/MyCounter.vue'
import MyCounterScript from './components/MyCounterScript.vue'
import MyCounterScript2 from './components/my-counter-script/MyCounterScript2.vue'
</script>
