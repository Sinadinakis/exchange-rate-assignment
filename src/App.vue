<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
    <header class="flex flex-row">
      <img alt="Vue logo" class="logo" src="./assets/Franx.png" width="125" height="125"/>
    </header>

    <div class="w-full">
      <RouterView/>
    </div>
  </div>
</template>
