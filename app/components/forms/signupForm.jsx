"use client"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function SignupForm() {

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        ConfirmPassword: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const router = useRouter()

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

        if (formData.password !== formData.ConfirmPassword) {
            toast.error("Passwords do not match", {
                position: "top-right"
            });
        } else {
            const data = new FormData();
            data.append('fullname', formData.fullname);
            data.append('email', formData.email);
            data.append('password', formData.password);
            //console.log(formData)
            // Check if form data exists in localStorage
            const storedData = localStorage.getItem('formData');

            if (storedData) {
                localStorage.removeItem('formData');
                localStorage.setItem('formData', JSON.stringify(formData));
                router.push('/setup')
                setLoading(false)

            } else {
                localStorage.setItem('formData', JSON.stringify(formData));
                setLoading(false)
                router.push('/setup')


            }
        }

    }




    return (

        <>

            <form onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Full Name</label>
                    <input name="fullname" value={formData.fullname} onChange={handleChange} type="text" placeholder="e.g Islamiyat Yusuf" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g Islamiyatyusuf@gmail.com" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required minlength="6" placeholder="e.g Isila25@" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
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

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showConfirmPassword ? "text" : "password"} name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange} required minlength="6" placeholder="e.g Isila25@" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: "18px",
                                color: "#666"
                            }}
                        >
                            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                        </span>
                    </div>
                </div>

                <div className="mt-3 px-3">
                    <p style={{ fontSize: "12px", fontFamily: "Montserrat-SemiBold" }}>
                        By signing up you agreed to StudySync <span style={{ color: "#D9455F" }}>Terms, Privacy Policy,</span> and <span style={{ color: "#D9455F" }}>Cookie Use.</span>
                    </p>
                </div>

                <div className="mt-5 mb-3 d-grid">


                    {loading ? (
                        <>
                            <button disabled type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Loading
                            </button>
                        </>
                    ) :
                        (
                            <>
                                <button type="submit" className="btn btn-block border-0 text-white px-5 pt-2 pb-2" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "18px", fontWeight: '600', background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                    Next
                                </button>
                            </>
                        )
                    }


                </div>
            </form>
            <ToastContainer style={{ wdith: "50px" }} />
        </>

    )

}