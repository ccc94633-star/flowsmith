import OpenAI from 'openai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只允許 POST 請求' });
    }

    try {

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { prompt, ownerCode } = req.body;

        if (!ownerCode || ownerCode !== process.env.OWNER_ACCESS_CODE) {
            return res.status(401).json({ error: '沒有使用 AI 功能的權限' });
        }

        if (!prompt) {
            return res.status(400).json({ error: '缺少 Prompt' });
        }

        if (prompt.length > 6000) {
            return res.status(400).json({ error: 'Prompt 太長，請縮短內容' });
        }

        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: '你是一位專業的面試準備教練。請用繁體中文回答，內容要具體、條列清楚、可執行。',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        return res.status(200).json({
            answer: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'AI 回覆產生失敗，請稍後再試',
        });
    }
}
