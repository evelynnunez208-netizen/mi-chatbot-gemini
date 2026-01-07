require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        // Usamos gemini-1.5-flash-latest que es el estándar actual
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(req.body.message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
