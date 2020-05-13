// React
import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types'

// Styles
import './diapers.scss';
import Diaper from 'models/Diaper';

const DiapersForm = props => {
    const time = props.time ? props.time : Date.now();
    const propspee = props.pee ? props.pee : false;
    const propspoo = props.poo ? props.poo : false;
    const propnotes = props.notes ? props.notes : "";
    const headline = props.headline ? props.headline : "new Diaper";
    const submitText = props.submitText ? props.submitText : "save";

    let [changedDate, setChangedDate] = useState(time);
    let [pee, setPee] = useState(propspee);
    let [poo, setPoo] = useState(propspoo);
    let [notes, setNotes] = useState(propnotes);

    const onSubmit = (e) => {
        e.preventDefault();
        const diaper = new Diaper(changedDate, pee, poo, notes);

        setNotes("");
        setPee(false);
        setPoo(false);

        props.onSubmit(diaper);
    };

    const onChangedtDateTimeChanged = (e) => {
        if (e.target.value) {
            setChangedDate(new Date(e.target.value).getTime());
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
        <form className="diapers_form" onSubmit={onSubmit}>
            <fieldset>
                <legend>{headline}</legend>
                <input
                    type="datetime-local"
                    name="changedDate"
                    id="changedDate"
                    value={formatTimestampToInputDateTime(changedDate)}
                    onChange={onChangedtDateTimeChanged}
                />
                <input
                    type="checkbox"
                    name="pee"
                    id="pee"
                    checked={pee}
                    onChange={(e) => {
                        setPee(e.target.checked);
                    }}
                />
                <label htmlFor="pee">Pee</label>
                <input
                    type="checkbox"
                    name="poo"
                    id="poo"
                    checked={poo}
                    onChange={(e) => {
                        setPoo(e.target.checked);
                    }}
                />
                <label htmlFor="poo">Poo</label>
                <input
                    type="text"
                    className="notes"
                    placeholder="notes"
                    value={notes}
                    onChange={(e) => {
                        setNotes(e.target.value);
                    }}
                />
                <input type="submit" value={submitText} className="button" />
            </fieldset>
        </form>
    );
}

DiapersForm.propTypes = {
    time: PropTypes.number,
    pee: PropTypes.bool,
    poo: PropTypes.bool,
    notes: PropTypes.string,
    onSubmit: PropTypes.func,
    headline: PropTypes.string,
};

export default DiapersForm
