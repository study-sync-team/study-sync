"use client"
import { useState, useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function LoginForm() {

    useEffect(() => {

        checkIfUserIsLoggedIn();

    }, [])

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const cookies = useCookies();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function checkIfUserIsLoggedIn() {
        const userId = localStorage.getItem('study-userId');
        if (userId) {
            router.push('/dashboard');
        } else {
            // The user is not logged in, perform actions as needed
            console.log('User is not logged in');
            return false;
        }

    }


    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();

        const form = new FormData();
        form.append('email', formData.email);
        form.append('password', formData.password);

        const payload = {
            email: formData.email,
            password: formData.password
        }
        //console.log(payload)
        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

        const response = await fetch('/api/auth/signin', {
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
            const data = await response.json();
            setLoading(false)
            toast.success(`${data.message}`, {
                position: "top-right"
            });

            const user_id = data.data.user_id
            localStorage.setItem('study-userId', user_id);
            window.location.href = '/dashboard';


        }

    }

    return (

        <>

            <form onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" class="form-control" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Password</label>
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

                <div className="text-end tetx-muted" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '400' }}>
                    Forgot Password ?
                </div>

                <div className="mt-4 mb-3 d-grid">
                    {loading ? (
                        <>
                            <button disabled type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Loading
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Log in
                            </button>
                        </>
                    )}

                </div>
            </form>

            <ToastContainer />

            {/*}

            {*/}

        </>

    )

}
