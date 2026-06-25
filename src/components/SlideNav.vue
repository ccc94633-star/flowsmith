<script setup>
const props = defineProps({
  current: { type: Number, required: true },
  total:   { type: Number, required: true },
})
const emit = defineEmits(['prev', 'next'])
function pad(n) { return String(n).padStart(2, '0') }
</script>

<template>
  <div class="slide-nav" role="group" aria-label="卡片導覽">
    <button
      class="nav-btn"
      @click="emit('prev')"
      :disabled="current === 0"
      aria-label="上一個"
    >←</button>
    <span class="counter">{{ pad(current + 1) }} / {{ pad(total) }}</span>
    <button
      class="nav-btn"
      @click="emit('next')"
      :disabled="current === total - 1"
      aria-label="下一個"
    >→</button>
  </div>
</template>

<style scoped>
.slide-nav {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.nav-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid var(--green);
  border-radius: 50%;
  color: var(--green);
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  transition: background .15s, color .15s, border-color .15s;
}

.nav-btn:disabled {
  border-color: var(--line);
  color: var(--line);
  cursor: default;
}

.nav-btn:not(:disabled):hover {
  background: var(--green);
  color: #fffefa;
}

.counter {
  min-width: 52px;
  text-align: center;
  font-family: Silkscreen, Inter, sans-serif;
  font-size: 13px;
  color: var(--gold-deep);
  letter-spacing: .04em;
}
</style>
