<template>
  <Nav v-if="$route.name != 'test'" />
  <router-view />
</template>

<script setup>
import Nav from './components/Nav.vue'
</script>
