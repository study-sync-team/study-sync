"use client"
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import LogoutModal from "../modal/logoutModal";
import { LuGraduationCap } from "react-icons/lu";
import { useState, useEffect } from 'react';
import UpdateProfileModal from "../modal/profileUpdateModal";
import UpdateAccountModal from "../modal/accountUpdateModal";

export default function ProfileSection() {

    const [loading, setLoading] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [allProfileData, setAllProfileData] = useState(null)
    const [allAccountData, setAllAccountData] = useState(null)

    useEffect(() => {

        fetchProfile()
        fetchUser();

    }, [])

    const fetchUser = async () => {

        setLoading(true)

        const user_id = localStorage.getItem('study-userId')

        const url = `/api/user/fetchUser?user_id=${user_id}`

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${BearerToken}`
                }
            });
            if (!response.ok) {
                setLoading(false);
                throw new Error('Failed to fetch data');
            } else {
                const data = await response.json();
                setLoading(false);
                setAllAccountData(data.data)
                setEmail(data.data.email)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }


    }

    const fetchProfile = async () => {
        setProfileLoading(true)

        const user_id = localStorage.getItem('study-userId')

        const url = `/api/user/fetchProfile?user_id=${user_id}`

        const BearerToken = process.env.NEXT_PUBLIC_MASTER_BEARER_KEY;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${BearerToken}`
                }
            });
            if (!response.ok) {
                setProfileLoading(false);
                throw new Error('Failed to fetch data');
            } else {
                const data = await response.json();
                setProfileLoading(false);
                setAllProfileData(data.data)
                setFullname(data.data.fullname)
            }
        } catch (error) {
            setProfileLoading(false)
            console.log(error)
        }
    }

    return (

        <>

            <main style={{ height: "100%" }}>

                <div className="container">
                    <div style={{ textAlign: "center", marginTop: "-55px" }}>

                        <div className="mt-3 mx-auto d-flex justify-content-center align-items-center" style={{ backgroundColor: "white", width: '100px', height: '100px', borderRadius: '50%' }}>
                            <span style={{ fontWeight: "600", fontSize: "14px", fontFamily: "Fredoka, sans-serif" }}>
                                <span style={{ color: "#5d435a", fontSize: "40px" }}><LuGraduationCap /></span>
                            </span>
                        </div>

                    </div>


                    <div className="mt-3" style={{ fontFamily: "Fredoka, sans-serif", textAlign: "center", fontWeight: "normal" }} >
                        <span style={{ fontSize: "19px", fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}>
                            {profileLoading ?
                                <>
                                    ...
                                </>
                                :
                                <>{fullname}</>
                            }
                        </span>
                    </div>

                    <div className="">
                        <p style={{ fontFamily: "Fredoka, sans-serif", textAlign: "center", fontWeight: "normal" }} className="text-muted">
                            {loading ?
                                <>
                                    ...
                                </>
                                :
                                <>{email}</>
                            }
                        </p>
                    </div>
                    {/* <p style={{ fontFamily: "Fredoka, sans-serif", textAlign: "center", fontWeight: "bold" }}>Islamiyyah Yusuf</p>
                    <p style={{ fontFamily: "Fredoka, sans-serif", textAlign: "center", fontWeight: "normal" }} className="text-muted"></p> */}

                </div>

                <div data-bs-toggle="modal" data-bs-target="#profileUpdateModal" className="text-decoration-none card border-0 bg-transparent mt-5" >
                    <div className="pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">

                                    <div className="px-3 py-3 rounded text-white" style={{ backgroundColor: "#5d435a" }}>
                                        <FaRegUserCircle size={20} />
                                    </div>

                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "18px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>Profile</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <span
                                            style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}
                                        >
                                            <div
                                                href="/dashboard"
                                                className="text-decoration-none text-dark bi-chevron-right me-2"
                                                style={{ "-webkit-text-stroke": "1.3px", textStroke: "5px" }}
                                            ></div>

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-bs-toggle="modal" data-bs-target="#accountUpdateModal" className="text-decoration-none card bg-transparent border-0 mt-4" >
                    <div className="pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">

                                    <div className="px-3 py-3 rounded text-white" style={{ backgroundColor: "#5d435a" }}>
                                        <MdManageAccounts size={20} />
                                    </div>

                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "18px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>Account</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <span
                                            style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="text-decoration-none text-dark bi-chevron-right me-2"
                                                style={{ "-webkit-text-stroke": "1.3px", textStroke: "5px" }}
                                            ></Link>

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="" className="text-decoration-none card bg-transparent border-0 mt-4" >
                    <div className="pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">

                                    <div className="px-3 py-3 rounded text-white" style={{ backgroundColor: "#5d435a" }}>
                                        <MdOutlinePayment size={20} />
                                    </div>

                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "18px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>Subscription</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <span
                                            style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="text-decoration-none text-dark bi-chevron-right me-2"
                                                style={{ "-webkit-text-stroke": "1.3px", textStroke: "5px" }}
                                            ></Link>

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="" className="text-decoration-none card bg-transparent border-0 mt-4" >
                    <div className="pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">

                                    <div className="px-3 py-3 rounded text-white" style={{ backgroundColor: "#5d435a" }}>
                                        <RiLockPasswordFill size={20} />
                                    </div>

                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "18px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>Change Password</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <span
                                            style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="text-decoration-none text-dark bi-chevron-right me-2"
                                                style={{ "-webkit-text-stroke": "1.3px", textStroke: "5px" }}
                                            ></Link>

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <div data-bs-toggle="modal" data-bs-target="#logoutModal" className="text-decoration-none card bg-transparent border-0 mt-4" >
                    <div className="pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">

                                    <div className="px-3 py-3 rounded text-white" style={{ backgroundColor: "#5d435a" }}>
                                        <RiLogoutBoxLine size={20} />
                                    </div>

                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "18px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", color: "#333333" }}>Log Out</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <span
                                            style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="text-decoration-none text-dark bi-chevron-right me-2"
                                                style={{ "-webkit-text-stroke": "1.3px", textStroke: "5px" }}
                                            ></Link>

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <LogoutModal />

            <UpdateProfileModal profile_data={allProfileData} />

            <UpdateAccountModal account_data={allAccountData} />

        </>

    )

}