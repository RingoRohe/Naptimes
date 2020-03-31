import React from 'react'
import PropTypes from 'prop-types'

const Prompt = props => {
    return (
        <div className="prompt">
            <h1>{props.headline}</h1>
            <p>{props.text}</p>
            <ul className="actions">
                <li>
                    <button
                        className="confirm"
                        onClick={props.onConfirm}
                    >OK</button>
                </li>
                <li>
                    <button className="cancel" onClick={props.onCancel}>Cancel</button>
                </li>
            </ul>
        </div>
    );
}

Prompt.propTypes = {
    headline: PropTypes.string,
    text: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
}

export default Prompt
