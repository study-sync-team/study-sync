import { MdOutlinePayment } from "react-icons/md";

export default function InfoModal() {

    return (
        <>

            <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="infoModal">

                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body mb-3">
                            <div className="">
                                <div className="modal-header">
                                    <h1 class="modal-title fs-5" id="infoModal">Info</h1>
                                </div>

                                <div className="alert alert-danger">
                                    We're still working on it, enjoy the Beta testing stage.
                                </div>
                                
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>
    )

}