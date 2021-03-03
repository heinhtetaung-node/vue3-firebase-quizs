<template>
  <Nav v-if="$route.name != 'test' && $route.name != 'testDetail'" :currentPage="$route.name" />
  <router-view />
</template>

<script setup>
import Nav from './components/Nav.vue'
</script>
