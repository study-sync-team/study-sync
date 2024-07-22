import { MdManageAccounts } from "react-icons/md";

export default function UpdateAccountModal(props) {

    return (
        <>

            <div class="modal fade" id="accountUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="accountUpdateModal">

                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body mb-3">
                            <div className="">
                                <div className="modal-header">
                                    <h1 class="modal-title fs-5" id="accountUpdateModal"><MdManageAccounts size={20} /> Account</h1>
                                </div>

                                <form>
                                    <div class="mt-3 mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Email</label>
                                        <input
                                            type="text"
                                            placeholder={props.account_data && props.account_data.email ? props.account_data.email : 'Loading...'}
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