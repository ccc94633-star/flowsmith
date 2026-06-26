<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import RelatedTools from '@/components/RelatedTools.vue';

const form = reactive({
  interviewPrepMd: '',
  outputType: 'word',
  extraRequest: '',
});

const prompt = ref('');
const copyStatus = ref('');
const fileStatus = ref('');
const promptPanel = ref(null);
const ownerCode = ref('');
const aiAnswer = ref('');
const aiError = ref('');
const isAiLoading = ref(false);

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

function outputLabel() {
  return form.outputType === 'pdf' ? 'PDF' : 'Word';
}

function buildPrompt() {
  return `你是一位熟悉前端工程師求職、履歷策略與職缺對照分析的履歷優化顧問。

我會提供一份「面試準備 MD」，這份 MD 是另一個工具根據公司、職缺 JD、履歷重點產生的面試準備手冊。
如果使用者貼上的內容看起來只是面試準備機產生的 Prompt，而不是 AI 回覆的完整面試準備 MD，請先提醒使用者：需要先把面試準備 Prompt 送給 AI，取得 AI 回覆的 Markdown 後，再回到履歷優化助手。
請你先解析這份 MD，但不要重新產生完整的面試準備內容。請只擷取會影響履歷改寫的依據：

1. 目標公司與職缺名稱
2. 這間公司 / 這個職缺最重視的能力
3. 候選人履歷中最應該被強化的亮點
4. 需要弱化、刪減或避免過度鋪陳的內容
5. 面試官可能在意的疑慮與加分點
6. 履歷應該調整的敘事方向

接著，請根據以上分析，產出適合整理成「${outputLabel()}」的履歷優化內容。

【輸出類型】
${outputLabel()}

【補充要求】
${form.extraRequest || '未提供。請根據面試準備 MD 自行判斷最適合強調的方向。'}

【面試準備 MD】
${form.interviewPrepMd}

請用繁體中文輸出，並固定使用以下格式：

## 1. 履歷改寫依據摘要
請根據面試準備 MD，擷取會影響履歷改寫的重點即可，不要重新產生完整面試準備內容。
請整理：
- 這間公司 / 職缺最重視的能力
- 候選人履歷中最應該強化的亮點
- 需要弱化或刪減的內容
- 面試官可能在意的疑慮
- 最適合這份履歷的敘事方向

## 2. 履歷優化策略
請說明這份履歷應該優先強調什麼、弱化什麼、刪減什麼，以及原因。

## 3. ${outputLabel()} 履歷內容草稿
請產出可以直接整理成 ${outputLabel()} 的履歷內容。段落要清楚，語氣專業，適合投遞該職缺。

## 4. 修改前後差異說明
請說明你做了哪些改寫，以及這些改寫如何對應該公司與職缺。

## 5. 後續人工檢查清單
請列出使用者在輸出成 ${outputLabel()} 前應該人工確認的資訊，例如日期、學歷、證照、聯絡方式、作品連結。`;
}

async function handleSubmit() {
  prompt.value = buildPrompt();
  copyStatus.value = '';
  aiAnswer.value = '';
  aiError.value = '';

  await nextTick();
  promptPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  form.interviewPrepMd = '';
  form.outputType = 'word';
  form.extraRequest = '';
  prompt.value = '';
  copyStatus.value = '';
  fileStatus.value = '';
  ownerCode.value = '';
  aiAnswer.value = '';
  aiError.value = '';
}

async function copyPrompt() {
  if (!prompt.value) return;

  await navigator.clipboard.writeText(prompt.value);
  copyStatus.value = '已複製 Prompt，可以貼到 AI 工具測試。';
}

async function importPrepFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const validTypes = ['text/markdown', 'text/plain', ''];
  const validExtensions = ['.md', '.txt'];
  const hasValidExtension = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

  if (!validTypes.includes(file.type) && !hasValidExtension) {
    fileStatus.value = '請匯入 .md 或 .txt 檔案。';
    event.target.value = '';
    return;
  }

  form.interviewPrepMd = await file.text();
  fileStatus.value = `已匯入：${file.name}`;
  event.target.value = '';
}

function askAi() {
  if (!prompt.value) return;

  aiAnswer.value = '';
  aiError.value = '下一階段會串接履歷優化 API，目前請先複製 Prompt 測試。';
  isAiLoading.value = false;
}
</script>

