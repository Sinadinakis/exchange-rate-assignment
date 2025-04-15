<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
    <header class="flex flex-col md:flex-row justify-center items-center gap-4">
      <img alt="Vue logo" class="logo" src="./assets/Franx.png" width="125" height="125"/>
      <h1 class="text-2xl font-bold mx-2 md:mx-0">Exchange Rate Tracker</h1>
    </header>

    <div class="w-full">
      <RouterView/>
    </div>
  </div>
</template>
