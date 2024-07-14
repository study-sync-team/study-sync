import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import supabase from "@/app/config/supabase";
import { v4 as uuidv4 } from 'uuid';

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
        if (!json.user_id || !json.level || !json.semester || !json.courses || !json.gpa || !json.total_points || !json.total_units) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const gpa_data = {
            user_id: json.user_id,
            level: json.level,
            semester: json.semester,
            courses: json.courses,
            gpa: json.gpa,
            total_points: json.total_points,
            total_units: json.total_units
        }

        const { error } = await supabase
            .from("gpa")
            .insert({
                "user_id": gpa_data.user_id,
                "gpa_id": uuidv4(),
                "level": gpa_data.level,
                "semester": gpa_data.semester,
                "courses": gpa_data.courses,
                "gpa": gpa_data.gpa,
                "total_points": gpa_data.total_points,
                "total_units": gpa_data.total_units
            });
        if (error) {
            return NextResponse.json({ message: error }, { status: 500 });
        } else {
            return NextResponse.json({ message: "Gpa saved sucessfully" }, { status: 200 }); 
        }


    }

}