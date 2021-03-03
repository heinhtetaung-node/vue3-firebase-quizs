<template>
  <nav class="bg-gray-600 text-white">
    <div class="container mx-auto">
      <div class="flex items-center">
        <router-link to="/questions"
                     id="ques" :class="((currentPage.includes('uestion'))? 'active-nav' : '')+' inline-block cursor-pointer px-16 py-4 transition-colors hover:bg-gray-500 duration-300'">Questions Setup</router-link>
        <router-link to="/answers"
                     id="answ" :class="((currentPage.includes('nswer'))? 'active-nav' : '')+' inline-block cursor-pointer px-16 py-4 transition-colors hover:bg-gray-500 duration-300'">Answers</router-link>                                          
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRoute } from 'vue-router'

export default defineComponent({
    props: ['currentPage'],
    setup(){
      const route = useRoute()
      onMounted(() => {
        // find javascript code for get current route
        // change addclass on click nav
        // if(route.path == '/questions' || route.path == '/question-setup'){
        //   document.getElementById('ques').classList.add('active-nav')
        // }else{
        //   document.getElementById('answ').classList.add('active-nav')
        // }
      })
    }
});
</script>
