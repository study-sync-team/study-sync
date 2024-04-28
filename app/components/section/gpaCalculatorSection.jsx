import GpaTable from "../table/table"

export default function GpaCalculatorSection() {

    return (

        <>

            <main style={{ height: "100%" }}>

                <div className="container">

                    <div className="mt-2 d-flex justify-content-center align-content-cennter" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "400", fontSize: "17px" }}>
                        <p className="m-0">Total no of Courses</p>
                    </div>
                    <div className="m-0 mb-3 d-flex justify-content-center align-content-cennter" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "400", fontSize: "17px" }}>
                        <button className="d-flex justify-content-center m-0 btn btn-outline-dark px-5 border-2" style={{ borderColor: "#CCBFCA", color: "#9EA3AE" }} data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="ms-3 me-2">8</span>
                            <span className="ms-3 me-3"><i className="bi bi-caret-down-fill"></i></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">8</a></li>
                            <li><a class="dropdown-item" href="#">16</a></li>
                            <li><a class="dropdown-item" href="#">32</a></li>
                        </ul>
                    </div>

                    <GpaTable />

                    <div className="text-center" style={{ fontFamily: "Fredoka, sans-serif",}}>
                        <p>Your GPA for 200 level 1st semester is</p>
                    </div>

                </div>

            </main>

        </>

    )

}