// React
import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types'

// Styles
import './notes.scss';
import Note from 'models/Note';

const NotesForm = props => {
    const note = props.note ? props.note : new Note(Date.now());
    const headline = props.headline ? props.headline : "new Note";
    const submitText = props.submitText ? props.submitText : "save";

    let [changedDate, setChangedDate] = useState(note.time);
    let [noteText, setNoteText] = useState(note.text);

    const onSubmit = (e) => {
        e.preventDefault();
        const newNote = new Note(changedDate, noteText);

        setNoteText("");

        props.onSubmit(newNote);
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
        <form className="notes_form" onSubmit={onSubmit}>
            <fieldset>
                <legend>{headline}</legend>
                <input
                    type="datetime-local"
                    name="changedDate"
                    id="changedDate"
                    value={formatTimestampToInputDateTime(changedDate)}
                    onChange={onChangedtDateTimeChanged}
                />
                <textarea
                    type="text"
                    className="notetext"
                    placeholder="Your Note"
                    value={noteText}
                    onChange={(e) => {
                        setNoteText(e.target.value);
                    }}
                />
                <input type="submit" value={submitText} className="button" />
            </fieldset>
        </form>
    );
}

NotesForm.propTypes = {
    note: PropTypes.objectOf(Note),
    onSubmit: PropTypes.func,
    headline: PropTypes.string,
};

export default NotesForm
