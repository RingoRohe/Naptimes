// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Styles
import './naps.scss';

const NapsForm = props => {
    const start = props.start ? props.start : Date.now() - (60 * 60 * 1000);
    const end = props.end ? props.end : Date.now();
    const propnotes = props.notes ? props.notes : "";
    const headline = props.headline ? props.headline : "create Nap";
    const submitText = props.submitText ? props.submitText : "save";

    let [startDate, setStartDate] = useState(start);
    let [endDate, setEndDate] = useState(end);
    let [notes, setNotes] = useState(propnotes);

    const onSubmit = e => {
        e.preventDefault();
        setNotes("");

        props.onSubmit(startDate, endDate, notes);
    }

    const onStartDateTimeChanged = (e) => {
        if (e.target.value) {
            setStartDate(new Date(e.target.value).getTime());
        }
    }
    
    const onEndDateTimeChanged = (e) => {
        if (e.target.value) {
            setEndDate(new Date(e.target.value).getTime());
        }
    }

    const formatTimestampToInputDateTime = (ts) => {
        let date = new Date(ts);
        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let yyyy = date.getFullYear();
        let hh = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let mm = (date.getMinutes() < 10 ? '0' : '') +date.getMinutes();
        let str = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
        return str;
    };

    return (
        <form className="naps_form" onSubmit={onSubmit}>
            <fieldset>
                <legend>{headline}</legend>
                <label htmlFor="start">Start</label>
                <input type="datetime-local" name="start" id="start" value={formatTimestampToInputDateTime(startDate)} onChange={onStartDateTimeChanged} />
                <label htmlFor="end">End</label>
                <input type="datetime-local" name="end" id="end" value={formatTimestampToInputDateTime(endDate)} onChange={onEndDateTimeChanged} />
                <input
                    type="text"
                    className="notes"
                    placeholder="notes"
                    value={notes}
                    onChange={e => {
                        setNotes(e.target.value);
                    }}
                />
                <input type="submit" value={submitText} className="button" />
            </fieldset>
        </form>
    );
}

NapsForm.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    notes: PropTypes.string,
    onSubmit: PropTypes.func,
    headline: PropTypes.string
}

export default NapsForm
