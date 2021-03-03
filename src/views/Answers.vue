<template>
    <div class="m-10">
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th>Candidate Name</th>
                    <th>Topic</th>
                    <th>Questions</th>
                    <th>Correct Answer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in candidates" :key="c.id">
                    <td class="border-2 p-2">{{ c.candName }}</td>
                    <td class="border-2 p-2">{{ c.topicName }}</td>
                    <td class="border-2 p-2">{{ c.questionCnt }}</td>
                    <td class="border-2 p-2"><router-link :to="'/answer/'+c.id">{{ c.correctAnswer }}</router-link>
                    &nbsp; &nbsp; 
                    <router-link :to="'/answer/'+c.id" class="text-right">See Answer</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { db } from './../firebaseConfig';
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const candidates = reactive([]);
        
        onMounted(() => {
            db.collection('candidates').get().then(res => {
                res.docs.map(async data => {
                    const doc = data.data();
                    doc.id  = data.id;
                    candidates.push(doc);
                })
            })
        })
       
        return {
            candidates
        }
    }
});
</script>