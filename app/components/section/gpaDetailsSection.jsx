"use client"
import { useState, useEffect } from 'react';
import DotLoader from "react-spinners/DotLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function GpaDetailsSection(props) {

    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#85486e");
    const [coursesData, setCoursesData] = useState([]);
    const [gpa, setGpa] = useState(null)

    useEffect(() => {

        fetchGpa();

    }, [])

    const fetchGpa = async () => {
        setLoading(true)

        const url = `/api/gpa/fetchGpa?gpa_id=${props.gpa_id}`

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
                setGpa(data.data.gpa)
                if (Array.isArray(data.data.courses)) {
                    setCoursesData(data.data.courses);
                } else {
                    console.error('Fetched data.courses is not an array:', data.data.courses);
                }
                console.log(data.data.courses)
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
                    <div className="mt-5">
                        <table className="table table-transparent table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Courses</th>
                                    <th scope="col">Unit</th>
                                    <th >Grade</th>
                                </tr>
                            </thead>

                            <tbody>
                                {coursesData && coursesData.map(courses => (
                                    <tr key={courses.id}>
                                        <td>{courses.course}</td>
                                        <td>{courses.unit}</td>
                                        <td>{courses.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <DotLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>

                    {gpa !== null && (
                        <>

                            <div className='d-flex align-content-center justify-content-center'>
                                <button
                                    className="btn btn-sm px-5 py-2 mt-2"
                                    style={{ fontFamily: "Fredoka, sans-serif", border: "1px solid #DC5489" }}

                                >
                                    Your GPA is <span className='text-success'>{gpa}</span>

                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main >

        </>

    )

}