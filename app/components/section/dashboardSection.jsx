import CreateStudyPlanCard from "../cards/createStudyPlanCard"
import CalculateGpaCard from "../cards/calculateGPAcard"
import CreatAiQuizCard from "../cards/createAiquizCard"
import CalculateCGPACard from "../cards/calculateCGPACard"

export default function Dashboard() {

    return (

        <>
            <main style={{ height: "100%" }}>
                <div className="container px-3 mt-2">
                    <header>
                        <p style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "500", fontSize: "17px" }} >Hi, Islamiyat Yusuf</p>
                        <p className="d-flex" style={{ fontFamily: "Fredoka, sans-serif", }}>
                            <span className="me-4">Welcome</span>
                            <span>
                                <img src="welcome.png" />
                            </span>
                        </p>
                    </header>

                    <div className="row">
                        <div className="col m-0 p-1">
                            <CreateStudyPlanCard />
                        </div>
                        <div className="col m-0 p-1">
                            <CalculateGpaCard />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m-0 p-1">
                            <CreatAiQuizCard />
                        </div>
                        <div className="col m-0 p-1">
                            <CalculateCGPACard />
                        </div>
                    </div>

                </div>
            </main>

        </>

    )

}