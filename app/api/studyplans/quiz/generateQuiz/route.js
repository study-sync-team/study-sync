import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import supabase from "@/app/config/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {

    // Retrieve the headers from the incoming request
    const headersInstance = headers();

    // Extract the 'authorization' header from the request headers
    const authorization = headersInstance.get('authorization');

    // Split the 'authorization' header to separate the Bearer token
    const splited_authorization = authorization.split("Bearer ");

    // Retrieve the Bearer token from the split result
    const bearer_token = splited_authorization[1];

    // Check if the Bearer token matches the expected value from the environment variables
    if (bearer_token === process.env.MASTER_BEARER_KEY) {

        const json = await req.json();

        // Ensure required fields exist in the JSON data
        if (!json.planId || !json.moduleId || !json.note) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const generate_quiz_data = {
            plan_id: json.planId,
            module_id: json.moduleId,
            note: json.note
        }

        async function GenerateQuizWithGemini(note, options = {}) {

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", ...options });
            const prompt = `Generate simplified quiz for students based on this note contents ${note} strictly based on this array schema{"quiz": [{question: "",option_a: "", option_b: "", option_c: "", option_d: "", right_option: ""}]}`

            try {

                const generatedContent = await model.generateContentStream([prompt]);
                let text = '';
                for await (const chunk of generatedContent.stream) {
                    const chunkText = chunk.text();
                    console.log(chunkText);
                    text += chunkText;
                }

                // Remove any occurrence of ```json, ```stream, and trailing ```
                const cleanedText = text.replace(/(```json|```stream|```)/g, '');

                console.log("cleaned:", cleanedText); // Add this line for debugging
                const quizData = JSON.parse(cleanedText);
                let quiz = Array.isArray(quizData.quiz) ? quizData.quiz : []; // Ensure 'modules' is an array

                
                return NextResponse.json({ quiz: quiz}, { status: 200 });


            } catch (error) {
                return NextResponse.json({ error: error }, { status: 500 });

            }

        }

        return GenerateQuizWithGemini(generate_quiz_data.note, { generationConfig: { response_mime_type: "application/json" } })

    }

}