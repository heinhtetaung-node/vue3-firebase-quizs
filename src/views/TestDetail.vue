<template>
    <div class="m-10">
      <h1 class="text-gray-600 m-2 font-mono text-lg">Answer Questions</h1>
      <br>
      Topic Name : {{ topicName }}
      <br><br>
      Candidate Name <input type="text" class="bg-gray-200 rounded h-8 p-2 w-full" v-model="candName"/>      
      <br>
      <br>
      

      <div class="mb-6 p-2 border-2" v-for="q in questions" :key="q.no">
        Question {{ q.no }} : {{ q.question }}
        <br>
        <p v-for="(ans, key) in q.answers" :key="key">Ans{{key+1}} : {{ ans }}</p>
        
        Best Answer<br>
        <input type="radio" value="1" :name="'ans'+q.no" checked /> Ans:1 
        <input type="radio" value="2" :name="'ans'+q.no" /> Ans:2 
        <input type="radio" value="3" :name="'ans'+q.no" /> Ans:3 
        <input type="radio" value="4" :name="'ans'+q.no" /> Ans:4 
      </div>   

      <button v-if="submitanswerbtn == 'true'" class="bg-green-600 p-2 rounded text-lg text-gray-100 mr-2" @click="submitAnswer">Submit Answer</button>
      <router-link to='/'><button class="bg-yellow-600 p-2 rounded text-lg text-gray-100 mr-2">Back</button></router-link>
    </div>

</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { db } from './../firebaseConfig';
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const questions = reactive([]);
        const topicName = ref("")
        const candName = ref("")
        let topicId = null
        const route = useRoute()
        const submitanswerbtn = ref("true")

        onMounted(() => {
            const id = route.params.topicId
            if (id != undefined) {
                db.collection('topics').doc(id).get().then(res => {
                    const topicDoc = res.data();
                    topicName.value = topicDoc.topicName;
                    topicId = id;
                    db.collection('questions').where('topic_id', '==', topicId).orderBy('no', 'asc').get().then(res => {
                        res.docs.map(async data2 => {
                            const doc2 = data2.data();
                            doc2.id = data2.id
                            questions.push(doc2);
                        })
                    })
                })
            }
        })

        const submitAnswer = async () => {
            if(candName.value == ''){
                alert('please describe candidate name');
                return false;
            }
            submitanswerbtn.value = "false";
            const topic = db.collection('topics').doc(topicId)
            let topicDoc = await topic.get(); 
            topicDoc = topicDoc.data();
            await topic.update({
                'answeredCnt' : ((typeof topicDoc.answeredCnt == 'undefined')? 1 : topicDoc.answeredCnt + 1)
            })                 

            let correctAnswerCnt = 0;
            const cand = db.collection('candidates').doc();
            questions.map((q) => {
                q.userAnswer = document.querySelector('input[name="ans'+q.no+'"]:checked').value;
                q.questionId = q.id;
                if(q.userAnswer == q.bestAnswer){ 
                    correctAnswerCnt++; 
                }
                q.candId = cand.id;
                db.collection('answered_questions').add(q);
            });  

            cand.set({
                'candName' : candName.value,
                'correctAnswer' : correctAnswerCnt,
                'topicId' : topicId,
                'topicName' : topicName.value,
                'questionCnt' : questions.length
            });     
            
            alert('Submitted your answer sheet');

        }

        return {
            questions,
            topicName,
            candName,
            submitAnswer,
            submitanswerbtn
        }
    }
});
</script>