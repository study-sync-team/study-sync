"use client"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

export default function SaveGpaModal({ gpa_data }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        level: '',
        semester: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();

        const data = new FormData();
        data.append('level', formData.level);
        data.append('semester', formData.semester);

        const payload = {
            user_id: localStorage.getItem('study-userId'),
            level: formData.level,
            semester: formData.semester,
            courses: gpa_data.courses,
            gpa: gpa_data.gpa,
            total_points: gpa_data.totalPoints,
            total_units: gpa_data.totalUnits
        }

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;
        const response = await fetch('/api/gpa/storeGpa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BearerToken}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const error_response = await response.json();
            //console.log(error_response.error)
            toast.error(`${error_response.message}`, {
                position: "top-right"
            });
            setLoading(false)
        } else {
            const data_response = await response.json();
            toast.success(`${data_response.message}`, {
                position: "top-right"
            });
            setLoading(false)

        }

    }

    return (

        <>

            <div class="modal fade" id="saveGpaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="saveGpaModal">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mb-3">
                            <div className="">
                                <form onSubmit={handleSubmit}>
                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Your Level</label>
                                        <select class="form-select" aria-label="Default select example" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }}
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                        >
                                            <option selected><span style={{ fontFamily: "Fredoka, sans-serif", fontSize: "10px" }}>level</span></option>
                                            <option value="100">100 level</option>
                                            <option value="200">200 level</option>
                                            <option value="300">300 level</option>
                                            <option value="400">400 level</option>
                                        </select>
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Your Semester</label>
                                        <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="E.g 1st semester" class="form-control" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                                    </div>
                                    <div className="d-flex justify-content-center align-content-center">
                                        {loading ?
                                            <>
                                                <button type="submit" disabled className="btn border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Saving...
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button type="submit" className="btn border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Save
                                                </button>
                                            </>
                                        }

                                    </div>

                                </form>
                                {/*}
                                <i className="bi bi-check-circle-fill" style={{ fontSize: "100px", color: "#00A33C" }}></i>
                            {*/}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )

}