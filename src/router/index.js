import { createWebHistory, createRouter } from "vue-router";
import Questions from "./../views/questions.vue";
import Answers from "./../views/answers.vue";
import Test from "./../views/Test.vue";
import QuestionSetup from "./../views/QuestionSetup.vue";
import TestDetail from "./../views/TestDetail.vue";
import AnswerDetail from "./../views/AnswerDetail.vue";

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
  },
  {
    path: "/test/:topicId",
    name: "testDetail",
    component: TestDetail
  },
  {
    path: "/answer/:candId",
    name: "AnswerDetail",
    component: AnswerDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
