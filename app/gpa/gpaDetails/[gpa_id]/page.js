import Header from "@/app/components/header/header"
import GpaDetailsSection from "@/app/components/section/gpaDetailsSection"

export default function Page({ params }) {

    return (

        <>

            <Header title="GPA Calculator" icon="bi-chevron-left" route="/gpa/savedGpa" />

            <GpaDetailsSection gpa_id={params.gpa_id}/>
        </>

    )

}