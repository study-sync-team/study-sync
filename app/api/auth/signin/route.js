import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
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

        if (cookieStore.has('sync-session')) {
            return NextResponse.json({ message: "already logged in" }, { status: 200 });
        } else {
            // Ensure required fields exist in the JSON data
            if (!json.email || !json.password) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            const signin_data = {
                email: json.email,
                password: json.password,
            };

            // Checking if the user exists
            const { data, error } = await supabase
                .from('users')
                .select('email, password, user_id')
                .eq('email', signin_data.email)
                .single();

            if (error) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            } else {
                const user = data;

                const hashedPassword = hashPassword(signin_data.password);

                if (hashedPassword === user.password) {
                    const session_id = user.user_id;

                    cookies().set('sync-session', session_id, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 60 * 24 * 7, // One week
                        path: '/',
                    });

                    //check if user session exists
                    const { data, error } = await supabase
                        .from('sessions')
                        .select('user_id')
                        .eq('user_id', user.user_id)
                        .single();

                    if (error) {
                        //create new session
                        const { error } = await supabase
                            .from("sessions")
                            .insert({
                                "session_id": session_id,
                                "user_id": user.user_id,
                                "status": "Active",
                            });
                        if (error) {
                            return NextResponse.json({ message: error }, { status: 500 });
                        } else {
                            return NextResponse.json({ message: "successfully Logged in", data: { user_id: user.user_id } }, { status: 200 });
                        }
                    } else {
                        //update existing session
                        const { data, error } = await supabase
                            .from('sessions')
                            .update({ "session_id": session_id })
                            .eq('user_id', user.user_id)
                            .select();
                        if (error) {
                            return NextResponse.json({ message: error }, { status: 500 });
                        } else {
                            await UpdateUserStatus(user.user_id);
                            return NextResponse.json({ message: "successfully Logged in", data: { user_id: user.user_id } }, { status: 200 });
                        }
                    }

                    async function UpdateUserStatus(user_id) {
                        const { data, error } = await supabase
                            .from('users')
                            .update({ "status": "online" })
                            .eq('user_id', user_id)
                            .select();
                        if (error) {
                            console.log("User status updated");
                        } else {
                            console.log(error);
                        }
                    }
                } else {
                    return NextResponse.json({ message: "Wrong Password" }, { status: 500 });
                }
            }
        }
    }
}
