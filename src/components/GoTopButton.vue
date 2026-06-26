<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  alwaysVisible: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
});

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const visible = computed(() => props.enabled && (props.alwaysVisible || scrolled.value));

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <Transition name="gotop">
    <button v-if="visible" class="gotop-btn" aria-label="回到頂部" @click="scrollToTop">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 14V4M9 4L4.5 8.5M9 4L13.5 8.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.gotop-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.18);
  background: var(--green);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(45, 67, 54, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
}

.gotop-btn:hover {
  background: #2d3a1e;
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(45, 67, 54, 0.36);
}

.gotop-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(45, 67, 54, 0.22);
}

.gotop-enter-active,
.gotop-leave-active {
  transition: opacity 0.22s, transform 0.22s;
}

.gotop-enter-from,
.gotop-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
