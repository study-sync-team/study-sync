"use client"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";
import StudyPlanCards from "../cards/studyPlanCards"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function StudyPlanSecton() {

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#85486e");
    const [planData, setPlanData] = useState([]);

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
                setPlanData(data.data || []); // Ensure planData is an array
                //console.log(data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const deleteStudyPlan = async (planId) => {
        setPlanData(prevPlanData => prevPlanData.filter(plan => plan.plan_id !== planId));

        const url = `/api/delete?plan_id=${planId}`

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${BearerToken}`
                }
            });
            if (!response.ok) {
                const error_response = await response.json();
                toast.error(`${error_response.error}`, {
                    position: "top-right"
                });
                throw new Error('Failed to fetch data');
            } else {
                fetchStudyPlan()

            }
        } catch (error) {
            setLoading(false)
            const error_response = await response.json();
            toast.error(`${error_response.error}`, {
                position: "top-right"
            });
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
                        {planData.length === 0 ? (
                            <>
                                <div className='d-flex justify-content-center align-content-center'>
                                    <img className='img-fluid' src="/empty.svg" width={250}/>
                                </div>
                            </>
                        ) : (
                            planData.map(plan => (
                                <div className="col mb-3" key={plan.id}>
                                    <StudyPlanCards
                                        id={`${plan.plan_id}`}
                                        course_code={`${plan.course_code}`}
                                        course_title={`${plan.course_title}`}
                                        module_count={`${plan.module_count}`}
                                        onClick={() => deleteStudyPlan(plan.plan_id)}
                                    />
                                </div>
                            ))
                        )}

                    </div>

                </div>

            </main>

            <ToastContainer />

        </>

    )

}