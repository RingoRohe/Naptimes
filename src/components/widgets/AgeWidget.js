// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Libs
import humanizeDuration from 'humanize-duration';

// Styles
import './age.scss';
import { useEffect } from 'react';

const AgeWidget = props => {
    let [output, setOutput] = useState('');

    useEffect(() => {
        // console.log('useEffect in AgeWidget');
        const createOutput = () => {
            return humanizeDuration(Date.now() - props.birthday, {
                units: ["y", "mo", "w", "d", "h", "m"],
                round: true,
            });
        }

        setOutput(createOutput());
        const timeout = setTimeout(() => {
            setOutput(createOutput());
        }, 60000);

        return () => {
            clearTimeout(timeout);
            // console.log("AgeWidget unmounted");
        };
    }, [props.birthday]);

    return (
        <article className="card age">
            <span className="card_icon fas fa-birthday-cake fa-3x"></span>
            <h2>{props.title ? props.title : "Age"}</h2>
            <p>
                <span>{output}</span>
            </p>
        </article>
    );
}

AgeWidget.propTypes = {
    birthday: PropTypes.number.isRequired,
    title: PropTypes.string
}

export default AgeWidget
