// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Note from 'models/Note';

// Components
import NoteForm from 'components/notes/noteform/NoteForm';

// Styles
import './editnote.scss';

const EditNote = props => {
    let [note, setNote] = useState(null);

    const history = useHistory();
    
    useEffect(() => {
        props.notesController.getNoteById(
            props.match.params.id,
            (fbNote) => {
                const note = new Note();
                note.fromFirebaseDoc(fbNote);
                setNote(note);
            },
            () => {
                toast.error("Note not found.", {
                    onClose: () => {
                        goBack();
                    },
                });
            }
        );
        // eslint-disable-next-line
    }, []);

    const goBack = () => {
        history.push('/');
    }

    const saveNote = (newNote) => {
        const weightNote = new Note(newNote.time, newNote.weight);
        props.notesController.createNote(
            weightNote,
            () => { toast.success('Note saved'); },
            () => { toast.error('Note not saved'); }
        );
        history.goBack();
    }

    const onNoteFormSubmitted = (newNote) => {
        props.notesController.deleteNote(note, () => { saveNote(newNote);});
    }
    
    return (
        <section className="page_note_edit">
            {note ? (
                <NoteForm
                    note={note}
                    onSubmit={onNoteFormSubmitted}
                    headline="edit Note"
                />
            ) : (
                <p>Note not found.</p>
            )}
        </section>
    );
}

EditNote.propTypes = {
    note: PropTypes.objectOf(Note),
    notesController: PropTypes.object
};

export default EditNote;
