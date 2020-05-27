// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Note from 'models/Note';
import Headline from 'models/Headline';

// Components
import Confirm from "components/shared/modal/Confirm";
import Timer from 'components/shared/timer/Timer';

const NotesListItem = (props) => {
    const { notesController, note } = props;
    const history = useHistory();

    const deleteNote = () => {
        notesController.deleteNote(note, () => {
            toast.success('deleted');
        });
    };

    const onDeleteNoteButtonClicked = () => {
        toast(
            <Confirm
                headline="Delete?"
                text="Do you really want to delete this Note?"
                onConfirm={deleteNote}
            />,
            {
                autoClose: false,
            }
        );
    };

    const onEditNoteButtonClicked = () => {
        history.push(`/notes/edit/${note.id}`);
    };

    if (note instanceof Headline) {
        return (
            <li className="headline">
                <h3>{note.text}</h3>
            </li>
        );
    } else if (note instanceof Note) {
        return (
            <li className="note">
                <div className="info">
                    <span className="time">
                        {new Date(note.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                    <span className="elapsed_time">
                        <Timer tick="every minute" start={note.time} />{" "}
                        ago
                    </span>
                    {note.text ? (
                        <span className="text">{note.text}</span>
                    ) : null}
                </div>
                <ul className="actions">
                    <li>
                        <button
                            className="icon fas fa-trash fa-1x"
                            onClick={onDeleteNoteButtonClicked}
                        ></button>
                    </li>
                    <li>
                        <button
                            className="icon fas fa-pen fa-1x"
                            onClick={onEditNoteButtonClicked}
                        ></button>
                    </li>
                </ul>
            </li>
        );
    }
}

export default NotesListItem;