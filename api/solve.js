// api/solve.js
export default async function handler(req, res) {
    // Chỉ chấp nhận phương thức POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { text } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // Lấy từ cài đặt Vercel

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Giải chi tiết bài tập này: ${text}` }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        res.status(200).json({ solution: aiResponse });
    } catch (error) {
        res.status(500).json({ error: "Lỗi kết nối AI" });
    }

}
