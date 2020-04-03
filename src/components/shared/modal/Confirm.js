// React
import React from 'react';
import PropTypes from 'prop-types';

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

export default Confirm;