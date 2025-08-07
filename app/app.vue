<script setup lang="ts">
// Set up global styles and meta
useHead({
  title: 'RR Chocolatte',
  meta: [
    { name: 'description', content: 'Premium chocolate experience with RR Chocolatte' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdn.tailwindcss.com' }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
