"use client"
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordModal() {

    const [loading, setLoading] = useState(false)
    const [mailSuccess, setMailSuccess] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendMail = async (e) => {
        setLoading(true)
        e.preventDefault();

        const payload = {
            email: formData.email
        }

        try {

            const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

            const response = await fetch('/api/auth/reset-password/send-reset-mail', {
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
                setMailSuccess(true)
                const succeess_response = await response.json();
                toast.success(`${succeess_response.message}`, {
                    position: "top-right"
                });

            }

        } catch (error) {

            const error_response = await response.json();
            toast.error(`${error_response.message}`, {
                position: "top-right"
            });
            setLoading(false)

        }

    }

    return (
        <>

            <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="forgotPasswordModal">

                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body mb-3">
                            <div className="">
                                <div className="modal-header">
                                    <h1 class="modal-title fs-5" id="forgotPasswordModal"><RiLockPasswordFill size={20} /> Forgot password</h1>
                                </div>

                                {mailSuccess ?

                                    <>
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong>Reset password email sent.</strong> Check, It might be in your spam folder.
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    </>
                                    :
                                    <></>

                                }

                                <form onSubmit={sendMail}>
                                    <div class="mt-3 mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Enter your email on study sync"
                                            class="form-control"
                                            style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }}
                                            required
                                        />

                                    </div>

                                    <div className="d-flex justify-content-center align-items-center">
                                        {loading ?
                                            <>
                                                <button disabled type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Sending....
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Send reset mail
                                                </button>
                                            </>
                                        }

                                    </div>

                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <ToastContainer />

        </>
    )

}