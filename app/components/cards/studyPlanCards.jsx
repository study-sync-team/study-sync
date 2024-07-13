import Link from "next/link"

export default function StudyPlanCards(props) {

    return (

        <>

            <Link href={`/study-plan/modules/${props.id}`} className="text-decoration-none card bg-transparent dashnav" style={{ border: "1px solid #E0D9DE" }}>
                <div className="card-body pt-0 px-2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center me-3">
                            <div className="flex-shrink-0">
                                <div className="mt-3 mx-auto d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EBDEEA", width: '50px', height: '50px', borderRadius: '50%' }}>
                                    <span style={{ fontWeight: "600", fontSize: "14px", fontFamily: "Fredoka, sans-serif" }}>
                                        <span style={{ color: "#E04345", fontSize: "13px",maxWidth:"41px" }} className="d-inline-block text-truncate">{props.course_code}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3 mt-3">
                                <div className="row row-cols-1">
                                    <div className="col">
                                        <span style={{ fontSize: "14px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", maxWidth:"170px" }} className="d-inline-block text-truncate">{props.course_title}</span>
                                    </div>
                                    <div className="col">
                                        <span className="text-muted" style={{ fontSize: "12px", fontFamily: "Fredoka, sans-serif" }}>{props.module_count} Modules</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="row row-cols-1">
                                <div className="col mb-3 ms-2">
                                    <div class="dropdown">
                                        <i className="bi bi-three-dots-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu">
                                            {/*}
                                            <li><a class="dropdown-item" href="#">Edit</a></li>
                                            {*/}
                                            <li><a class="dropdown-item" href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                {/*}
                                <div className="col">
                                    <span class="badge rounded-pill text-bg-success" style={{ fontSize: "8px" }}>100l</span>
                                </div>
                                {*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        </>

    )

}