"use client"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function NotesSection(props) {

    const [loading, setLoading] = useState(false)
    const [quizLoading, setQuizLoading] = useState(false)
    const [color, setColor] = useState("#85486e");
    const [notesData, setNotesData] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null)

    useEffect(() => {

        fetchNotes();

    }, [])

    const fetchNotes = async () => {
        setLoading(true)

        const url = `/api/studyplans/modules/list?module_id=${props.module_id}`

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
                setNotesData(data.data.note)
                setNoteTitle(data.data.module_title)
                //console.log(data.data.note)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const generateQuiz = async () => {

        setQuizLoading(true)

        const payload = {
            planId: props.plan_id,
            moduleId: props.module_id,
            note: notesData
        }

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

        const response = await fetch('/api/studyplans/quiz/generateQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BearerToken}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            setQuizLoading(false)
            const error_response = await response.json();
            //console.log(error_response.error)
            toast.error(`${error_response.error}`, {
                position: "top-right"
            });
            
        } else {
            setQuizLoading(false)
            const data_response = await response.json();
            toast.success( `${data_response.message}`, {
                position: "top-right"
            });
            //router.push(`/study-plan/modules/${plan_id}`);
            

        }


    };

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
                        <h4 className='mb-4'>{noteTitle}</h4>
                        <p style={{ fontFamily: "Fredoka, sans-serif", whiteSpace: "pre-wrap" }}>{notesData}</p>
                    </div>

                    {loading ?
                        <>

                        </>
                        :
                        <>
                            {quizLoading ?
                                <>
                                    <div className="mt-5 mb-3 d-grid ">
                                        <button disabled onClick={generateQuiz} className="btn btn-block border-0 text-white px-5 py-2 " style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                            Generating Quiz...
                                        </button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mt-5 mb-3 d-grid ">
                                        <button onClick={generateQuiz} className="btn btn-block border-0 text-white px-5 py-2 " style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                            Take Quiz
                                        </button>
                                    </div>
                                </>
                            }

                        </>
                    }



                </div>

            </main>

            <ToastContainer />

        </>

    )

}