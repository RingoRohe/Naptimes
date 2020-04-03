import React from 'react';
import PropTypes from "prop-types";

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

export default Alert;
