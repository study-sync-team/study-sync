"use client"
import CreateStudyPlanCard from "../cards/createStudyPlanCard"
import CalculateGpaCard from "../cards/calculateGPAcard"
//import CreatAiQuizCard from "../cards/createAiquizCard"
//import CalculateCGPACard from "../cards/calculateCGPACard"
import AnalyticsCard from "../cards/analyticsCard"
//import BlogPost from "../cards/blogPostCard"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";
import supabase from "@/app/config/supabase";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Dashboard() {

    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("#85486e");
    const [plansData, setPlansData] = useState(null);
    const [nameLoading, setNameLoading] = useState(false)
    const [name, setName] = useState(null)

    useEffect(() => {

        fetchFullname();
        fetchActivePlans();

    }, [])

    const fetchActivePlans = async () => {
        setLoading(true)

        const user_id = localStorage.getItem('study-userId')

        const url = `/api/analytics/activeStudyplans?user_id=${user_id}`

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
                setPlansData(data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const fetchFullname = async () => {
        setNameLoading(true)
        const user_id = localStorage.getItem('study-userId')

        try {
            const { data, error } = await supabase
                .from('profile')
                .select('fullname')
                .eq('user_id', user_id)
                .single();

            if (error) {
                setNameLoading(false)
                console.log(error)
            } else {
                setNameLoading(false)
                setName(data.fullname)
                //console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <>
            <main style={{ height: "100%" }}>
                <div className="container px-3 mt-2">
                    <header>
                        {nameLoading ?
                            <>

                            </>
                            :
                            <>
                                <p className="d-inline-block text-truncate" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", fontSize: "17px", maxWidth: "180px" }} >Hi, {name} </p>
                            </>
                        }
                        <p className="d-flex" style={{ fontFamily: "Fredoka, sans-serif", }}>
                            <span className="me-4">Welcome</span>
                            <span>
                                <img src="welcome.png" />
                            </span>
                        </p>
                    </header>

                    <div className="row">
                        <div className="col m-0 p-1">
                            <CreateStudyPlanCard />
                        </div>
                        <div className="col m-0 p-1">
                            <CalculateGpaCard />
                        </div>
                    </div>

                    {/*}
                    <div className="row">
                        <div className="col m-0 p-1">
                            <CreatAiQuizCard />
                        </div>
                        <div className="col m-0 p-1">
                            <CalculateCGPACard />
                        </div>
                    </div>
                    {*/}

                    <div className="row mt-2">

                        <div className="col p-1" style={{ maxHeight: "100%" }}>
                            <AnalyticsCard />
                        </div>

                        {/*}
                        <div className="col p-1">
                            
                            <BlogPost />
                           
                        </div>
                         {*/}
                    </div>

                    <div className="mt-3">
                        <p className="d-flex" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", fontSize: "17px" }}>
                            <span><i className="bi bi-journal-text me-2" /></span>
                            <span>Daily Update</span>
                        </p>

                        <div className="daily-update-container">
                            <DotLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={100}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            {plansData && plansData.map(plan => (
                                <div className="mt-2 px-2 mb-4">
                                    <div className="d-flex justify-content-between">
                                        <p className="d-flex">
                                            <span className="me-2"><i className="bi bi-view-list" /></span>
                                            <span className="d-inline-block text-truncate" style={{ fontFamily: "Fredoka, sans-serif", maxWidth: "170px" }}>{plan.course_title}</span>
                                        </p>
                                        <p style={{ fontFamily: "Fredoka, sans-serif" }}>
                                            {plan.progress}/100%
                                        </p>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ "height": "5px" }}>
                                        <div class="progress-bar" style={{ "width": `${plan.progress}%`, backgroundColor: "#D9455F" }}></div>
                                    </div>

                                </div>
                            ))}

                        </div>

                        <hr />



                        <p className="d-flex mt-4" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", fontSize: "17px" }}>
                            <span><i className="bi bi-award me-2" /></span>
                            <span>Daily Acheivement</span>
                        </p>

                        <div className="mt-2 mb-2">
                            <div className="card border-0 bg-transparent p-0" >
                                <div className="card-body">
                                    <div className="d-flex justify-content-center align-content-center">
                                        <img src="medal.png" />
                                    </div>
                                    <span className="text-center mt-2 d-flex align-content-center justify-content-center" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", fontSize: "17px" }}>
                                        Congrats, Isila !
                                    </span>
                                    <p className="pt-2 text-center" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "15px", color: "#333333" }}>You just completed your weekly module quiz</p>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </>

    )

}