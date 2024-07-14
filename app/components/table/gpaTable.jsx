"use client"
import { useState, useEffect } from 'react';
import SaveGpaModal from '../modal/saveGpaModal';

export default function GpaTable({ numCourses, onCalculate }) {
    const [courses, setCourses] = useState([]);
    const [gpa, setGpa] = useState(null);
    const [gpaPayload, setGpaPayload] = useState()

    useEffect(() => {
        const initialCourses = Array.from({ length: numCourses }, (_, index) => ({
            id: index,
            course: "",
            unit: "",
            grade: "",
        }));
        setCourses(initialCourses);
    }, [numCourses]);

    const handleRemoveCourse = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };

    const calculateGpa = () => {
        let totalUnits = 0;
        let totalPoints = 0;

        courses.forEach((course) => {
            const units = parseFloat(course.unit);
            const gradePoints = getGradePoints(course.grade);

            if (!isNaN(units) && !isNaN(gradePoints)) {
                totalUnits += units;
                totalPoints += units * gradePoints;
            }
        });

        const calculatedGpa = totalUnits > 0 ? totalPoints / totalUnits : 0.0;
        setGpa(calculatedGpa.toFixed(2));

        const gpaData = {
            courses,
            totalUnits,
            totalPoints,
            gpa: calculatedGpa.toFixed(2),
        };  

        //console.log(gpaData)
        setGpaPayload(gpaData)

        if (onCalculate) {
            onCalculate(gpaData);
        }
    };

    const getGradePoints = (grade) => {
        switch (grade.toUpperCase()) {
            case 'A':
                return 5.0;
            case 'B':
                return 4.0;
            case 'C':
                return 3.0;
            case 'D':
                return 2.0;
            case 'E':
                return 1.0;
            case 'F':
                return 0.0;
            default:
                return NaN;
        }
    };

    return (
        <>
            <table className="table table-transparent table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Courses</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    placeholder="Course..."
                                    value={course.course}
                                    onChange={(e) => {
                                        const updatedCourses = courses.map((c) =>
                                            c.id === course.id ? { ...c, course: e.target.value } : c
                                        );
                                        setCourses(updatedCourses);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    placeholder="Unit"
                                    value={course.unit}
                                    onChange={(e) => {
                                        const updatedCourses = courses.map((c) =>
                                            c.id === course.id ? { ...c, unit: e.target.value } : c
                                        );
                                        setCourses(updatedCourses);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    placeholder="A, B..."
                                    value={course.grade}
                                    onChange={(e) => {
                                        const updatedCourses = courses.map((c) =>
                                            c.id === course.id ? { ...c, grade: e.target.value } : c
                                        );
                                        setCourses(updatedCourses);
                                    }}
                                />
                            </td>
                            <td>
                                <i
                                    className="bi bi-x-circle ms-3"
                                    onClick={() => handleRemoveCourse(course.id)}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='d-flex align-content-center justify-content-center'>
                <button
                    className="btn btn-sm px-5 py-2 mt-2"
                    style={{ fontFamily: "Fredoka, sans-serif", border: "1px solid #DC5489" }}
                    onClick={calculateGpa}
                >
                    Calculate
                </button>
            </div>


            {gpa !== null && (
                <div className="text-center mt-4" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500" }}>
                    <p>Your GPA is <span className='text-success'>{gpa}</span></p>
                </div>
            )}

            <SaveGpaModal gpa_data={gpaPayload}/>
        </>
    );
}
