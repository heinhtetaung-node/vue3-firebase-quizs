<template>
    <div class="m-10">
      Topic Name : {{ topicName }}
      <br><br>
      Candidate Name : {{ candName }}
      <br><br>
      Correct Answer : {{ correctAnswer }}
      <br>
      <br>
      
      <div :class="'mb-6 p-2 border-2'+((q.bestAnswer==q.userAnswer)? ' bg-green-200' : '')" v-for="q in questions" :key="q.no">
        Question {{ q.no }} : {{ q.question }}
        <br>
        <p v-for="(ans, key) in q.answers" :key="key">Ans{{key+1}} : {{ ans }}</p>
        
        Best Answer : {{ q.bestAnswer }}
        <br>
        User Answer : {{ q.userAnswer }}
      </div>   

      <button v-if="submitanswerbtn == 'true'" class="bg-green-600 p-2 rounded text-lg text-gray-100 mr-2" @click="submitAnswer">Submit Answer</button>
      <router-link to='/answers'><button class="bg-yellow-600 p-2 rounded text-lg text-gray-100 mr-2">Back</button></router-link>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { db } from './../firebaseConfig';
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const questions = reactive([]);
        const topicName = ref("");
        const candName = ref("");
        const correctAnswer = ref("");
        let topicId = null;
        const route = useRoute();
        
        onMounted(() => {
            const id = route.params.candId
            if (id != undefined) {
                db.collection('candidates').doc(id).get().then(res => {
                    const candDoc = res.data();
                    topicName.value = candDoc.topicName;
                    candName.value = candDoc.candName;
                    correctAnswer.value = candDoc.correctAnswer;
                    topicId = id;
                    db.collection('answered_questions').where('candId', '==', id).orderBy('no', 'asc').get().then(res => {
                        res.docs.map(async data2 => {
                            const doc2 = data2.data();
                            doc2.id = data2.id
                            questions.push(doc2);
                        })
                    })
                })
            }
        })

        return {
            questions,
            topicName,
            candName,
            correctAnswer
        }
    }
})
</script>