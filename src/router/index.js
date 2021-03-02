import { createWebHistory, createRouter } from "vue-router";
import Questions from "./../views/questions.vue";
import Answers from "./../views/answers.vue";
import Test from "./../views/Test.vue";
import QuestionSetup from "./../views/QuestionSetup.vue";

const routes = [
  {
    path: "/questions",
    name: "questions",
    component: Questions,
  },
  {
    path: "/answers",
    name: "answers",
    component: Answers,
  },
  {
    path: "/",
    name: "test",
    component: Test,
  },
  {
    path: "/question-setup",
    name: "QuestionSetup",
    component: QuestionSetup
  },
  {
    path: "/question-setup/:topicId",
    name: "QuestionSetupTopic",
    component: QuestionSetup
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
