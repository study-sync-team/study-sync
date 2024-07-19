import Link from "next/link"
import { LuGraduationCap } from "react-icons/lu";


export default function ModulesPlanCards(props) {

    return (

        <>

            <div class="position-relative">

                <div class="position-absolute top-10 start-0">
                    <br />
                    <img src="/vector1.png" />
                </div>
            </div>
            {props.status === true ? (
                <Link href={`/study-plan/notes/${props.module_id}/${props.plan_id}`} className="ms-4 text-decoration-none card bg-transparent" style={{ border: "1px solid #e84d88" }}>
                    <div className="card-body pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">
                                    <div className="mt-3 mx-auto d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EBDEEA", width: '50px', height: '50px', borderRadius: '50%' }}>
                                        <span style={{ fontWeight: "600", fontSize: "14px", fontFamily: "Fredoka, sans-serif" }}>
                                            <span style={{ color: "#E04345", fontSize: "25px" }}><LuGraduationCap /></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3 mt-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "14px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", maxWidth: "170px" }} className="d-inline-block text-truncate">{props.module_title}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/*}
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <div class="dropdown">
                                            <i className="bi bi-three-dots-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                            <ul class="dropdown-menu">
                                                
                                                <li><a class="dropdown-item" href="#">Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {*/}
                        </div>
                    </div>
                </Link>
            ) : (
                <Link href={`/study-plan/notes/${props.module_id}/${props.plan_id}`} className="ms-4 text-decoration-none card bg-transparent" style={{ border: "1px solid #E0D9DE" }}>
                    <div className="card-body pt-0 px-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <div className="flex-shrink-0">
                                    <div className="mt-3 mx-auto d-flex justify-content-center align-items-center" style={{ backgroundColor: "#EBDEEA", width: '50px', height: '50px', borderRadius: '50%' }}>
                                        <span style={{ fontWeight: "600", fontSize: "14px", fontFamily: "Fredoka, sans-serif" }}>
                                            <span style={{ color: "#E04345", fontSize: "25px" }}><LuGraduationCap /></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3 mt-3">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <span style={{ fontSize: "14px", fontFamily: "Fredoka, sans-serif", fontWeight: "500", maxWidth: "170px" }} className="d-inline-block text-truncate">{props.module_title}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/*}
                            <div className="mt-3">
                                <div className="row row-cols-1">
                                    <div className="col mb-3 ms-2">
                                        <div class="dropdown">
                                            <i className="bi bi-three-dots-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                            <ul class="dropdown-menu">
                                                
                                                <li><a class="dropdown-item" href="#">Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {*/}
                        </div>
                    </div>
                </Link>
            )
            }


        </>

    )

}