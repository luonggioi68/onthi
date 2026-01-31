export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { image } = req.body; 
    const API_KEY = process.env.GEMINI_API_KEY; // Lấy từ Environment Variables trên Vercel
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Bạn là trợ lý giáo dục TITI. Hãy nhìn hình ảnh bài tập này, nhận diện nội dung (kể cả viết tay) và giải chi tiết từng bước cho học sinh." },
                        { inline_data: { mime_type: "image/jpeg", data: image.split(',')[1] } }
                    ]
                }]
            })
        });

        const data = await response.json();
        const solution = data.candidates[0].content.parts[0].text;
        res.status(200).json({ solution });
    } catch (error) {
        res.status(500).json({ error: "AI Vision gặp lỗi kết nối." });
    }
}
