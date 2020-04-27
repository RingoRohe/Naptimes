// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Styles
import './age.scss';
import { useEffect } from 'react';

const AgeWidget = props => {

    let [years, setYears] = useState('');
    let [months, setMonths] = useState('');
    let [weeks, setWeeks] = useState('');
    let [days, setDays] = useState('');

    useEffect(() => {
        // console.log('useEffect in AgeWidget');
        var moment = require("moment");
        moment().format();

        const createOutput = () => {
            let duration = moment.duration(moment().diff(moment(props.birthday)));
            setYears(Math.floor(duration.asYears()));
            setMonths(Math.floor(duration.asMonths()));
            setWeeks(Math.floor(duration.asWeeks()));
            setDays(Math.floor(duration.asDays()));
        }

        createOutput();
        const timeout = setTimeout(() => {
            createOutput();
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
                <span>{years} years</span>
                <span>{months} months</span>
                <span>{weeks} weeks</span>
                <span>{days} days</span>
            </p>
        </article>
    );
}

AgeWidget.propTypes = {
    birthday: PropTypes.number.isRequired,
    title: PropTypes.string
}

export default AgeWidget
