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
        const userId = searchParams.get('user_id');

        if (!userId || userId.trim() === "") {
            return NextResponse.json({ message: "Empty query" }, { status: 500 });
        } else {

            async function FetchUser(userId) {

                try {


                    const { data } = await supabase
                        .from('users')
                        .select('*')
                        .eq('user_id', userId)
                        .single()

                    if (Array.isArray(data) && data.length === 0) {

                        return { message: "Empty modules" }, { status: 500 }


                    } else {

                        const { data } = await supabase
                            .from('profile')
                            .select('*')
                            .eq('user_id', userId)
                            .single()

                        if (Array.isArray(data) && data.length === 0) {

                            return { message: "Empty user", status: 200 }

                        } else {

                            return { message: "User fetched successfully", data };

                        }
                    }

                } catch (error) {

                    return NextResponse.json({ message: error }, { status: 500 });

                }

            }

            const fetch_user = await FetchUser(userId)
            return NextResponse.json(fetch_user, { status: 200 });

        }

    }

}