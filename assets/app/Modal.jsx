import React from 'react';

const Modal = ({value, id, deleteFunc}) => {

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="modalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalLabel">{value}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this {value}?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={deleteFunc}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Modal;