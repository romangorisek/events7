<template>
  <h3> update event id {{eventId}} </h3>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const eventId = route.params.id

</script>

<style scoped>
/* No scoped styles needed as Tailwind handles most styling */
</style>
