import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import supabase from "@/app/config/supabase";

export async function DELETE(req) {

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
        const planId = searchParams.get('plan_id');

        if (!planId || planId.trim() === "") {
            return NextResponse.json({ message: "Empty query" }, { status: 500 });
        } else {

            async function DeleteStudyPlan(plan_id) {

                try {

                    const { error } = await supabase
                        .from('study_plan')
                        .delete()
                        .eq('plan_id', plan_id)
                    if(error){
                        return { message: error, status: 500 };
                    }else{
                        return await DeleteAllStudyModules(plan_id)
                    }

                } catch (error) {
                    return { message: error };
                }

            }

            async function DeleteAllStudyModules(plan_id){

                try {

                    const { error } = await supabase
                        .from('study_plan_modules')
                        .delete()
                        .eq('plan_id', plan_id)
                    if(error){
                        return { message: error, status: 500 };
                    }else{
                        return { message: "Study plan and modules deleted" };
                    }

                } catch (error) {
                    return { message: error };
                }

            }

            const deleteResult = await DeleteStudyPlan(planId)
            return NextResponse.json(deleteResult, { status: 200 })

        }

    } else {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

}   