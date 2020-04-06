// React
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Libs
import Modal from 'react-modal';

// Models
import Nap from 'models/Nap';

// Components
import NapsForm from 'components/naps/napsform/NapsForm';
import Confirm from 'components/shared/modal/Confirm';
import Alert from 'components/shared/modal/Alert';

// Styles
import "../napswidget.scss";
import "./lastnap.scss";
import Duration from 'components/shared/duration/Duration';

const LastNapWidget = (props) => {
    Modal.setAppElement('body');

    let [lastNap, setLastNap] = useState(null);
    let [editNapModalIsOpen, setEditNapModalIsOpen] = useState(false);
    let [deleteNapPromptIsOpen, setDeleteNapPromptIsOpen] = useState(false);
    let [alertIsOpen, setAlertIsOpen] = useState(false);
    let [alertContent, setAlertContent] = useState("");

    const deleteNap = () => {
        props.naps.deleteNap(lastNap);
        setDeleteNapPromptIsOpen(false);
    }

    const cancelDeletion = () => {
        setDeleteNapPromptIsOpen(false);
    }

    const onDeleteNapButtonClicked = () => {
        setDeleteNapPromptIsOpen(true);
    };

    const editNap = (start, end, notes) => {
        lastNap.start = start;
        lastNap.end = end;
        lastNap.notes = notes;
        props.naps.updateNap(lastNap,
            () => {
                setAlertContent(<Alert text="Nap updated." onConfirm={() => {
                    setAlertIsOpen(false);
                }} />);
                setAlertIsOpen(true);
            }
        );
        setEditNapModalIsOpen(false);
    }

    const onEditNapButtonClicked = () => {
        setEditNapModalIsOpen(true);
    }

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
                    <button
                        className="icon fas fa-pen fa-1x"
                        onClick={onEditNapButtonClicked}
                    ></button>
                </li>
            </ul>
            <Modal
                isOpen={alertIsOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                    setEditNapModalIsOpen(false);
                }}
                overlayClassName={{
                    base: "backdrop",
                    afterOpen: "open",
                    beforeClose: "closed"
                }}
                className="modal"
                closeTimeoutMS={100}
            >
                {alertContent}
            </Modal>
            <Modal
                isOpen={editNapModalIsOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                    setEditNapModalIsOpen(false);
                }}
                overlayClassName={{
                    base: "backdrop",
                    afterOpen: "open",
                    beforeClose: "closed"
                }}
                className="modal"
                closeTimeoutMS={100}
            >
                <NapsForm
                    start={lastNap.start}
                    end={lastNap.end}
                    notes={lastNap.notes}
                    onSubmit={editNap}
                />
            </Modal>
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