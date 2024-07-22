import { FaRegUserCircle } from "react-icons/fa";

export default function UpdateProfileModal(props) {

    return (
        <>

            <div class="modal fade" id="profileUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="profileUpdateModal">

                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body mb-3">
                            <div className="">
                                <div className="modal-header">
                                    <h1 class="modal-title fs-5" id="profileUpdateModal"><FaRegUserCircle size={20} /> Profile</h1>
                                </div>

                                <form>
                                    <div class="mt-3 mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder={props.profile_data && props.profile_data.fullname ? props.profile_data.fullname : 'Loading...'}
                                            class="form-control"
                                            style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} disabled
                                        />
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Country</label>
                                        <input
                                            type="text"
                                            placeholder={props.profile_data && props.profile_data.country ? props.profile_data.country : 'Loading...'}
                                            class="form-control"
                                            style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} disabled
                                        />
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Gender</label>
                                        <input
                                            type="text"
                                            placeholder={props.profile_data && props.profile_data.gender ? props.profile_data.gender : 'Loading...'}
                                            class="form-control"
                                            style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} disabled
                                        />                                    
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Institution</label>
                                        <input
                                            type="text"
                                            placeholder={props.profile_data && props.profile_data.institution ? props.profile_data.institution : 'Loading...'}
                                            class="form-control"
                                            style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} disabled
                                        /> 
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>
    )

}