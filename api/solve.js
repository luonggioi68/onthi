// api/solve.js
export default async function handler(req, res) {
    const { image, text } = req.body; // Nhận thêm dữ liệu ảnh Base64
    const API_KEY = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Hãy nhìn vào hình ảnh này, nhận diện bài toán/câu hỏi và đưa ra lời giải chi tiết từng bước cho học sinh." },
                        { inline_data: { mime_type: "image/jpeg", data: image.split(',')[1] } } // Gửi ảnh trực tiếp
                    ]
                }]
            })
        });

        const data = await response.json();
        res.status(200).json({ solution: data.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: "Lỗi kết nối AI" });
    }
}
