<template>
    <div class="m-10">
        <p class="text-gray-600	m-2 font-mono text-2xl">
            Please select topic you want to answer
        </p>
        <!-- <div class="h-16 w-full bg-gray-50 p-3 mb-2">    
            <p class="">Javascript quizs</p>
            <p class="text-xs"> 10 questions | 20 people answered </p> 
        </div>
        <div class="h-16 w-full bg-gray-50 p-3 mb-2">    
            <p class="">Php quizs</p>
            <p class="text-xs"> 10 questions | 20 people answered </p> 
        </div> -->
        <div class="h-16 w-full bg-gray-50 p-3 mb-2" v-for="(t, key) in topics" :key="key">    
            <p class=""><router-link :to='"/test/"+t.id'>{{ t.topicName }}</router-link></p>
            <p class="text-xs"> {{t.questionCnt}} questions | {{t.answeredCnt}} people answered </p> 
        </div>        
    </div>    
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { db } from './../firebaseConfig';
export default defineComponent({
    setup(){
        const topics = reactive([]);
        onMounted(() => {
            db.collection('topics').get().then(res => {
                res.docs.map(async data => {
                    const doc = data.data();
                    doc.id  = data.id;
                    topics.push(doc);
                })
            })
        })
        return {
            topics
        }
    }    
})
</script>