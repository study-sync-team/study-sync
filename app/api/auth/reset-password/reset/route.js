import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import crypto from 'crypto';
import supabase from "@/app/config/supabase";

// Function to hash passwords
function hashPassword(password) {
    return crypto.createHash('sha256', password).digest('hex');
}

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

    if (!json.password || !json.user_id || !json.code) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reset_password_data = {
        password: json.password,
        user_id: json.user_id,
        code: json.code
    };

    const hash_new_password = hashPassword(reset_password_data.password);

    async function ResetPassword(password, user_id, code) {

        const { data, error } = await supabase
            .from('users')
            .update({ password: password })
            .eq('user_id', user_id)
            .select();

        if (error) {
            return { message: "Could not reset password", status: 500 };
        } else {
            await UpdateVerifyCode(code)
            return { message: "Password has been changed", status: 200 };
        }

    }

    async function UpdateVerifyCode(code) {

        const { data, error } = await supabase
            .from('reset_password')
            .update({ "status": "expired" })
            .eq('code', code)
            .select();
        if (error) {
            console.log("User status updated");
        } else {
            console.log(error);
        }

    }

    const reset_password = await ResetPassword(hash_new_password, reset_password_data.user_id, reset_password_data.code)
    return NextResponse.json({ message: reset_password.message }, { status: reset_password.status })

}