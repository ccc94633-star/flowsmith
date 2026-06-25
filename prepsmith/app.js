async function analyze() {
  const apiKey = document.getElementById('api-key').value.trim();
  const company = document.getElementById('company').value.trim();
  const jd = document.getElementById('jd').value.trim();
  const background = document.getElementById('background').value.trim();

  // ── Validation ──
  const errorEl = document.getElementById('error-msg');
  errorEl.hidden = true;

  if (!apiKey) return showError('請填入你的 Anthropic API Key');
  if (!company) return showError('請填入公司名稱');
  if (!jd) return showError('請填入職缺名稱或 JD 內容');

  // ── UI: loading state ──
  const btn = document.getElementById('analyze-btn');
  btn.disabled = true;
  document.getElementById('btn-text').textContent = '分析中...';
  document.getElementById('btn-spinner').hidden = false;

  // ── Show result area & reset cards ──
  const outputEl = document.getElementById('output');
  outputEl.hidden = false;

  const CARD_IDS = ['content-company', 'content-skills', 'content-qa'];
  CARD_IDS.forEach(id => {
    const el = document.getElementById(id);
    el.innerHTML = '<span class="cursor"></span>';
  });

  // ── Build prompt ──
  const prompt = `你是一位資深職涯顧問，擅長協助求職者準備面試。

以下是求職者提供的資訊：
- 目標公司：${company}
- 職缺 / JD 內容：${jd}
${background ? `- 求職者背景：${background}` : ''}

請依照以下三個區塊，逐一輸出你的分析（請保持每個區塊的標題格式不變）：

## 公司概況
針對 ${company} 做 2-3 段的背景介紹，涵蓋業務模式、主要產品、企業文化或近期動態，幫助求職者在面試前建立基本認識。

## 核心技能需求
根據 JD 內容，條列 5-8 個此職缺最重要的技能或特質。每項請包含：技能名稱、為何這個職位特別需要它、求職者可以如何在面試中具體展現。

## 可能問題與回答方向
列出 5-8 道這個職位常見或高機率被問到的面試問題。每題請包含：問題本身、以及建議的回答方向或思考框架（若求職者有提供背景，請盡量結合其經驗）。`;

  // ── Call API (streaming) ──
  let fullText = '';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2500,
        stream: true,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      sseBuffer += decoder.decode(value, { stream: true });

      const lines = sseBuffer.split('\n');
      sseBuffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;

        try {
          const parsed = JSON.parse(raw);
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            fullText += parsed.delta.text;
            renderSections(fullText);
          }
        } catch (_) {}
      }
    }

  } catch (err) {
    showError('分析失敗：' + err.message);
  } finally {
    btn.disabled = false;
    document.getElementById('btn-text').textContent = '重新分析';
    document.getElementById('btn-spinner').hidden = true;
    // Remove streaming cursors
    CARD_IDS.forEach(id => {
      const cursor = document.getElementById(id).querySelector('.cursor');
      if (cursor) cursor.remove();
    });
  }
}

// ── Parse sections from streamed text and update cards ──
function renderSections(text) {
  const SECTION_MAP = [
    { header: '公司概況',        contentId: 'content-company' },
    { header: '核心技能需求',    contentId: 'content-skills'  },
    { header: '可能問題與回答方向', contentId: 'content-qa'  },
  ];

  const parts = text.split(/^## /m);

  for (const { header, contentId } of SECTION_MAP) {
    const chunk = parts.find(p => p.startsWith(header));
    if (!chunk) continue;

    const body = chunk.replace(header, '').replace(/^\n+/, '');
    const el = document.getElementById(contentId);

    el.innerHTML = markdownToHtml(body) + '<span class="cursor"></span>';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── Simple markdown → HTML converter ──
function markdownToHtml(text) {
  const lines = text.split('\n');
  const out = [];
  let inList = false;

  for (let line of lines) {
    // h3
    if (line.startsWith('### ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h3>${escape(line.slice(4))}</h3>`);
      continue;
    }

    // bullet
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineMd(bulletMatch[1])}</li>`);
      continue;
    }

    // numbered list
    const numMatch = line.match(/^\d+\.\s+(.*)/);
    if (numMatch) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineMd(numMatch[1])}</li>`);
      continue;
    }

    // end list on blank / paragraph
    if (inList && line.trim() === '') {
      out.push('</ul>');
      inList = false;
      continue;
    }

    if (line.trim()) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<p>${inlineMd(line)}</p>`);
    }
  }

  if (inList) out.push('</ul>');
  return out.join('');
}

function inlineMd(text) {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

function escape(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function showError(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.hidden = false;
}
