<template>
  <main>
    <section class="readme-hero">
      <p class="eyebrow">Project Notes</p>
      <h1>FlowSmith 使用說明書</h1>
      <p>
        FlowSmith 是我的 AI 小工具作品總集，用來收集我製作的 AI workflow、
        AI 輔助工具、教學範例與實驗作品。
      </p>
    </section>

    <article class="readme-card">
      <section>
        <h2>作品總集定位</h2>
        <p>
          FlowSmith 不是單一工具，而是一個持續擴充的 AI tools portfolio。
          每個作品會盡量呈現完整流程，從使用者輸入到結果介面都能被清楚理解。
        </p>
        <div class="readme-flow">
          使用者輸入 → Prompt 設計 → AI API 串接 → 結果整理 → 介面呈現
        </div>
      </section>

      <section>
        <h2>目前作品</h2>
        <div class="readme-table">
          <div class="readme-row readme-head">
            <span>類型</span>
            <span>作品</span>
            <span>說明</span>
          </div>
          <div class="readme-row">
            <span>AI 小工具</span>
            <span>Interview Prep AI</span>
            <span>貼上職缺 JD 與一頁式履歷重點，產生面試準備 Prompt。</span>
          </div>
        </div>
      </section>

      <section>
        <h2>未來想加入的工具</h2>
        <ul class="readme-list">
          <li>履歷優化助手</li>
          <li>Email 草稿產生器</li>
          <li>會議摘要工具</li>
          <li>社群貼文產生器</li>
          <li>旅遊行程規劃工具</li>
          <li>學習筆記整理工具</li>
          <li>PDF / 文件摘要工具</li>
          <li>作品集文案整理工具</li>
        </ul>
      </section>

      <section>
        <h2>使用技術</h2>
        <ul class="readme-list inline-list">
          <li>Vue</li>
          <li>Vite</li>
          <li>JavaScript</li>
          <li>CSS</li>
          <li>AI API integration</li>
        </ul>
      </section>

      <section>
        <h2>開發指令</h2>
        <pre class="readme-code"><code>npm run dev
npm run build
npm run preview</code></pre>
      </section>

    </article>
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
h2 {
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

.readme-hero {
  padding: 34px 30px 8px;
}

.readme-hero h1 {
  max-width: 760px;
}

.readme-hero p:not(.eyebrow) {
  max-width: 62ch;
  color: var(--muted);
  font-size: 16px;
}

.readme-card {
  padding: 30px;
  display: grid;
  gap: 30px;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.readme-card section {
  display: grid;
  gap: 12px;
}

.readme-card p {
  max-width: 72ch;
  color: var(--muted);
}

.readme-flow,
.readme-code {
  overflow-x: auto;
  padding: 16px;
  color: var(--code-text);
  background: var(--code);
  border-radius: 14px;
}

.readme-flow {
  font-weight: 700;
}

.readme-code code {
  font-family: "Cascadia Code", Consolas, monospace;
  font-size: 14px;
  line-height: 1.7;
}

.readme-table {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.readme-row {
  display: grid;
  grid-template-columns: 150px 190px minmax(0, 1fr);
  gap: 14px;
  padding: 14px 16px;
  color: var(--muted);
  border-top: 1px solid var(--line);
}

.readme-row:first-child {
  border-top: 0;
}

.readme-head {
  color: var(--green);
  background: rgba(238, 244, 231, .72);
  font-weight: 800;
}

.readme-list {
  padding-left: 22px;
  color: var(--muted);
  columns: 2;
}

.readme-list li {
  margin-bottom: 8px;
}

.inline-list {
  columns: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-left: 0;
  list-style: none;
}

.inline-list li {
  margin-bottom: 0;
  padding: 5px 10px;
  color: #6d560d;
  background: rgba(255, 243, 179, .7);
  border: 1px solid rgba(225, 184, 63, .34);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 680px) {
  main {
    padding: 22px 16px 52px;
  }

  .readme-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .readme-list {
    columns: 1;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
