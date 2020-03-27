import React from "react";

const Modal = props => {
    const onBackdropClick = (e) => {
        props.modal.toggleVisibility()
    }

    const onModalClick = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div
            className={props.modal.modalVisibility ? "backdrop" : "backdrop hidden"}
            onClick={onBackdropClick}
        >
            <div className="modal card" onClick={onModalClick}>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
