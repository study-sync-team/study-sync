"use client"
import { useState, useEffect } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu";
import DotLoader from "react-spinners/DotLoader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ResetPasswordForm(props) {

    useEffect(() => {

        verifyCode();

    }, [])

    const [loading, setLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [verifyStatus, setVerifyStatus] = useState(false)
    const [color, setColor] = useState("#85486e");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //const encoded_code = btoa(randomCode.toString())

    async function verifyCode() {
        setVerifyLoading(true)

        const code = props.code

        try {

            const payload = {
                code: code
            }
            const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

            const response = await fetch('/api/auth/reset-password/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BearerToken}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                setVerifyLoading(false)
                setVerifyStatus(false)
                const error_response = await response.json();
                toast.error(`${error_response.message}`, {
                    position: "top-right"
                });
            } else {
                const data = await response.json();
                setVerifyStatus(true)
                setVerifyLoading(false)
                toast.success(`${data.message}`, {
                    position: "top-right"
                });
            }

        } catch (error) {
            setVerifyStatus(false)
            setVerifyLoading(false)
            toast.error("Error", {
                position: "top-right"
            });

        }

    }

    const handleReset = async (e) => {

        setLoading(true)
        e.preventDefault();

    }

    return (

        <>

            <form onSubmit={handleReset}>

                <DotLoader
                    color={color}
                    loading={verifyLoading}
                    cssOverride={override}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                {verifyLoading ?
                    <>

                    </>
                    :
                    <>
                        {verifyStatus ?

                            <>
                                <div class="mb-4">
                                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Enter new password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" class="form-control" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px", paddingRight: "100px" }} required />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                fontSize: "18px",
                                                color: "#666"
                                            }}
                                        >
                                            {showPassword ? <LuEyeOff /> : <LuEye />}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 mb-3 d-grid">

                                    <button type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                        Reset Password
                                    </button>

                                </div>
                            </>
                            :
                            <>
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error with request!</strong> Your reset password code has expired.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </>

                        }

                    </>
                }

            </form>

            <ToastContainer />
        </>

    )

}