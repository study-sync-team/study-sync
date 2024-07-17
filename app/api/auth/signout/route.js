import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import supabase from "@/app/config/supabase";

export async function POST(req) {
    const cookieStore = cookies();
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
        if (!json.userId) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const logout_data = {
            user_id: json.userId
        }

        async function UpdateUserStatus(user_id) {

            try {

                const { data, error } = await supabase
                    .from('users')
                    .update({ "status": "offline" })
                    .eq('user_id', user_id)
                    .select();
                if(error){
                    return { message: error, status: 500 };
                }else{
                    cookies().delete('sync-session')
                    return { message: "Signed out successfully" };
                }

            } catch (error) {
                return { message: error, status: 500 };
            }

        }

        const update_user = await UpdateUserStatus(logout_data.user_id)
        return NextResponse.json(update_user, {status: 200})

    }

}