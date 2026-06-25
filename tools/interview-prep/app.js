const form = document.querySelector('#prep-form');
const resetBtn = document.querySelector('#reset-btn');
const copyBtn = document.querySelector('#copy-btn');
const promptPanel = document.querySelector('#prompt-panel');
const promptOutput = document.querySelector('#prompt-output');
const copyStatus = document.querySelector('#copy-status');

function buildPrompt(data) {
  return `你是一位專業的面試準備教練。請根據以下資料，協助候選人準備面試。

【公司名稱】
${data.company}

【職缺名稱】
${data.role}

【職缺 JD / 工作內容】
${data.jobDescription}

【一頁式履歷重點】
${data.background || '未提供。請根據職缺需求，給出通用但具體的準備方向。'}

【想加強的方向】
${data.focus}

請用繁體中文輸出，內容要具體、實用、適合面試前準備。

請固定使用以下格式：

## 1. 公司與職缺重點
用 3 到 5 點整理這個職缺可能重視的能力、工作重點與面試官可能在意的事。

## 2. 履歷對照分析
根據我的一頁式履歷重點，分析哪些經驗最適合拿來對應這個職缺。

## 3. 準備策略
依照「${data.focus}」這個方向，列出我應該優先準備的內容。

## 4. 可能面試問題
提供 8 題可能被問到的問題，每題附上回答提示。

## 5. 回答包裝建議
建議我如何介紹自己的作品、經驗、轉職動機或學習歷程。

## 6. 面試前檢查清單
列出面試前一天可以檢查的事項。`;
}

function getFormData() {
  const data = new FormData(form);

  return {
    company: data.get('company').trim(),
    role: data.get('role').trim(),
    jobDescription: data.get('jobDescription').trim(),
    background: data.get('background').trim(),
    focus: data.get('focus'),
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const prompt = buildPrompt(getFormData());
  promptOutput.textContent = prompt;
  promptPanel.hidden = false;
  copyStatus.textContent = '';
  promptPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

resetBtn.addEventListener('click', () => {
  form.reset();
  promptPanel.hidden = true;
  promptOutput.textContent = '';
  copyStatus.textContent = '';
});

copyBtn.addEventListener('click', async () => {
  if (!promptOutput.textContent) return;

  await navigator.clipboard.writeText(promptOutput.textContent);
  copyStatus.textContent = '已複製 Prompt，可以貼到 AI 工具測試。';
});
