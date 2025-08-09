<script setup lang="ts">
import '../assets/css/main.css'

// Set up global styles and meta
useHead({
  title: 'RR Chocolatte',
  meta: [
    { name: 'description', content: 'Premium chocolate experience with RR Chocolatte' }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