<template>
  <main>
    <section class="hero hero-tool">
      <div class="hero-copy">
        <p class="eyebrow">Resume Helper</p>
        <h1>履歷優化助手</h1>
        <p>匯入面試準備 MD，讓 AI 根據職缺重點整理更貼近公司的履歷版本。</p>
      </div>
    </section>

    <section class="workspace">
      <section class="tool-card guide-card">
        <div class="guide-copy">
          <p class="eyebrow">Before You Start</p>
          <h2>請先取得 AI 回覆的面試準備 MD</h2>
          <ol class="workflow-steps">
            <li>
              <strong>01 產生面試準備 Prompt</strong>
              <span>到面試準備機輸入公司、職缺 JD 與履歷重點，產生 Prompt。</span>
            </li>
            <li>
              <strong>02 取得面試準備 MD</strong>
              <span>將 Prompt 傳給 AI，取得完整的面試準備 Markdown。</span>
            </li>
            <li>
              <strong>03 匯入履歷優化助手</strong>
              <span>把 AI 回覆的 Markdown 貼到本頁，或匯入 .md / .txt 檔案。</span>
            </li>
          </ol>
        </div>
        <a class="button" href="#/interview-prep">還沒拿到面試準備的 Prompt嗎？</a>
      </section>

      <form class="tool-card form-card" @submit.prevent="handleSubmit">
        <div class="section-title">
          <span>01</span>
          <div>
            <p class="eyebrow">Input</p>
            <h2>匯入面試準備資料</h2>
          </div>
        </div>

        <label>
          面試準備 MD
          <textarea
            v-model="form.interviewPrepMd"
            rows="12"
            placeholder="請貼上「AI 回覆的面試準備 Markdown」，不是面試準備機產生的 Prompt。流程：先用面試準備機產生 Prompt → 將 Prompt 送給 AI → 將 AI 回覆的 MD 貼到這裡。"
            required
          ></textarea>
        </label>

        <label class="file-import">
          或匯入 .md / .txt 檔案
          <input type="file" accept=".md,.txt,text/markdown,text/plain" @change="importPrepFile">
        </label>
        <p class="file-status" aria-live="polite">{{ fileStatus }}</p>

        <label>
          輸出類型
          <select v-model="form.outputType">
            <option value="word">Word</option>
            <option value="pdf">PDF</option>
          </select>
        </label>

        <label>
          補充要求
          <textarea
            v-model="form.extraRequest"
            rows="5"
            placeholder="選填。例如：請更強調 Vue 3、AI API 串接、台中穩定度；或希望語氣更正式、更適合新人轉職。"
          ></textarea>
        </label>

        <div class="actions">
          <button type="submit">產生 Prompt</button>
          <button type="button" class="secondary" @click="resetForm">清空</button>
        </div>
      </form>

      <section v-if="prompt" ref="promptPanel" class="tool-card result-card">
        <div class="section-title">
          <span>02</span>
          <div>
            <p class="eyebrow">Prompt</p>
            <h2>Prompt 預覽</h2>
          </div>
        </div>

        <pre class="prompt-box"><code>{{ prompt }}</code></pre>

        <div class="actions">
          <button type="button" @click="copyPrompt">複製 Prompt</button>
        </div>
        <p class="copy-status" aria-live="polite">{{ copyStatus }}</p>
      </section>

      <div v-if="prompt" class="tool-card owner-panel">
        <label>
          站長模式
          <input
            v-model="ownerCode"
            type="password"
            placeholder="輸入管理密碼後可取得 AI 回覆"
            autocomplete="off"
          >
        </label>
        <div class="actions">
          <button type="button" @click="askAi" :disabled="isAiLoading || !ownerCode">
            {{ isAiLoading ? 'AI 產生中...' : '取得 AI 回覆' }}
          </button>
        </div>
        <p v-if="aiError" class="copy-status">{{ aiError }}</p>
      </div>

      <section v-if="aiAnswer" class="tool-card result-card">
        <div class="section-title">
          <span>03</span>
          <div>
            <p class="eyebrow">AI Answer</p>
            <h2>AI 履歷優化建議</h2>
          </div>
        </div>
        <pre class="prompt-box"><code>{{ aiAnswer }}</code></pre>
      </section>

      <RelatedTools />
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

.hero {
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.hero-tool {
  min-height: 160px;
  padding: 24px 28px;
  display: block;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 255, 250, .9), rgba(255, 255, 250, .92)),
    url("../images/background-imgs/spring-table.jpg") center 58% / cover;
}

.hero-copy {
  max-width: 680px;
}

.hero p:not(.eyebrow) {
  max-width: 58ch;
  font-size: 16px;
  color: var(--muted);
}

.workspace {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  align-items: start;
}

.tool-card {
  padding: 26px;
  background: var(--paper);
  border: 1px solid rgba(255, 255, 255, .82);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.guide-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.guide-copy {
  flex: 1 1 auto;
}

.workflow-steps {
  display: grid;
  gap: 10px;
  list-style: none;
}

.workflow-steps li {
  display: grid;
  gap: 2px;
}

.workflow-steps strong {
  color: var(--green);
  font-size: 14px;
}

.workflow-steps span {
  color: var(--muted);
  font-size: 14px;
}

.form-card {
  width: 100%;
  display: grid;
  gap: 16px;
}

.result-card {
  width: 100%;
}

.section-title {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.section-title span {
  width: 40px;
  height: 40px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--green);
  background: rgba(255, 243, 179, .72);
  border: 1px solid rgba(225, 184, 63, .36);
  border-radius: 50%;
  font-weight: 900;
}

label {
  display: grid;
  gap: 7px;
  color: var(--green);
  font-size: 14px;
  font-weight: 700;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px 13px;
  color: var(--green);
  background: rgba(255, 255, 250, .86);
  border: 1px solid var(--line);
  border-radius: 14px;
  font: inherit;
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus,
select:focus {
  outline: 3px solid rgba(225, 184, 63, .2);
  border-color: rgba(168, 131, 30, .55);
}

.file-import input {
  padding: 10px;
}

.file-status,
.copy-status {
  min-height: 22px;
  color: #6d560d;
  font-size: 14px;
  font-weight: 800;
}

.actions {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

button,
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

button:hover,
.button:hover {
  background: #1f352b;
}

button:disabled {
  cursor: not-allowed;
  opacity: .62;
}

button.secondary {
  color: var(--green);
  background: rgba(255, 255, 250, .74);
  border: 1px solid var(--line);
}

button.secondary:hover {
  background: var(--paper-solid);
}

.prompt-box {
  overflow-x: auto;
  margin-bottom: 16px;
  background: var(--code);
  border-radius: 16px;
}

.prompt-box code {
  display: block;
  min-height: 320px;
  padding: 20px;
  color: var(--code-text);
  font-family: "Cascadia Code", Consolas, monospace;
  font-size: 13px;
  line-height: 1.75;
  white-space: pre-wrap;
}

@media (max-width: 680px) {
  main {
    padding: 22px 16px 52px;
  }

  .hero,
  .tool-card {
    padding: 22px;
  }

  .guide-card {
    align-items: flex-start;
    flex-direction: column;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
