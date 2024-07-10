"use client"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";
import StudyPlanCards from "../cards/studyPlanCards"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function StudyPlanSecton() {

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#85486e");
    const [planData, setPlanData] = useState(null);

    useEffect(() => {

        fetchStudyPlan();

    }, [])

    const fetchStudyPlan = async () => {
        setLoading(true)

        const user_id = localStorage.getItem('study-userId')

        const url = `/api/studyplans/all?user_id=${user_id}`

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${BearerToken}`
                }
            });
            if (!response.ok) {
                setLoading(false);
                throw new Error('Failed to fetch data');
            } else {
                const data = await response.json();
                setLoading(false);
                setPlanData(data.data)
                //console.log(data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    return (

        <>

            <main style={{ height: "100%" }}>

                <div className="container">

                    <div className='mt-5'>
                        <DotLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>

                    <div className="row row-cols-1 mt-4">
                        {planData && planData.map(plan => (
                            <div className="col mb-3" key={plan.id}>
                                <StudyPlanCards
                                    id={`${plan.plan_id}`}
                                    course_code={`${plan.course_code}`}
                                    course_title={`${plan.course_title}`}
                                    module_count={`${plan.module_count}`}
                                />
                            </div>
                        ))}


                    </div>

                </div>

            </main>

        </>

    )

}