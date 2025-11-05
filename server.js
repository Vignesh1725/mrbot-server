const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const botReply = result.response.text();
        res.json({ reply: botReply });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(5000, () => console.log("Server running on port 5000"));