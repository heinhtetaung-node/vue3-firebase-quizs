<template>
  <nav class="bg-gray-600 text-white">
    <div class="container mx-auto">
      <div class="flex items-center">
        <router-link to="/questions"
                     class="inline-block cursor-pointer px-16 py-4 transition-colors hover:bg-gray-500 duration-300">Questions Setup</router-link>
        <router-link to="/answers"
                     class="inline-block cursor-pointer px-16 py-4 transition-colors hover:bg-gray-500 duration-300">Answers</router-link>
      </div>
    </div>
  </nav>

</template>

<script setup>
// import { defineProps, reactive } from 'vue'

// defineProps({
//   msg: String
// })

// const state = reactive({ count: 0 })
</script>
