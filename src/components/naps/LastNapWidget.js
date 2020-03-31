import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Nap from 'models/Nap';
import Prompt from 'components/modal/Prompt';

const LastNapWidget = (props) => {
    let [lastNap, setLastNap] = useState(null);

    const deleteNap = () => {
        props.naps.deleteNap(lastNap);
        props.modal.hide();
    }

    const cancelDeletion = () => {
        props.modal.hide();
    }

    const onDeleteNapButtonClicked = () => {
        // 
        // props.modal.setContent(<h1>Bla</h1>);
        props.modal.setContent(<Prompt
            headline="Delete this Nap?"
            text="Do you really want to delete this Nap?"
            onConfirm={deleteNap}
            onCancel={cancelDeletion}
        />);
        props.modal.show();
    };

    useEffect(() => {
        // console.log('useEffect in LastNapWidget.js');
        if (props.currentUser && props.currentUser.uid) {
            let unbindFirestore = props.naps.getNaps(1)
                .onSnapshot(snapshot => {
                    if (!snapshot.empty) {
                        if (snapshot.docs[0].data().end > 0) {
                            let nap = new Nap();
                            nap.fromFirebaseDoc(snapshot.docs[0]);
                            setLastNap(nap);
                        }
                    } else {
                        setLastNap(null);
                    }
                });
            
            return () => {
                unbindFirestore();
            };
        }
    }, [props.currentUser, props.naps]);

    return lastNap ? (
        <article className="naps_widget single card">
            <h2>last Nap</h2>
            <h3 className="date">
                {new Date(lastNap.start).toLocaleDateString()}
            </h3>
            <p>
                <span className="duration">
                    {new Date(lastNap.end - lastNap.start).toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC"
                        }
                    )}
                </span>
                <span>hours sleep</span>
                <span className="times">
                    (
                    <span className="time_start">
                        {new Date(lastNap.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>{" "}
                    -{" "}
                    <span className="time_end">
                        {new Date(lastNap.end).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                    )
                </span>
            </p>
            <ul className="actions">
                <li>
                    <button
                        className="icon fas fa-trash fa-1x"
                        onClick={onDeleteNapButtonClicked}
                    ></button>
                </li>
                <li>
                    <button className="icon fas fa-pen fa-1x"></button>
                </li>
            </ul>
        </article>
    ) : null;
}

export default LastNapWidget;