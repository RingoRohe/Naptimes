// React
import React from 'react'
import PropTypes from 'prop-types'

// Libs
import { toast } from "react-toastify";

// Components
import NoteslistWidget from 'components/notes/widgets/noteslist/NoteslistWidget';

// Styles
import './notes.scss';
import NoteForm from 'components/notes/noteform/NoteForm';

const Notes = props => {
    const { notesController, notes = [] } = props;

    const onNoteFormSubmitted = (note) => {
        notesController.createNote(
            note,
            () => {
                toast.success("Note created");
            },
            () => {
                toast.error("Note not created");
            }
        );
    }

    return (
        <section className="page_notes">
            <article className="postit noteform">
                <NoteForm onSubmit={onNoteFormSubmitted} />
            </article>
            <article className="card noteslist">
                <NoteslistWidget
                    notes={notes}
                    notesController={notesController}
                />
            </article>
        </section>
    );
}

Notes.propTypes = {
    currentUser: PropTypes.object
}

export default Notes
