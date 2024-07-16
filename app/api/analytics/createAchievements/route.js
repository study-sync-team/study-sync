import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import supabase from "@/app/config/supabase";
import { FaTruckPlane } from "react-icons/fa6";

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
        if (!json.userId || !json.planId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const createAchivementData = {
            user_id: json.userId,
            plan_id: json.planId
        }

        async function UpdateExistiingAchievement(user_id, plan_id) {
            try {
                // Update
                const { data, error } = await supabase
                    .from('achievements')
                    .update({ status: false })
                    .eq('user_id', user_id)
                    .select();
                if (error) {
                    return { message: error, status: 500 };
                } else {

                    return await CreateNewAchievement(user_id, plan_id)

                }
            } catch (error) {
                return { message: error };
            }
        }

        async function CreateNewAchievement(user_id, plan_id) {
            try {
                const { error } = await supabase
                    .from("achievements")
                    .insert({
                        "user_id": user_id,
                        "achievement_id": uuidv4(),
                        "status": true,
                        "plan_id": plan_id,
                    });
                if(error){
                    return { message: error, status: 500 };
                }else{
                    return { message: "Study plan completed!!!🎉" };
                }
            } catch (error) {
                return { message: error };
            }
        }

        const UpdateAchievement = await UpdateExistiingAchievement(createAchivementData.user_id, createAchivementData.plan_id)

        return NextResponse.json(UpdateAchievement, { status: 200 })
    } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

}