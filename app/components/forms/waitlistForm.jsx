"use client"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

export default function WaitlistForm() {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        department: '',
        uni: '',
    });

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

        const data = new FormData();
        data.append('fullname', formData.fullname);
        data.append('email', formData.email);
        data.append('department', formData.department);
        data.append('uni', formData.uni);

        console.log(formData)

        const payload = {
            fullname: formData.fullname,
            email: formData.email,
            department: formData.department,
            uni: formData.uni
        }

        try {
            const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;

            const response = await fetch('/api/auth/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BearerToken}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                console.log(error)
                toast.error("Error try again", {
                    position: "top-right"
                });
                setLoading(false)
            } else {
                //const data = await response.json();
                toast.success("Joined waitlist successfully", {
                    position: "top-right"
                });
                router.push('/signup/waitlist/success');
                setLoading(false)
                //console.log(data)
            }

        } catch (error) {
            setLoading(false)
            toast.error("Error, try again", {
                position: "top-right"
            });
            console.log(error)
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
                    <input type="email" value={formData.email} onChange={handleChange} name="email" placeholder="e.g Islamiyatyusuf@gmail.com" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Department</label>
                    <input type="text" value={formData.department} onChange={handleChange} name="department" placeholder="e.g Anatomy" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div class="mb-4">
                    <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Univeristy</label>
                    <input type="text" value={formData.uni} onChange={handleChange} name="uni" placeholder="e.g OOU" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                </div>

                <div className="mt-5 mb-3 d-grid">
                    {loading ? (
                        <>
                            <button disabled type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Joining
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                Join waitlist
                            </button>
                        </>
                    )}

                </div>
            </form>

            <ToastContainer />

        </>

    )

}