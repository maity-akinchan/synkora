import { NextRequest } from 'next/server';
import { GoogleGenAI } from "@google/genai";

async function getGeminiResponse(prompt: String) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    console.log("AI CALLED!");
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `RETURN AS A NORMAL STRING, NO TRIPLE BACKTICKS, Give markdown syntax for ${prompt}, compatible libraries are remarkGfm, remarkMath, rehypeRaw, rehypeKatex`,
    });
    console.log(response.text)
    return response.text;
}


export async function POST(request: NextRequest) {
    const data = await request.json();
    console.log('Received data:', data);
    const output = await getGeminiResponse(data.prompt);
    return new Response(JSON.stringify({ message: 'Data logged', output:  output}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}