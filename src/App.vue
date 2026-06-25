<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import AppNav from './components/AppNav.vue';
import faviconUrl from '/public/favicon.png';
import GoTopButton from './components/GoTopButton.vue';
import ComingSoonView from './views/ComingSoonView.vue';
import HomeView from './views/HomeView.vue';
import InterviewPrepView from './views/InterviewPrepView.vue';
import ReadmeView from './views/ReadmeView.vue';

const route = ref(window.location.hash || '');

function syncRoute() {
  route.value = window.location.hash || '';
}

onMounted(() => {
  window.addEventListener('hashchange', syncRoute);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncRoute);
});

const isInterviewPrep = computed(() => route.value === '#/interview-prep');
const isReadme = computed(() => route.value === '#/readme');
const isComingSoon = computed(() => ['#/resume-helper', '#/study-notes'].includes(route.value));

const navLinks = [
  { label: 'tools', href: '#tools' },
  { label: 'workflow', href: '#workflow' },
  { label: 'ideas', href: '#ideas' },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700;800&family=Silkscreen:wght@400;700&display=swap");

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #fbf6e6;
  --paper: rgba(255, 255, 250, .9);
  --paper-solid: #fffefa;
  --soft: #eef4e7;
  --green: #3f4d2b;
  --green-2: #5c6f3f;
  --green-3: #dce9d5;
  --yellow: #f8c032;
  --gold-deep: #b97f0f;
  --line: rgba(40, 68, 55, .16);
  --muted: #5c6f3f;
  --code: #24362e;
  --code-text: #f5f2e9;
  --radius: 18px;
  --shadow: 0 18px 55px rgba(45, 67, 54, .14);
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  color: var(--green);
  font-family: Inter, "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  line-height: 1.7;
  background:
    linear-gradient(rgba(251, 246, 230, .75), rgba(247, 248, 241, .94)),
    url("./images/background-imgs/treeSky1.jpg") center top / cover fixed;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 16%, rgba(255, 255, 255, .82), transparent 22%),
    radial-gradient(circle at 88% 12%, rgba(225, 184, 63, .16), transparent 24%),
    linear-gradient(90deg, transparent 0 72%, rgba(220, 233, 213, .32) 72% 100%);
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
}
</style>

<template>
  <AppNav
    home-href="#"
    :icon-src="faviconUrl"
    :links="navLinks"
  />

  <InterviewPrepView v-if="isInterviewPrep" />
  <ReadmeView v-else-if="isReadme" />
  <ComingSoonView v-else-if="isComingSoon" />
  <HomeView v-else />

  <GoTopButton :always-visible="isInterviewPrep || isComingSoon || isReadme" />
</template>
