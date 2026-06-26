<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import RelatedTools from '../components/RelatedTools.vue';

const form = reactive({
  company: '',
  role: '',
  jobDescription: '',
  background: '',
  focus: '整體面試準備',
});

const prompt = ref('');
const copyStatus = ref('');
const promptPanel = ref(null);
const ownerCode = ref('');
const aiAnswer = ref('');
const aiError = ref('');
const isAiLoading = ref(false);


onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

function buildPrompt() {
  return `你是一位專業的面試準備教練。請根據以下資料，協助候選人準備面試。

【公司名稱】
${form.company}

【職缺名稱】
${form.role}

【職缺 JD / 工作內容】
${form.jobDescription}

【履歷重點】
${form.background || '未提供。請根據職缺需求，給出通用但具體的準備方向。'}

【想加強的方向】
${form.focus}

請用繁體中文輸出，內容要具體、實用、適合面試前準備。

請固定使用以下格式：

## 1. 公司與職缺重點
用 3 到 5 點整理這個職缺可能重視的能力、工作重點與面試官可能在意的事。

## 2. 履歷對照分析
根據我的履歷重點，分析哪些經驗最適合拿來對應這個職缺。

## 3. 準備策略
依照「${form.focus}」這個方向，列出我應該優先準備的內容。

## 4. 可能面試問題
提供 8 題可能被問到的問題，每題附上回答提示。

## 5. 回答包裝建議
建議我如何介紹自己的作品、經驗、轉職動機或學習歷程。

## 6. 面試前檢查清單
列出面試前一天可以檢查的事項。

## 7. 請將你提供的資訊製作成MD檔
方便後續將資訊深入利用。`;
}

async function handleSubmit() {
  prompt.value = buildPrompt();
  copyStatus.value = '';

  await nextTick();
  promptPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  form.company = '';
  form.role = '';
  form.jobDescription = '';
  form.background = '';
  form.focus = '整體面試準備';
  prompt.value = '';
  copyStatus.value = '';
}

async function copyPrompt() {
  if (!prompt.value) return;

  await navigator.clipboard.writeText(prompt.value);
  copyStatus.value = '已複製 Prompt，可以貼到 AI 工具測試。';
}

async function askAi() {
  if (!prompt.value) return;

  aiAnswer.value = '';
  aiError.value = '';
  isAiLoading.value = true;

  try {
    const res = await fetch('/api/interview-prep', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        ownerCode: ownerCode.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'AI 回覆產生失敗');
    }

    aiAnswer.value = data.answer;
  } catch (error) {
    aiError.value = error.message;
  } finally {
    isAiLoading.value = false;
  }
}

function sendAnswerToResumeHelper() {
  if (!aiAnswer.value) return;

  sessionStorage.setItem('flowsmith.interviewPrepMd', aiAnswer.value);
  window.location.hash = '#/resume-helper';
}
</script>

<template>
  <main>
    <section class="hero hero-tool">
      <div class="hero-copy">
        <p class="eyebrow">Interview Prep Tool</p>
        <h1>面試準備機</h1>
        <p>貼上職缺資訊和履歷重點，整理成可測試的面試準備 Prompt。</p>
      </div>
    </section>

    <section class="workspace">
      <form class="tool-card form-card" @submit.prevent="handleSubmit">
        <div class="section-title">
          <span>01</span>
          <div>
            <p class="eyebrow">Input</p>
            <h2>輸入面試資料</h2>
          </div>
        </div>

        <label>
          公司名稱
          <input v-model="form.company" type="text" placeholder="例如：Google、台積電、某某新創" required>
        </label>

        <label>
          職缺名稱
          <input v-model="form.role" type="text" placeholder="例如：Frontend Engineer、UI Designer" required>
        </label>

        <label>
          職缺 JD / 工作內容
          <textarea v-model="form.jobDescription" rows="7" placeholder="貼上職缺描述、必要技能、加分條件..." required></textarea>
        </label>

        <label>
          履歷重點
          <textarea v-model="form.background" rows="8" placeholder="建議貼：1. 你的定位 2. 主要技能 3. 代表作品 4. 工作/專案經驗 5. 想強調的優勢"></textarea>
        </label>

        <div class="note-box">
          <strong>履歷重點可以這樣貼：</strong>
          <p>不用貼完整格式，直接貼重點即可，例如「我是誰、會什麼、做過哪些作品、和這個職缺有關的經驗」。</p>
        </div>

        <label>
          想加強的方向
          <select v-model="form.focus">
            <option value="整體面試準備">整體面試準備</option>
            <option value="技術面試">技術面試</option>
            <option value="行為面試">行為面試</option>
          </select>
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

      <section v-if="prompt" class="tool-card next-step-card">
        <div>
          <p class="eyebrow">Next Step</p>
          <h2>把面試資料變成更貼近職缺的履歷</h2>
          <p>得到面試準備的資料了，下一步，把履歷整理成更貼近職缺的版本吧！</p>
        </div>
        <a class="button" href="#/resume-helper">前往履歷優化助手</a>
      </section>

      <RelatedTools v-if="prompt" />
      
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
            <h2>AI 面試準備建議</h2>
          </div>
        </div>
        <pre class="prompt-box"><code>{{ aiAnswer }}</code></pre>
        <div class="actions">
          <button type="button" @click="sendAnswerToResumeHelper">用這份面試準備 MD 優化履歷</button>
        </div>
      </section>

      
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

.form-card {
  width: 100%;
  display: grid;
  gap: 16px;
}

.result-card {
  width: 100%;
}

.next-step-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background:
    linear-gradient(rgba(255, 255, 250, .88), rgba(255, 255, 250, .9)),
    url("../images/background-imgs/spring-table.jpg") center 58% / cover;
}

.next-step-card h2 {
  margin-bottom: 8px;
}

.next-step-card p:not(.eyebrow) {
  max-width: 52ch;
  color: var(--muted);
  font-size: 16px;
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

.note-box {
  padding: 14px 15px;
  background: rgba(238, 244, 231, .66);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.note-box strong {
  display: block;
  margin-bottom: 4px;
  color: var(--green);
}

.note-box p {
  color: var(--muted);
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

.copy-status {
  min-height: 22px;
  color: #6d560d;
  font-size: 14px;
  font-weight: 800;
}

@media (max-width: 680px) {
  main {
    padding: 22px 16px 52px;
  }

  .hero,
  .tool-card {
    padding: 22px;
  }

  .next-step-card {
    align-items: flex-start;
    flex-direction: column;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
