"use client"
import { FaExclamationTriangle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ResultSection(props) {

    const [scorePercentage, setScorePercentage] = useState(0);
    const [remainingToFull, setRemainingToFull] = useState(null);
    const [loading, setLoading] = useState(true);
    const [remainingStatus, setRemainingStatus] = useState(false)
    const [resultData, setResultData] = useState(null);
    const [resultLoading, setResultLoading] = useState(false);
    let [color, setColor] = useState("#85486e");


    useEffect(() => {

        calculateScorePercentage();

        fetchResults()

    }, [])

    const calculateScorePercentage = async () => {
        const score = props.score
        const total = props.total

        if (total > 0) {
            let percentage = (score / total) * 100;
            setScorePercentage(percentage);

            if (percentage < 100) {
                setRemainingStatus(true)
                const remaining = 100 - percentage;
                setRemainingToFull(remaining > 0 ? remaining : 0)
            } else {
                setRemainingStatus(false)
            }

        }
        setLoading(false)

    }

    const fetchResults = async () => {
        setResultLoading(true)

        const url = `/api/studyplans/quiz/fetchResults?user_quiz_id=${props.user_quiz_id}`

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
                setResultLoading(false);
                setResultData(data.data)
                console.log(data.data)
            }

        } catch (error) {
            setResultLoading(false);
            console.log(error)
        }

    }

    return (

        <>

            <main style={{ height: "100%" }}>

                <div className="px-3 py-3 " style={{ backgroundColor: "#F1E3EF", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>
                    <div className="d-flex align-content-center justify-content-center mb-2">
                        <span className="me-2"><FaExclamationTriangle className="text-danger" /></span>
                        <span>Try again once you are ready</span>
                    </div>
                    <div className="d-flex align-content-center justify-content-center">
                        {loading ?
                            <><span>Loading</span></>
                            :
                            <>
                                {remainingStatus ?
                                    <>
                                        <span><b>TO PASS</b> {remainingToFull.toFixed(1)} or higher</span>
                                    </>
                                    :
                                    <></>
                                }
                            </>
                        }
                    </div>
                    <div className="d-flex align-content-center justify-content-center">
                        <span><b>GRADE</b></span>
                    </div>
                    {loading ?
                        <>
                            <div className='d-flex align-content-center justify-content-center'>
                                <span>loading</span>
                            </div>
                        </>
                        :
                        <>
                            <div className={`d-flex align-content-center justify-content-center ${scorePercentage < 50 ? "text-danger" : "text-success"
                                }`}>

                                <span><b>{scorePercentage.toFixed(1)} %</b></span>
                            </div>
                        </>
                    }

                </div>

                <div className="container">
                    <div className="mt-4 px-2">
                        <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>
                            Latest grade (we keep your highest score)<br />
                        </div>
                        <div style={{ fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>
                            {loading ?
                                <>
                                    Loading
                                </>
                                :
                                <>
                                    <b>{scorePercentage.toFixed(1)}%</b>
                                </>
                            }

                        </div>

                        <DotLoader
                            color={color}
                            loading={resultLoading}
                            cssOverride={override}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <div className="row row-cols-1 mt-4">
                            {resultData && resultData.map(result => (
                                <>
                                    <div className="col mb-3" key={result.id}>
                                        <div className="text-decoration-none card bg-transparent" style={{ border: "1px solid #E0D9DE" }}>
                                            <div className="card-body ">
                                                <h6 style={{ fontFamily: "Fredoka, sans-serif", fontWeight: '400', color: "#333333" }}>QUESTION </h6>
                                                <p className="card-text" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 500 }}>{result.question}?</p>
                                                <div className="d-flex align-content-center justify-content-center">
                                                    <div class="hstack gap-3 mb-4">
                                                        <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href={`#selected${result.id}`} role="button" aria-expanded="false" aria-controls={`selected${result.id}`}>selected answer</button>
                                                        <div class="vr"></div>
                                                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="collapse" href={`#correct${result.id}`} role="button" aria-expanded="false" aria-controls={`correct${result.id}`}>Correct answer</button>
                                                    </div>

                                                </div>
                                                <div class="collapse mb-4" id={`selected${result.id}`}>
                                                    <div class="card">
                                                        <div className="card-header">
                                                            <span className="text-muted">
                                                                Selected Answer
                                                            </span>
                                                        </div>
                                                        <div className="card-body">
                                                            {result.selected_option}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="collapse mb-4" id={`correct${result.id}`}>
                                                    <div class="card">
                                                        <div className="card-header">
                                                            <span className="text-muted">
                                                                Correct Answer
                                                            </span>
                                                        </div>
                                                        <div className="card-body text-success">
                                                            {result.correct_option}
                                                        </div>

                                                    </div>
                                                </div>

                                                {result.status === "true" || result.status === true ? (
                                                    <div className="alert alert-success text-success border-0" style={{ backgroundColor: "#F1E3EF", fontFamily: "Fredoka, sans-serif", fontWeight: "500" }}>

                                                        <FaRegCheckCircle className="me-1" size={20} /> Correct
                                                    </div>
                                                ) : (
                                                    <div className="alert alert-danger text-danger border-0" style={{ backgroundColor: "#F1E3EF", fontFamily: "Fredoka, sans-serif", fontWeight: "500" }}>
                                                        <IoIosCloseCircleOutline className="me-1" size={20} /> Incorrect
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </>
                            ))}
                        </div>

                        {resultLoading ?
                            <>

                            </>
                            :
                            <>
                                <div class="d-flex justify-content-between mb-3">
                                    <Link href={`/study-plan/quiz/${props.quiz_id}/${props.plan_id}/${props.plan_id}`} className="btn ps-4" style={{ fontFamily: "Fredoka, sans-serif", color: "#CD598F", fontWeight: "600" }}>
                                        Try again
                                    </Link>

                                    <Link href={`/study-plan/modules/${props.plan_id}`} className="btn border-0 text-white px-5" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                        Next
                                    </Link>

                                </div>
                            </>
                        }


                    </div>
                </div>

            </main>

        </>

    )

}