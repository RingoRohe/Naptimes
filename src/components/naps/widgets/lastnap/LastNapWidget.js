// React
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Libs
import Modal from 'react-modal';

// Models
import Nap from 'models/Nap';

// Components
import Confirm from 'components/shared/modal/Confirm';

// Styles
import "../napswidget.scss";
import "./lastnap.scss";
import Duration from 'components/shared/duration/Duration';
import Timer from 'components/shared/timer/Timer';
import LinkButton from 'components/shared/LinkButton';

const LastNapWidget = (props) => {
    Modal.setAppElement('body');

    let [lastNap, setLastNap] = useState(null);
    let [deleteNapPromptIsOpen, setDeleteNapPromptIsOpen] = useState(false);

    const deleteNap = () => {
        props.napsFunctions.deleteNap(lastNap);
        setDeleteNapPromptIsOpen(false);
    }

    const cancelDeletion = () => {
        setDeleteNapPromptIsOpen(false);
    }

    const onDeleteNapButtonClicked = () => {
        setDeleteNapPromptIsOpen(true);
    };

    useEffect(() => {
        // console.log('useEffect in LastNapWidget.js');
        if (props.currentUser && props.currentUser.uid) {
            let unbindFirestore = props.napsFunctions.getNaps(1)
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
    }, [props.currentUser, props.napsFunctions]);

    return lastNap ? (
        <article className="naps_widget single card">
            <h2>last Nap</h2>
            <p>
                <span className="date">
                    {new Date(lastNap.start).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </span>
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
                <span className="duration">
                    <Duration
                        milliseconds={lastNap.end - lastNap.start}
                        showSeconds={false}
                    />
                </span>
                <span className="elapsed_time"><Timer start={lastNap.end} tick="every minute" /> ago</span>
                {lastNap.notes ? (
                    <span className="notes">"{lastNap.notes}"</span>
                ) : null}
            </p>
            <ul className="actions">
                <li>
                    <button
                        className="icon fas fa-trash fa-1x"
                        onClick={onDeleteNapButtonClicked}
                    ></button>
                </li>
                <li>
                    <LinkButton className="icon fas fa-pen fa-1x" to={'/naps/edit/' + lastNap.id}>
                        <span></span>
                    </LinkButton>
                </li>
            </ul>
            <Modal
                isOpen={deleteNapPromptIsOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                    setDeleteNapPromptIsOpen(false);
                }}
                className="modal"
                overlayClassName={{
                    base: "backdrop",
                    afterOpen: "open",
                    beforeClose: "closed"
                }}
                closeTimeoutMS={100}
            >
                <Confirm
                    headline="Delete?"
                    text="Do you really want to delete this Nap?"
                    onConfirm={deleteNap}
                    onCancel={cancelDeletion}
                />
            </Modal>
        </article>
    ) : null;
}

export default LastNapWidget;