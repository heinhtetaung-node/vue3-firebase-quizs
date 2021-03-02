<template>
    <div class="m-10">
      <h1 class="text-gray-600 m-2 font-mono text-lg">Questionary setup</h1>
      <br>
      Topic Name <input type="text" class="bg-gray-200 rounded h-8 p-2 w-full" v-model="topicName"/>
      <br>
      <br>
      

      <div class="mb-6 p-2 border-2" v-for="q in questions" :key="q.no">
        Question {{ q.no }} : {{ q.question }}
        <br>
        <p v-for="(ans, key) in q.answers" :key="key">Ans{{key+1}} : {{ ans }}</p>
        
        Best Answer : Ans{{ q.bestAnswer }}                
      </div>      

      <div class="mb-6 p-2 border-2">
        Question Title
        <textarea v-model="question" class="bg-gray-200 rounded h-16 p-2 w-full" ></textarea>
        Answer1
        <textarea v-model="ans1" class="bg-gray-200 rounded h-16 p-2 w-full" ></textarea>
        Answer2
        <textarea v-model="ans2" class="bg-gray-200 rounded h-16 p-2 w-full" ></textarea>
        Answer3
        <textarea v-model="ans3" class="bg-gray-200 rounded h-16 p-2 w-full" ></textarea>
        Answer4
        <textarea v-model="ans4" class="bg-gray-200 rounded h-16 p-2 w-full" ></textarea>
        Best Answer<br>
        <input type="radio" v-model="bestAnswer" value="1" name="ans" /> Ans:1 
        <input type="radio" v-model="bestAnswer" value="2" name="ans" /> Ans:2 
        <input type="radio" v-model="bestAnswer" value="3" name="ans" /> Ans:3 
        <input type="radio" v-model="bestAnswer" value="4" name="ans" /> Ans:4 
        <br>
        <button class="bg-blue-400 p-2 rounded text-gray-100" @click="addQuestion">Add Question</button>
      </div>      
      <br>
      <br>      
      <button class="bg-green-600 p-2 rounded text-lg text-gray-100 mr-2" @click="saveSetting">Save Setting</button>
      <button class="bg-red-600 p-2 rounded text-lg text-gray-100">Discard</button>
      <br>
      <br>
      <button class="bg-green-600 p-2 rounded text-lg text-gray-100 mr-2">Publish</button>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { db } from './../firebaseConfig';
import { useRoute } from 'vue-router'

export default defineComponent({
    setup(){
        const questions = reactive([]);
        const question = ref("")
        const ans1 = ref("")
        const ans2 = ref("")
        const ans3 = ref("")
        const ans4 = ref("")
        const topicName = ref("")
        const bestAnswer = 1
        let topicId = null
        const route = useRoute()

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
                            questions.push(doc2);
                        })
                    })
                })
            }
        })
        function addQuestion() {
            if(this.topicName =='' || this.question == "" || this.ans1 == "" || this.ans2 == "" || this.ans4 == "" || this.ans3 == "" || this.bestAnswer == null){
                alert('please describe topic, question title and all answer')
                return false;
            }
            var no = this.questions.length+1;
            this.questions.push({
                'no' : no,
                'question' : this.question,
                'answers' : [
                    this.ans1, this.ans2, this.ans3, this.ans4
                ],
                'bestAnswer' : this.bestAnswer
            })
            this.question = "";
            this.ans1 = "";
            this.ans2 = "";
            this.ans4 = "";
            this.ans3 = "";
            this.bestAnswer = 1;
        }

        const saveSetting = async () => {
            if(questions.length == 0){
                alert('please add questions first')
                return false;
            }
            if(topicId == null) {
                const topic = db.collection('topics').doc();          
                await topic.set({
                    'topicName' : topicName.value,
                    'questionCnt' : questions.length
                })  
                topicId = topic.id;
            }else{
                db.collection('topics').doc(topicId).update({ 'questionCnt' : questions.length });
            }
            questions.map((q) => {
                if(typeof q.topic_id == 'undefined'){
                    q.topic_id = topicId;
                    db.collection('questions').add(q);
                }
            });  
            alert('saved');
        }

        return {
            questions,
            question,
            ans1,
            ans2,
            ans3,
            ans4,
            topicName,
            addQuestion,
            bestAnswer,
            saveSetting
        }
    }
});
</script>