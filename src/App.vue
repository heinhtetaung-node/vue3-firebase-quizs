<template>
  <Nav v-if="$route.name != 'test' && $route.name != 'testDetail' && $route.name" :currentPage="$route.name" />
  <router-view />
</template>

<script setup>
import Nav from './components/Nav.vue'
</script>
