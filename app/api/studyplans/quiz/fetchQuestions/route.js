import { NextResponse } from "next/server";
import supabase from "@/app/config/supabase";
import { headers } from 'next/headers';

export async function GET(req) {

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

        const searchParams = req.nextUrl.searchParams;
        const quizId = searchParams.get('quiz_id');

        if (!quizId || quizId.trim() === "") {
            return NextResponse.json({ message: "Empty query" }, { status: 500 });
        } else {

            try {

                const { data } = await supabase
                    .from('quiz')
                    .select('*')
                    .eq('quiz_id', quizId)
                if (Array.isArray(data) && data.length === 0) {

                    return NextResponse.json({ message: "Empty quiz" }, { status: 200 });

                } else {

                    return NextResponse.json({ message: "Quiz fetched successfully", data }, { status: 200 });

                }

            } catch (error) {

                return NextResponse.json({ message: error }, { status: 500 });

            }


        }

    }

}