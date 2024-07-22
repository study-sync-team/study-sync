import InfoModal from "../modal/infoModal"
export default function AnalyticsCard() {

    return (

        <>

            <div data-bs-toggle="modal" data-bs-target="#infoModal" className="card m-0" id="dashnav" style={{ height: "185px", backgroundColor: "transparent", borderRadius: "10px" }}>
                <div className="card-body">
                    <div className="mt-4 mx-auto d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EBDEEA", width: '70px', height: '70px', borderRadius: '50%' }}>
                        <i className="bi bi-graph-up-arrow" style={{ color: "#E84D88", fontSize: "25px" }} />
                    </div>
                    <div className="mt-2 d-flex justify-content-center align-content-center" style={{ fontSize: "14px", fontFamily: "Fredoka, sans-serif" }}>
                        Analytics
                    </div>
                </div>
            </div>

            <InfoModal />

        </>

    )

}