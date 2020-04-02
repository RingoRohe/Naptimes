import React from "react";
import PropTypes from "prop-types";

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

Modal.propTypes = {
    modal: PropTypes.object,
    children: PropTypes.any
}

const Alert = props => {
    const onConfirm = e => {
        if (props.onConfirm) {
            props.onConfirm();
        }
    };

    return (
        <div className="alert">
            {props.headline ? <h1>{props.headline}</h1> : null}
            <p>{props.text}</p>
            <ul className="actions">
                <li>
                    <button className="confirm" onClick={onConfirm}>
                        OK
                    </button>
                </li>
            </ul>
        </div>
    );
};

Alert.propTypes = {
    headline: PropTypes.string,
    text: PropTypes.string,
    onConfirm: PropTypes.func
};

const Confirm = props => {
    const onConfirm = e => {
        if (props.onConfirm) {
            props.onConfirm();
        }
    };
    const onCancel = e => {
        if (props.onCancel) {
            props.onCancel();
        }
    };

    return (
        <div className="confirm">
            {props.headline ? <h1>{props.headline}</h1> : null}
            <p>{props.text}</p>
            <ul className="actions">
                <li>
                    <button className="cancel" onClick={onCancel}>
                        No
                    </button>
                </li>
                <li>
                    <button className="confirm" onClick={onConfirm}>
                        Yes
                    </button>
                </li>
            </ul>
        </div>
    );
};

Confirm.propTypes = {
    headline: PropTypes.string,
    text: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};

export default Modal;
export {
    Alert, Confirm
};
