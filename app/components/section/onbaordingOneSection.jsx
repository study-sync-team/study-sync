export default function OnboardingOneSection() {

    return (

        <>

            <div className="container-fluid">
                <div className="row">
                    {/* First column takes up half of the screen */}
                    <div className="col-md-6 p-0">
                        <img src="/onboarding1.png" className="img-fluid h-51 w-100" alt="Half screen image" />
                    </div>
                    {/* Second column takes up the other half of the screen */}
                    <div className="col-md-6 mt-3">
                        <div className="text-center">
                            <h4 className="" style={{ fontFamily: "Montserrat-Black", fontSize: "23px" }}>
                                <span className="me-2">Track</span>
                                <span style={{ color: "#E84D88" }}>Academic Progress</span>
                            </h4>
                            <p>
                                Monitor your academic journey with ease
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}