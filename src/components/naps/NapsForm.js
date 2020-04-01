// React
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// libs
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NapsForm = props => {
    const start = props.start ? props.start : Date.now();
    const end = props.end ? props.end : Date.now();

    let [startDate, setStartDate] = useState(start);
    let [endDate, setEndDate] = useState(end);
    let [notes, setNotes] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        setNotes("");

        props.onSubmit(startDate, endDate, notes);
    }

    return (
        <form className="naps_form" onSubmit={onSubmit}>
            <fieldset>
                <legend>create Nap</legend>
                <DatePicker
                    selected={startDate}
                    maxDate={endDate}
                    onChange={date => setStartDate(date.getTime())}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="d. MMMM yyyy HH:mm"
                />
                <DatePicker
                    selected={endDate}
                    minDate={startDate}
                    onChange={date => setEndDate(date.getTime())}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    dateFormat="d. MMMM yyyy HH:mm"
                />
                <input type="text" className="notes" placeholder="notes" value={notes} onChange={e => {setNotes(e.target.value)}} />
                <input type="submit" value="create" className="button" />
            </fieldset>
        </form>
    );
}

NapsForm.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    onSubmit: PropTypes.func
}

export default NapsForm
