import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import supabase from "@/app/config/supabase";

export async function POST(req) {

    // Retrieve the headers from the incoming request
    const headersInstance = headers();

    // Extract the 'authorization' header from the request headers
    const authorization = headersInstance.get('authorization');

    // If there is no authorization header, return a 401 response
    if (!authorization) {
        return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }

    // Split the 'authorization' header to separate the Bearer token
    const splited_authorization = authorization.split("Bearer ");

    // Retrieve the Bearer token from the split result
    const bearer_token = splited_authorization[1];

    // Check if the Bearer token matches the expected value from the environment variables
    if (bearer_token === process.env.MASTER_BEARER_KEY) {
        const json = await req.json();

        // Ensure required fields exist in the JSON data
        if (!json.fullname || !json.email || !json.department || !json.uni) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const waitlist_data = {
            fullname: json.fullname,
            email: json.email,
            department: json.department,
            uni: json.uni,
        };

        //checking if the email exists
        const { data } = await supabase
            .from('waitlist')
            .select('*')
            .eq('email', waitlist_data.email);

        if (data.length > 0) {
            return NextResponse.json({ message: "Email already exist" }, { status: 500 });
        } else {

            // Store waitlist data in supabase
            try {
                const { error } = await supabase
                    .from("waitlist")
                    .insert({
                        "fullname": waitlist_data.fullname,
                        "email": waitlist_data.email,
                        "department": waitlist_data.department,
                        "university": waitlist_data.uni,
                    });
                if (error) {
                    return NextResponse.json({ message: error }, { status: 500 });
                } else {
                    return NextResponse.json({ message: "Successfully joined waitlist" }, { status: 201 });
                }
            } catch (error) {
                return NextResponse.json({ message: error.message }, { status: 500 });
            }

        }

    }

}