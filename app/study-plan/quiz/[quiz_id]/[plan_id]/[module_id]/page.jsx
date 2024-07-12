import Header from "@/app/components/header/header";
import QuizSection from "@/app/components/section/quizSection";

export default function Quiz({ params }) {
    return (

        <>

            <Header title="Quiz" icon="bi-chevron-left" route="/study-plan/notes" />

            <QuizSection quiz_id={params.quiz_id} plan_id={params.plan_id} module_id={params.module_id}
            />
        </>

    )

}