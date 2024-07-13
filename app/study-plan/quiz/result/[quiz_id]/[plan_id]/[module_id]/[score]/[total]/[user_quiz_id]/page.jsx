import Header from "@/app/components/header/header"
import ResultSection from "@/app/components/section/resultSection"

export default function Results({params}){

    return (

        <>

           

                <Header title="Results" icon="bi-chevron-left" route={`/study-plan/quiz/${params.quiz_id}/${params.plan_id}/${params.plan_id}`} />

                <ResultSection 
                    quiz_id={params.quiz_id} 
                    plan_id={params.plan_id}
                    module_id={params.module_id}
                    score={params.score}
                    total={params.total}
                    user_quiz_id={params.user_quiz_id}
                />
           

        </>

    )

}