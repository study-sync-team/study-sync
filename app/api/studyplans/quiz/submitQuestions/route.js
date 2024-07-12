import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import supabase from "@/app/config/supabase";

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
        if (!Array.isArray(json)) {
            return NextResponse.json({ error: 'Invalid data format, expected an array' }, { status: 400 });
        }

        for (const item of json) {
            if (!item.plan_id || !item.quiz_id || !item.module_id || !item.user_id || !item.question || !item.selectedOption || !item.correctOption || typeof item.isCorrect !== 'boolean' || !item.score) {
                return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
            }
        }

        // Transform each item in the array to the desired format
        const quizData = json.map(item => ({
            plan_id: item.plan_id,
            module_id: item.module_id,
            question: item.question,
            quiz_id: item.quiz_id,
            selected_option: item.selectedOption,
            user_id: item.user_id,
            correct_option: item.correctOption,
            status: item.isCorrect
        }));

        // Insert the transformed data into the Supabase table
        const { error } = await supabase
            .from("user_quiz")
            .insert(quizData);
        if (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }
        const scoreData = {
            quiz_id: json[0].quiz_id,
            user_id: json[0].user_id,
            module_id: json[0].module_id,
            score: json[0].score,
            plan_id: json[0].plan_id,
        };
        //insert score into table
        const { error: scoreError } = await supabase
            .from("quiz_results")
            .insert(scoreData);

        if (scoreError) {
            return NextResponse.json({ error: scoreError }, { status: 500 });
        }

        return NextResponse.json({ message: 'Quiz submitted successfully' }, { status: 200 });


    } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

}