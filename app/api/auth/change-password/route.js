import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { createHmac } from 'crypto'; // Use crypto for hashing
import supabase from "@/app/config/supabase";

// Function to hash passwords
function hashPassword(password) {
    const hash = createHmac('sha256', process.env.PASSWORD_SALT)
        .update(password)
        .digest('hex');
    return hash;
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

    if (!json.user_id || !json.old_password || !json.new_password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const update_password_data = {
        user_id: json.user_id,
        old_password: json.old_password,
        new_password: json.new_password
    };

    const hash_old_password = hashPassword(update_password_data.old_password);
    const hash_new_password = hashPassword(update_password_data.new_password);

    async function UpdatePassword(old_pass, new_pass, user_id) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('password', old_pass)
                .single();

            if (error) {
                return { message: "Wrong old password", status: 400 };
            } else {
                const { data, error } = await supabase
                    .from('users')
                    .update({ password: new_pass })
                    .eq('user_id', user_id)
                    .select();

                if (error) {
                    return { message: "Could not update password", status: 500 };
                } else {
                    return { message: "Password updated", status: 200 };
                }
            }
        } catch (error) {
            return { message: "Could not update password", status: 500 };
        }
    }

    const update_password = await UpdatePassword(hash_old_password, hash_new_password, update_password_data.user_id);
    return NextResponse.json({ message: update_password.message }, { status: update_password.status });
}
