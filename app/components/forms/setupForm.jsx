"use client"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function SetupForm() {

    const [loading, setLoading] = useState(false)

    const [additionalData, setAdditionalData] = useState({
        country: '',
        gender: '',
        institution: '',
        gradePoint: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdditionalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const router = useRouter()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(additionalData)

        // Retrieve existing form data from localStorage
        const existingFormData = JSON.parse(localStorage.getItem('formData')) || {};

        // Merge the additional data with the existing form data
        const updatedFormData = { ...existingFormData, ...additionalData };
        // Save the updated form data back to localStorage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));

        const payload = {
            fullname: updatedFormData.fullname,
            email: updatedFormData.email,
            password: updatedFormData.password,
            country: updatedFormData.country,
            gender: updatedFormData.gender,
            institution: updatedFormData.institution,
            gradePoint: updatedFormData.gradePoint
        }

        //console.log(payload)

        try {

            const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BearerToken}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const error_response = await response.json();
                toast.error(`${error_response.message}`, {
                    position: "top-right"
                });
                setLoading(false)
            } else {
                setLoading(false)
                const data = await response.json();
                toast.success(`${data.message}`, {
                    position: "top-right"
                });
                router.push('/setup/confirm-mail');
                console.log(data)
            }

        } catch (error) {
            setLoading(false)
            const error_response = await response.json();
            toast.error(`${error_response.message}`, {
                position: "top-right"
            });
            console.log(error)
        }

    };


    return (

        <>


            <form onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Country</label>
                    <input name="country" value={additionalData.country} onChange={handleChange} type="text" placeholder="e.g Nigeria" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                    
                </div>



                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Gender</label>
                    <select class="form-select" aria-label="Default select example" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }}
                        name="gender"
                        value={additionalData.gender}
                        onChange={handleChange}
                    >
                        <option selected><span style={{ fontFamily: "Fredoka, sans-serif", fontSize: "10px" }}>e.g Female</span></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Name Of Institution</label>
                    <input name="institution" value={additionalData.institution} onChange={handleChange} type="text" placeholder="Olabisi blah blah blah" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>University Grade Point</label>
                    <select class="form-select" aria-label="Default select example" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }}
                        name="gradePoint"
                        value={additionalData.gradePoint}
                        onChange={handleChange}
                    >
                        <option selected><span style={{ fontFamily: "Fredoka, sans-serif", fontSize: "10px" }}>e.g 5.0, 7.0</span></option>
                        <option value="4.0">4.0</option>
                        <option value="5.0">5.0</option>
                        <option value="7.0">7.0</option>
                    </select>
                </div>
                <div className="mt-5 mb-3 d-grid">
                    {loading ? (
                        <>
                            <button disabled type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Loading
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Sign Up
                            </button>
                        </>
                    )}

                </div>
            </form>
            <ToastContainer />
            {/*}
                <div className="mt-5 mb-3 d-grid">
                    {loading ? (
                        <>
                            <button disabled type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Loading
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Sign Up
                            </button>
                        </>
                    )}
                    
                </div>
                {*/}
        </>

    )

}