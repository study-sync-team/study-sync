"use client"
import { useState } from 'react';
import GpaTable from "../table/gpaTable";
import Link from "next/link";

export default function GpaCalculatorSection() {
    const [numCourses, setNumCourses] = useState(4);
    const [gpaData, setGpaData] = useState(null);

    const handleNumCoursesChange = (newNum) => {
        setNumCourses(newNum);
    };

    const handleGpaCalculate = (data) => {
        setGpaData(data);
        console.log(gpaData)
    };

    return (
        <>
            <main style={{ height: "100%" }}>
                <div className="container">
                    <div className="mt-2 d-flex justify-content-center align-content-center" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "400", fontSize: "17px" }}>
                        <p className="m-0">Total no of Courses</p>
                    </div>
                    <div className="m-0 mb-5 d-flex justify-content-center align-content-center" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "400", fontSize: "17px" }}>
                        <div className="dropdown">
                            <button className="d-flex justify-content-center m-0 btn btn-outline-dark px-5 border-2" style={{ borderColor: "#CCBFCA", color: "#9EA3AE" }} data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="ms-3 me-2">{numCourses}</span>
                                <span className="ms-3 me-3"><i className="bi bi-caret-down-fill"></i></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => handleNumCoursesChange(8)}>8</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleNumCoursesChange(16)}>16</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => handleNumCoursesChange(32)}>32</a></li>
                            </ul>
                        </div>
                    </div>
                    <GpaTable numCourses={numCourses} onCalculate={handleGpaCalculate}/>
                    
                    <div className="mt-5 mb-3 d-grid">
                        <button className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }} data-bs-toggle="modal" data-bs-target="#saveGpaModal">
                            Save
                        </button>
                        <Link href="/gpa/savedGpa" className="btn btn-block px-5 py-2 mt-2 mb-3" style={{ fontFamily: "Fredoka, sans-serif", border: "1px solid #DC5489" }}>
                            View Saved GPAs
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
