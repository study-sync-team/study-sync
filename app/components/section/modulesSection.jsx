"use client"
import { useState, useEffect } from 'react';
import ModulesPlanCards from "../cards/modulesPlanCards"
import DotLoader from "react-spinners/DotLoader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ModulesSection(props) {

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#85486e");
    const [modulesData, setModulesData] = useState([]);
    const [createAchievementLeading, setCreateAchievementLoading] = useState(false)

    useEffect(() => {

        fetchModules();

    }, [])

    const fetchModules = async () => {
        setLoading(true)

        const url = `/api/studyplans/modules/list?plan_id=${props.plan_id}`

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
                setModulesData(data.modules || [])
                //console.log(data.modules)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const createAchievements = async () => {

        setCreateAchievementLoading(true)

        const payload = {
            userId: localStorage.getItem('study-userId'),
            planId: props.plan_id,
        }

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

        const response = await fetch('/api/analytics/createAchievements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BearerToken}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            setCreateAchievementLoading(false)
            const error_response = await response.json();
            //console.log(error_response.error)
            toast.error(`${error_response.message}`, {
                position: "top-right"
            });

        } else {
            setCreateAchievementLoading(false)
            const data_response = await response.json();
            toast.success(`${data_response.message}`, {
                position: "top-right"
            });


        }

    }


    return (

        <>

            <main style={{ height: "100%" }}>

                <div className="container">
                    <div className="mt-4 px-2">

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

                        <div className="row row-cols-1 mt-4 mb-5">
                            {modulesData.length === 0 ? (
                                <>
                                    <div className='d-flex justify-content-center align-content-center'>
                                        <img className='img-fluid' src="/empty.svg" width={250}/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {modulesData && modulesData.map(module => (
                                        <div className="col mb-3" key={module.id}>
                                            <ModulesPlanCards plan_id={`${props.plan_id}`} module_id={`${module.module_id}`} module_title={`${module.module_title}`} />
                                        </div>
                                    ))}
                                    {loading ?

                                        <p></p>
                                        :
                                        <>
                                            {createAchievementLeading ?
                                                <>
                                                    <button disabled type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                        Finishing...
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button onClick={createAchievements} type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                        Finish
                                                    </button>
                                                </>
                                            }

                                        </>

                                    }
                                </>

                            )}

                        </div>


                    </div>
                </div>

            </main>
            <ToastContainer />

        </>

    )

}
