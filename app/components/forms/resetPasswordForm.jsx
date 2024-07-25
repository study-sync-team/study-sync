"use client"
import { useState, useEffect } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu";


export default function ResetPasswordForm() {

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

    return (

        <>

            <form>

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

            </form>

        </>

    )

}