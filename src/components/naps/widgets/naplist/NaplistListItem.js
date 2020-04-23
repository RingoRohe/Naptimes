// React
import React from 'react';
import { useState } from "react";
import { useHistory } from 'react-router-dom';

// Libs
import Modal from 'react-modal';

// Components
import Confirm from "components/shared/modal/Confirm";
import Duration from 'components/shared/duration/Duration';
import Timer from 'components/shared/timer/Timer';

const LastNapsListItem = (props) => {
    Modal.setAppElement("#root");
    const history = useHistory();
    let [deleteNapPromptIsOpen, setDeleteNapPromptIsOpen] = useState(false);

    const deleteNap = () => {
        props.napsFunctions.deleteNap(props.nap);
        setDeleteNapPromptIsOpen(false);
    };

    const cancelDeletion = () => {
        setDeleteNapPromptIsOpen(false);
    };

    const onDeleteNapButtonClicked = () => {
        setDeleteNapPromptIsOpen(true);
    };

    const onEditNapButtonClicked = () => {
        history.push(`/naps/edit/${props.nap.id}`);
    };

    return (
        <li>
            <div className="info">
                <span className="date">
                    {new Date(props.nap.start).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </span>
                <span className="time_start">
                    {new Date(props.nap.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}{" "}
                    -
                </span>
                <span className="time_end">
                    {new Date(props.nap.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </span>
                <span className="duration">
                    <Duration
                        milliseconds={props.nap.end - props.nap.start}
                        showSeconds={false}
                    />
                </span>
                {(props.index === 0) ? (
                    <span className="elapsed_time"><Timer start={props.nap.end} tick="every minute" /> ago</span>
                ) : null}
                {props.nap.notes ? <span className="notes">{props.nap.notes}</span> : null}
            </div>
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
        </li>
    );
}

export default LastNapsListItem;