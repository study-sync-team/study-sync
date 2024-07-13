export default function SaveGpaModal({ gpa_data }) {

    return (

        <>

            <div class="modal fade" id="saveGpaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" id="saveGpaModal">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0 pb-0 mb-0">
                            <button type="button" class="btn-close border border-dark rounded-circle btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mb-3">
                            <div className="">
                                <form>
                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Your Level</label>
                                        <select class="form-select" aria-label="Default select example" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }}
                                            name="level"

                                        >
                                            <option value="100">100 level</option>
                                            <option value="200">200 level</option>
                                            <option value="300">300 level</option>
                                            <option value="400">400 level</option>
                                        </select>
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" style={{ fontSize: "16px", fontFamily: "Fredoka, sans-serif", fontWeight: '500' }}>Your Semester</label>
                                        <input type="text" name="semester" placeholder="E.g 1st semester" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ backgroundColor: "#F7F2F6", height: "44px", borderRadius: "10px" }} required />
                                    </div>
                                    <div className="d-flex justify-content-center align-content-center">
                                        <button type="submit" className="btn border-0 text-white px-5 py-2" style={{ fontFamily: "Fredoka, sans-serif", background: "linear-gradient(to right, #D95388, #85486e)" }}>
                                            Save
                                        </button>
                                    </div>

                                </form>
                                {/*}
                                <i className="bi bi-check-circle-fill" style={{ fontSize: "100px", color: "#00A33C" }}></i>
                            {*/}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>

    )

}