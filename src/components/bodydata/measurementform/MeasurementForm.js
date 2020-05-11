// React
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

// Components
import Measurement from "models/Measurement";

// Styles
import "./measurements.scss";

const MeasurementForm = (props) => {
    const {
        propstime = Date.now(),
        propsweight = "",
        propsbodysize = "",
        propsheadcircumference = "",
        headline = 'new Measurement',
        submitText = 'save'
    } = props;

    let [time, setTime] = useState(propstime);
    let [weight, setWeight] = useState(propsweight);
    let [bodySize, setBodySize] = useState(propsbodysize);
    let [headCircumference, setHeadCircumference] = useState(propsheadcircumference);

    const onSubmit = (e) => {
        e.preventDefault();
        const measurement = new Measurement(time, weight, bodySize, headCircumference);
        if (measurement.weight === '') measurement.weight = null;
        if (measurement.bodySize === '') measurement.bodySize = null;
        if (measurement.headCircumference === '') measurement.headCircumference = null;

        setTime(Date.now());
        setWeight("");
        setBodySize("");
        setHeadCircumference("");

        props.onSubmit(measurement);
    };

    const onDateTimeChanged = (e) => {
        if (e.target.value) {
            setTime(new Date(e.target.value).getTime());
        }
    };

    const formatTimestampToInputDateTime = (ts) => {
        let date = new Date(ts);
        let dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
        let MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        let yyyy = date.getFullYear();
        let hh = (date.getHours() < 10 ? "0" : "") + date.getHours();
        let mm = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        let str = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
        return str;
    };

    return (
        <form className="measurement_form" onSubmit={onSubmit}>
            <fieldset>
                <legend>{headline}</legend>
                <label htmlFor="time">Time of Measurement</label>
                <input
                    type="datetime-local"
                    name="time"
                    id="time"
                    value={formatTimestampToInputDateTime(time)}
                    onChange={onDateTimeChanged}
                />
                <label htmlFor="weight">Weight (g)</label>
                <input
                    type="number"
                    className="weight"
                    id="weight"
                    placeholder="Weight (g)"
                    value={weight}
                    onChange={(e) => {
                        setWeight(e.target.value);
                    }}
                />
                <label htmlFor="bodySize">Body (cm)</label>
                <input
                    type="number"
                    className="bodySize"
                    id="bodySize"
                    placeholder="Body Size (cm)"
                    value={bodySize}
                    onChange={(e) => {
                        setBodySize(e.target.value);
                    }}
                />
                <label htmlFor="headCircumference">Head (cm)</label>
                <input
                    type="number"
                    className="headCircumference"
                    id="headCircumference"
                    placeholder="Head Circumference (cm)"
                    value={headCircumference}
                    onChange={(e) => {
                        setHeadCircumference(e.target.value);
                    }}
                />
                <input type="submit" value={submitText} className="button" />
            </fieldset>
        </form>
    );
};

MeasurementForm.propTypes = {
    time: PropTypes.number,
    weight: PropTypes.number,
    bodySize: PropTypes.number,
    headCircumference: PropTypes.number,
    onSubmit: PropTypes.func.isRequired,
    headline: PropTypes.string,
    submitText: PropTypes.string
};

export default MeasurementForm;
