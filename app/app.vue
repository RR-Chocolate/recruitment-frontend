<script setup lang="ts">
import '../assets/css/main.css'

// Set up global styles and meta
useHead({
  title: 'RR Chocolatte Recruitment',
  meta: [
    { name: 'description', content: 'Join our sweet journey - Career opportunities at RR Chocolatte' }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
