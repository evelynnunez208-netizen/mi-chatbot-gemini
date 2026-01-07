require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(req.body.message);
        
        // Esta es la parte que arregla el 'undefined'
        const response = await result.response;
        const text = response.text(); 
        
        res.json({ reply: text });
    } catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ reply: "Error al conectar con la IA." });
    }
});

// Esto es lo que Render necesita para no dar error de puerto
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor funcionando en puerto ${port}`);
});
