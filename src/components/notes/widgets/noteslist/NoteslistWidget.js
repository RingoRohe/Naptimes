// React
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

// Components
import NotesListItem from './NoteslistListItem';

// Styles
import './noteslist.scss';
import Headline from 'models/Headline';

const NoteslistWidget = (props) => {
    const { notes = [], notesController, className } = props;
    let [lastNotes, setLastNotes] = useState([]);
    
    const formatDate = (date) => {
        return date.toLocaleDateString([], {
            weekday: 'short',
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    useEffect(() => {
        // console.log('useEffect in NotesListWidget.js');
        let tempNotes = [];
        let lastDate = '';
        notes.forEach((note, index) => {
            // add Headline if neccessary
            const noteDate = formatDate(new Date(note.time));
            if (noteDate !== lastDate) {
                lastDate = noteDate;
                let headline = new Headline(noteDate, noteDate);
                tempNotes.push(headline);
            }
            // add Note
            tempNotes.push(note);
        });
        setLastNotes(tempNotes);
    }, [notes]);

    return (
        <article className={className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>Notes</h2>
            <ul className="last_notes_list">
                {lastNotes.map((item, index) => (
                    <NotesListItem
                        key={item.id}
                        note={item}
                        index={index}
                        notesController={notesController}
                    />
                ))}
            </ul>
        </article>
    );
}

export default NoteslistWidget;