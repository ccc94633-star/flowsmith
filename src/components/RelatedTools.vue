<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SlideNav from './SlideNav.vue'

const relatedCards = [
  { title: '履歷優化助手', desc: '把一頁式履歷整理成更貼近職缺的版本', href: '#/resume-helper', path: '/resume-helper', cls: 'resume-card' },
  { title: '學習筆記整理工具', desc: '把零散筆記整理成可複習的重點架構', href: '#/study-notes', path: '/study-notes', cls: 'notes-card' },
]

const route = useRoute()
const isMobile = ref(false)
const currentCard = ref(0)
const visibleCards = computed(() => relatedCards.filter((card) => card.path !== route.path))

watch(
  () => route.path,
  () => {
    currentCard.value = 0
  },
)

function checkMobile() {
  isMobile.value = window.innerWidth <= 680
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

let touchStartX = 0

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) < 40) return
  if (dx < 0 && currentCard.value < visibleCards.value.length - 1) currentCard.value++
  else if (dx > 0 && currentCard.value > 0) currentCard.value--
}
</script>

<template>
  <aside class="related-tools" aria-label="你可能也會有興趣的 AI 小工具">
    <h3>你可能感興趣的 AI 小工具</h3>
    <div
      class="related-grid"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <a
        v-for="(card, i) in visibleCards"
        :key="card.href"
        class="related-card"
        :class="card.cls"
        :href="card.href"
        v-show="!isMobile || i === currentCard"
      >
        <div>
          <strong>{{ card.title }}</strong>
          <span>{{ card.desc }}</span>
        </div>
      </a>
    </div>
    <div v-if="isMobile && visibleCards.length > 1" class="carousel-nav-wrap">
      <SlideNav
        :current="currentCard"
        :total="visibleCards.length"
        @prev="currentCard--"
        @next="currentCard++"
      />
    </div>
  </aside>
</template>

<style scoped>
h3 {
  letter-spacing: 0;
  font-family: "Baloo 2", "Noto Sans TC", sans-serif;
  font-size: 18px;
}

.related-tools {
  margin-top: 22px;
  padding: 24px;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: 18px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.related-tools h3 {
  position: relative;
  margin-bottom: 18px;
  padding-left: 16px;
  color: var(--green);
  font-size: 22px;
}

.related-tools h3::before {
  content: "";
  position: absolute;
  left: 0;
  top: .25em;
  width: 5px;
  height: 1.25em;
  background: var(--yellow);
  border-radius: 999px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 18px;
}

.related-card {
  min-height: 220px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 18px;
  color: #fffefa;
  border: 1px solid rgba(255, 255, 250, .14);
  border-radius: 10px;
  text-decoration: none;
  background-position: center;
  background-size: cover;
  box-shadow: inset 0 -120px 90px rgba(0, 0, 0, .72);
  transition: transform .18s ease, border-color .18s ease;
}

.related-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, .04) 30%, rgba(0, 0, 0, .78) 100%);
}

.related-card:hover {
  transform: translateY(-2px);
  border-color: rgba(248, 192, 50, .62);
}

.related-card div {
  position: relative;
  z-index: 1;
}

.related-card strong,
.related-card span {
  display: block;
}

.related-card strong {
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: 850;
}

.related-card span {
  max-width: 24ch;
  color: rgba(255, 254, 250, .82);
  font-size: 14px;
  line-height: 1.5;
}

.resume-card {
  background-image: url("../images/background-imgs/spring-table.jpg");
}

.notes-card {
  background-image: url("../images/background-imgs/daisy-wall.jpg");
}

.carousel-nav-wrap {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}

@media (max-width: 680px) {
  .related-tools {
    padding: 18px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
