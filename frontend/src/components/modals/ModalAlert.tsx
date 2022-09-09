import React from 'react'

function ModalAlert() {
    return (
        <div className="modal__background">
            <div className="modal__container">
                <button> X </button>
                <div className="modal__header">
                </div>
                <div className="modal__body">
                    <h2>Are you sure you want to delete this note?</h2>

                </div>
                <div className="modal__footer">

                </div>
            </div>
        </div>
    )
}

export default ModalAlert