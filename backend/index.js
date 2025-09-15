import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import { persons } from './constant.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const Client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
    try {
        const { id,content } = req.body;
        
        const person = persons.find(p => p.id === id);
        const response = await Client.chat.completions.create({
            model: "gpt-3.5-turbo",
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
const frontendBuildPath = path.resolve(__dirname, '..', 'frontend', 'build');
app.use(express.static(frontendBuildPath));

// For any request that doesn't match an API route, send the React app's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});