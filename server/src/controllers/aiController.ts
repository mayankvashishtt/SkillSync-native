import OpenAI from 'openai';
import { Response } from 'express';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

export const getAIRecommendations = async (req: any, res: Response) => {
    const { habits, goals } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: "You are an AI habit and productivity coach. Provide concise, motivating, and personalized recommendations based on the user's current habits and goals."
                },
                {
                    role: "user",
                    content: `My current habits are: ${JSON.stringify(habits)}. My goals are: ${goals}. Give me 3 tips to improve.`
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const recommendation = response.choices[0]?.message?.content || "No recommendation available at this time.";
        res.json({ recommendation });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
