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
            if (!item.plan_id || !item.quiz_id || !item.module_id || !item.user_id || !item.question || !item.selectedOption || !item.correctOption || typeof item.isCorrect !== 'boolean') {
                return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
            }
        }

        const user_quiz_id = uuidv4()

        // Transform each item in the array to the desired format
        const quizData = json.map(item => ({
            plan_id: item.plan_id,
            module_id: item.module_id,
            question: item.question,
            quiz_id: item.quiz_id,
            selected_option: item.selectedOption,
            user_id: item.user_id,
            correct_option: item.correctOption,
            status: item.isCorrect,
            user_quiz_id: user_quiz_id
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

        // Insert score into table
        const { error: scoreError } = await supabase
            .from("quiz_results")
            .insert(scoreData);

        if (scoreError) {
            return NextResponse.json({ error: scoreError }, { status: 500 });
        }

        // Update study module status
        const { module_error } = await supabase
            .from('study_plan_modules')
            .update({ status: true })
            .eq('module_id', scoreData.module_id)
            .select();
        if (module_error) {
            return NextResponse.json({ error: module_error }, { status: 500 });
        }

        // Update plan status
        const { plan_error } = await supabase
            .from('study_plan')
            .update({ status: true })
            .eq('plan_id', scoreData.plan_id)
            .select();
        if (plan_error) {
            return NextResponse.json({ error: plan_error }, { status: 500 });
        }

        // Counting the total study modules based on true status
        const { data: true_count, error: true_count_error } = await supabase
            .from('study_plan_modules')
            .select('*', { count: 'exact' })
            .eq('status', true);
        if (true_count_error) {
            return NextResponse.json({ error: true_count_error }, { status: 500 });
        }

        // Counting the total study modules
        const { data: all_count, error: all_count_error } = await supabase
            .from('study_plan_modules')
            .select('*', { count: 'exact' });
        if (all_count_error) {
            return NextResponse.json({ error: all_count_error }, { status: 500 });
        }

        // Calculate progress percentage
        let percentage = (true_count.length / all_count.length) * 100;

        // Update study plan progress
        const { update_plan_error } = await supabase
            .from('study_plan')
            .update({ progress: percentage.toFixed(0) })
            .eq('plan_id', scoreData.plan_id)
            .select();
        if (update_plan_error) {
            return NextResponse.json({ error: update_plan_error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Quiz submitted successfully', user_quiz_id: user_quiz_id }, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
