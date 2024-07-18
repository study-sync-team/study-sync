import Link from "next/link"

export default function WaitlistSuccess() {

    return (

        <>

            <main className="" style={{ height: "100vh", alignContent: "center", fontFamily: "Fredoka, sans-serif" }}>
                <div className="d-flex align-justify-center justify-content-center">

                    <div className="container mt-0">
                        <div class="card mt-0">
                            <h5 class="card-header d-flex align-justify-center justify-content-center">
                                <img src="/logo2.png" alt="Logo" style={{ width: "200px" }} />
                            </h5>
                            <div class="card-body text-center">
                                <h4>Welcome To The Future Of Learning With AI</h4>
                                <p class="card-text">Thank you for signing up for the first version of Study Sync. We're here to help you read those long, and disorganized notes withe ease.
                                    <br /><br />
                                    Before you signin, this is our early beta version, there might be errors, so we created a WhatsApp community for you to tell us your experince
                                </p>
                                <div class="d-flex justify-content-between mt-4 pt-4">
                                    <Link href="https://chat.whatsapp.com/HmgDK9jPrS8Hbg8hXqCjQ5" className="btn ps-4" style={{ fontFamily: "Fredoka, sans-serif", color: "#CD598F", fontWeight: "600" }}>
                                        WhatsApp group
                                    </Link>

                                    <Link href="/signin" className="btn border-0 text-white px-5" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                        Signin
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>

    )

}