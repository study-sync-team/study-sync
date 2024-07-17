import { RiLogoutBoxLine } from "react-icons/ri";

export default function LogoutModal() {

    return (

        <>

            <div class="modal fade" id="logoutModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog " id="logoutModal">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mb-3 ">
                            
                            <p className="text-center" style={{ fontFamily: "Fredoka, sans-serif", fontSize: "23px" }}>Are you sure you wanna logout</p>
                            <div className="d-flex justify-content-center align-content-center">
                                <div class="hstack gap-3">
                                    <button class="btn px-4" style={{border: "1px solid #E84D88", fontFamily: "Fredoka, sans-serif"}} data-bs-dismiss="modal" aria-label="Close">No</button>
                                    <button class="btn px-4 text-light" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>

    )

}