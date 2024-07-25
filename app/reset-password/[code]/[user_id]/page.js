import ResetPasswordSection from "@/app/components/section/resetPasswordSection"

export default function Page({ params }){

    return (

        <>

            <ResetPasswordSection code={params.code} user_id={params.code}/>

        </>

    )

}