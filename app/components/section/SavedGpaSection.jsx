"use client"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";
import SavedGpaCard from "../cards/savedGpaCard"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function SavedGpaSection() {

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#85486e");
    const [gpaData, setGpaData] = useState(null);

    useEffect(() => {

        fetchGpa();

    }, [])

    const fetchGpa = async () => {
        setLoading(true)

        const user_id = localStorage.getItem('study-userId')

        const url = `/api/gpa/fetchGpa?user_id=${user_id}`

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
                setGpaData(data.data)

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
                        {gpaData && gpaData.map(gpa => (
                            <div className="col mb-3" key={gpa.id}>
                                <SavedGpaCard
                                    semester={gpa.semester}
                                    level={gpa.level}
                                    gpa_id={gpa.gpa_id}
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </main>

        </>

    )

}