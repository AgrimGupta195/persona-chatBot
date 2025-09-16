import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import { persons } from './constant.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const Client = new OpenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
 });

app.post('/chat', async (req, res) => {
    try {
        const { id,content } = req.body;
        
        const person = persons.find(p => p.id === id);
        const response = await Client.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: person.content },
                { role: "user", content: content }
            ]
        });
        return res.json({ message: response.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});