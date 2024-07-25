import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import supabase from "@/app/config/supabase";

export async function POST(req) {
    // Retrieve the headers from the incoming request
    const headersInstance = headers();

    // Extract the 'authorization' header from the request headers
    const authorization = headersInstance.get('authorization');

    if (!authorization) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }

    // Split the 'authorization' header to separate the Bearer token
    const splited_authorization = authorization.split("Bearer ");

    if (splited_authorization.length !== 2) {
        return NextResponse.json({ error: 'Invalid authorization format' }, { status: 401 });
    }

    // Retrieve the Bearer token from the split result
    const bearer_token = splited_authorization[1];

    // Check if the Bearer token matches the expected value from the environment variables
    if (bearer_token !== process.env.MASTER_BEARER_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const json = await req.json();

    if (!json.code) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const verify_code_data = {
        code: json.code
    };


    async function verifyCode(code) {

        try {

            const { data } = await supabase
                .from('reset_password')
                .select('*')
                .eq('code', code)
                .single();
            if (data) {
                if (data.status === "active") {
                    return { message: "Authorized", status: 200 }
                } else {
                    return { message: "Not Authorized", status: 500 }
                }
            } else {
                return { message: "Wetin u dey find", status: 500 }
            }

        } catch (error) {
            console.log(error)
        }

    }

    const verify_code = await verifyCode(verify_code_data.code)
    return NextResponse.json({ message: verify_code.message }, {status: verify_code.status})
}