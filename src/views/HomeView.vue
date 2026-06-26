<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import SlideNav from '../components/SlideNav.vue'
import { projectCards as homeProjectCards } from '../data/projectCards'

const isMobile = ref(false)
const currentCard = ref(0)

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
</script>

<template>
  <main>
    <section class="hero hero-home">
      <div class="hero-copy">
        <p class="eyebrow">Workshop Notes / AI Tools, Handmade</p>
        <h1>把一個個 AI 想法，<br>做成溫柔好用的小工具。</h1>
        <p>
          FlowSmith 是我放置 AI workflow 與 AI 小工具的作品總集。<br>每個工具都從一個明確需求出發，
          練習把輸入、Prompt、AI 回應與介面整理成完整流程。
        </p>
        <div class="hero-actions">
          <a class="button" href="#/#tools">查看目前工具</a>
          <a class="button" href="#/readme">使用說明書</a>
        </div>
      </div>
      <figure class="hero-soft-image">
        <img src="../images/personal-icons/og-image-clean.png" alt="設計者個人圖章">
      </figure>
    </section>

    <div class="pixel-dots" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>

    <section class="section" id="workflow">
      <p class="eyebrow">How It Works</p>
      <h2>我的 AI 小工具製作流程</h2>
      <div class="workflow">
        <div>使用者輸入</div>
        <span class="flow-arrow">&gt;&gt;</span>
        <div>Prompt 設計</div>
        <span class="flow-arrow">&gt;&gt;</span>
        <div>AI API 串接</div>
        <span class="flow-arrow">&gt;&gt;</span>
        <div>結果整理</div>
        <span class="flow-arrow">&gt;&gt;</span>
        <div>介面呈現</div>
      </div>
    </section>

    <section class="section tools-section" id="tools">
      <div class="section-head">
        <p class="eyebrow">Tools</p>
        <div class="section-title-row">
          <h2>目前所有 AI 工具</h2>
          <p>這裡會持續新增我做的 AI 小工具</p>
        </div>
      </div>

      <div class="project-grid">
        <article
          v-for="(card, i) in homeProjectCards"
          :key="card.href"
          class="project-card"
          :class="{ 'featured-card': card.featured }"
          v-show="!isMobile || i === currentCard"
        >
          <div>
            <span class="tag">{{ card.tag }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
          <a class="button" :href="card.href">開啟工具</a>
        </article>
      </div>

      <div v-if="isMobile && homeProjectCards.length > 1" class="carousel-nav-wrap">
        <SlideNav
          :current="currentCard"
          :total="homeProjectCards.length"
          @prev="currentCard--"
          @next="currentCard++"
        />
      </div>
    </section>

    <section class="section" id="ideas">
      <p class="eyebrow">Ideas</p>
      <h2>之後想加入的工具</h2>
      <ul class="tool-list">
        <li>長輩最愛！早安圖自動產生機</li>
        <li>有什麼好吃的？美食雷達偵測機</li>
        <li>會議摘要工具</li>
        <li>社群貼文產生器</li>
        <li>旅遊行程規劃工具</li>
        <li>學習筆記整理工具</li>
        <li>PDF / 文件摘要工具</li>
        <li>作品集文案整理工具</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  width: min(980px, 100%);
  margin: 0 auto;
  padding: 36px 24px 80px;
  display: grid;
  gap: 26px;
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--gold-deep);
  font-family: Silkscreen, Inter, sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: .08em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  letter-spacing: 0;
  color: var(--green);
}

h1 {
  margin-bottom: 18px;
  font-family: "Baloo 2", "Noto Sans TC", sans-serif;
  font-size: clamp(34px, 5.2vw, 48px);
  line-height: 1.12;
  font-weight: 700;
}

h2 {
  margin-bottom: 14px;
  font-family: "Baloo 2", "Noto Sans TC", sans-serif;
  font-size: clamp(24px, 2.6vw, 28px);
  line-height: 1.18;
}

h3 {
  margin-bottom: 8px;
  font-family: "Baloo 2", "Noto Sans TC", sans-serif;
  font-size: 18px;
}

.hero {
  min-height: 380px;
  padding: 30px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 30px;
  align-items: center;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.hero-home {
  min-height: 420px;
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.hero p:not(.eyebrow) {
  max-width: 58ch;
  font-size: 16px;
  color: var(--muted);
}

.hero-copy {
  max-width: 680px;
}

.hero-actions {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.button {
  min-height: 44px;
  padding: 9px 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fffefa;
  background: var(--green);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  font: inherit;
  font-weight: 800;
}

.button:hover {
  background: #1f352b;
}

.hero-soft-image {
  justify-self: center;
  width: min(256px, 100%);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 3px solid rgba(63, 77, 43, .28);
  border-radius: 50%;
  box-shadow: 0 18px 48px rgba(63, 77, 43, .12);
}

.hero-soft-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pixel-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pixel-dots span {
  width: 6px;
  height: 6px;
  background: var(--green-2);
  opacity: .34;
}

.pixel-dots span:nth-child(3n) {
  background: var(--yellow);
  opacity: .72;
}

.section {
  padding: 26px;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.section-head {
  margin-bottom: 20px;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.section-title-row h2 {
  margin-bottom: 0;
  white-space: nowrap;
}

.section-title-row p {
  max-width: 420px;
  color: var(--muted);
}

.workflow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 12px;
  align-items: center;
}

.workflow div {
  min-height: 94px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--green);
  background: rgba(238, 244, 231, .72);
  border: 1px solid var(--line);
  border-radius: 16px;
  font-weight: 800;
}

.flow-arrow {
  color: var(--gold-deep);
  font-family: Silkscreen, Inter, sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.project-card {
  min-height: 250px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  background:
    linear-gradient(rgba(255, 255, 250, .86), rgba(255, 255, 250, .9)),
    url("../images/background-imgs/daisy-meadow.jpg") center / cover;
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: 18px;
}

.project-card p {
  color: var(--muted);
}

.featured-card {
  grid-column: span 1;
}

.tag {
  width: fit-content;
  margin-bottom: 12px;
  padding: 4px 10px;
  display: inline-flex;
  color: #6d560d;
  background: rgba(255, 243, 179, .7);
  border: 1px solid rgba(225, 184, 63, .34);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 850;
}

.tool-list {
  padding-left: 22px;
  columns: 2;
}

.tool-list li {
  margin-bottom: 8px;
  color: var(--muted);
}

.carousel-nav-wrap {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}

@media (max-width: 920px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .workflow,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .flow-arrow {
    text-align: center;
    transform: rotate(90deg);
  }
}

@media (max-width: 680px) {
  main {
    padding: 22px 16px 52px;
  }

  .hero,
  .section {
    padding: 18px;
  }

  /* stamp above the eyebrow text */
  .hero-soft-image {
    order: -1;
    width: 50vw;
    height: 50vw;
    margin: 0 auto 8px;
  }

  /* compact workflow items */
  .workflow div {
    min-height: auto;
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 12px;
  }

  .flow-arrow {
    font-size: 14px;
  }

  .tool-list {
    columns: 1;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
