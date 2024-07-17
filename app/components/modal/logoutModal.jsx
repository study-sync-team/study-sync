"use client"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

export default function LogoutModal() {

    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        //localStorage.removeItem('study-userId')
        //window.location.href = '/signin'; // Change this to the URL you want to navigate to

        const payload = {
            userId: localStorage.getItem('study-userId')
        }
        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

        const response = await fetch('/api/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BearerToken}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            setLoading(false)
            const error_response = await response.json();
            toast.error(`${error_response.message}`, {
                position: "top-right"
            });

        } else {
            setLoading(false)
            localStorage.removeItem('study-userId')
            const data_response = await response.json();
            toast.success(`${data_response.message}`, {
                position: "top-right"
            });
            window.location.href = '/signin';
        }
    }

    return (

        <>

            <div class="modal fade" id="logoutModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="logoutModal">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mb-3 ">

                            <p className="text-center" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "23px" }}>Are you sure you wanna logout</p>
                            <div className="d-flex justify-content-center align-content-center">
                                <div class="hstack gap-3">
                                    <button class="btn px-4" style={{ border: "1px solid #E84D88", fontFamily: "Fredoka, sans-serif" }} data-bs-dismiss="modal" aria-label="Close">No</button>
                                    {loading ?
                                        <>
                                        <button disabled class="btn px-4 text-light" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>chill...</button>
                                        </>
                                        :
                                        <>
                                            <button class="btn px-4 text-light" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }} onClick={logout}>Yes</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )

}