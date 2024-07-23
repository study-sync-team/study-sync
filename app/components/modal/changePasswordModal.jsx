"use client"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdManageAccounts } from "react-icons/md";


export default function ChangePasswordModal() {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdatePassword = async (e) => {
        setLoading(true)
        e.preventDefault();
        //localStorage.getItem('study-userId')
        const data = new FormData();
        data.append('old_password', formData.old_password);
        data.append('new_password', formData.new_password);

        const payload = {
            user_id: localStorage.getItem('study-userId'),
            old_password: formData.old_password,
            new_password: formData.new_password,
        }

        try {

            const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

            const update_response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BearerToken}`
                },
                body: JSON.stringify(payload)
            });
            if (!update_response.ok) {
                const error_response = await update_response.json();
                toast.error(`${error_response.message}`, {
                    position: "top-right"
                });
                setLoading(false)
            } else {
                const signout_payload = {
                    userId: localStorage.getItem('study-userId')
                }
                const response = await fetch('/api/auth/signout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${BearerToken}`
                    },
                    body: JSON.stringify(signout_payload)
                });
                if (!response.ok) {
                    const error_response = await update_response.json();
                    toast.error(`${error_response.message}`, {
                        position: "top-right"
                    });
                    setLoading(false)
                } else {
                    setLoading(false)
                    const success = await update_response.json();
                    toast.success(`${success.message}`, {
                        position: "top-right"
                    });
                    window.location.href = '/signin';
                }
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

            <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="changePasswordModal">

                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body mb-3">
                            <div className="">
                                <div className="modal-header">
                                    <h1 class="modal-title fs-5" id="accountUpdateModal"><MdManageAccounts size={20} /> Update Password</h1>
                                </div>

                                <form onSubmit={handleUpdatePassword}>
                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Current Password</label>
                                        <input type="text" name="old_password" value={formData.old_password} onChange={handleChange} required minlength="6" placeholder="Type in current password" class="form-control" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>New Password</label>
                                        <input type="text" name="new_password" value={formData.new_password} onChange={handleChange} required minlength="6" placeholder="Type in your new password" class="form-control" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center">
                                        {loading ?
                                            <>
                                                <button disabled type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Updating...
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                                    Update password
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