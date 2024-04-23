import Link from "next/link"

export default function SignUpSection() {

    return (

        <>

            <main style={{ height: "100%" }}>
                <div className="d-flex align-content-center justify-content-center">
                    <h1 className="mt-3">
                        <img src="/logo.png" alt="Logo" width={150} />
                    </h1>
                </div>

                <div className="container">
                    <div className="d-flex ps-3 mt-4">
                        <span className="me-3">
                            <Link href="/onboard2" className="bi bi-chevron-left" style={{ fontSize: "20px", color: "#D9455F" }}></Link>
                        </span>
                        <span style={{ fontSize: "20px", fontFamily: "Montserrat-SemiBold" }}>Create Account</span>
                    </div>
                    <div className="px-4">
                        <div class="progress mt-3" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ "height": "5px" }}>
                            <div class="progress-bar" style={{ "width": "50%", backgroundColor: "#D9455F" }}></div>
                        </div>
                    </div>

                    <div className="mt-4 px-2">
                        <form>
                            <div class="mb-4">
                                <label class="form-label" style={{ fontSize: "15px", fontFamily: "Montserrat-SemiBold" }}>Full Name</label>
                                <input type="text" placeholder="e.g Islamiyat Yusuf" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "55px", borderRadius: "10px" }} />
                            </div>

                            <div class="mb-4">
                                <label class="form-label" style={{ fontSize: "15px", fontFamily: "Montserrat-SemiBold" }}>Email Address</label>
                                <input type="text" placeholder="e.g Islamiyatyusuf@gmail.com" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "55px", borderRadius: "10px" }} />
                            </div>

                            <div class="mb-4">
                                <label class="form-label" style={{ fontSize: "15px", fontFamily: "Montserrat-SemiBold" }}>Password</label>
                                <input type="password" placeholder="e.g Isila25@" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "55px", borderRadius: "10px" }} />
                            </div>

                            <div class="mb-4">
                                <label class="form-label" style={{ fontSize: "15px", fontFamily: "Montserrat-SemiBold" }}>Confirm Password</label>
                                <input type="password" placeholder="e.g Isila25@" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "55px", borderRadius: "10px" }} />
                            </div>

                            <div className="mt-3 px-3">
                                <p style={{ fontSize: "12px", fontFamily: "Montserrat-SemiBold" }}>
                                    By signing up you agreed to StudySync <span style={{ color: "#D9455F" }}>Terms, Privacy Policy,</span> and <span style={{ color: "#D9455F" }}>Cookie Use.</span>
                                </p>
                            </div>

                            <div className="mt-5 mb-3 d-grid">
                                <Link href="/signup" className="btn btn-block border-0 text-white px-5 py-2" style={{ fontFamily: "Montserrat-Bold", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                    Next
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </>

    )

}