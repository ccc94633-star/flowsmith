import { createRouter, createWebHashHistory } from 'vue-router';
import ComingSoonView from '@/views/ComingSoonView.vue';
import HomeView from '@/views/HomeView.vue';
import InterviewPrepView from '@/views/InterviewPrepView.vue';
import ReadmeView from '@/views/ReadmeView.vue';
import ResumeHelperView from '@/views/ResumeHelperView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/interview-prep',
    name: 'interview-prep',
    component: InterviewPrepView,
  },
  {
    path: '/readme',
    name: 'readme',
    component: ReadmeView,
  },
  {
    path: '/resume-helper',
    name: 'resume-helper',
    component: ResumeHelperView,
  },
  {
    path: '/study-notes',
    name: 'study-notes',
    component: ComingSoonView,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});
