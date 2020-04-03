// React
import React from 'react';
import { useState } from "react";

// Libs
import Modal from 'react-modal';

// Components
import NapsForm from 'components/naps/napsform/NapsForm';
import Confirm from "components/shared/modal/Confirm";
import Alert from "components/shared/modal/Alert";

const LastNapsListItem = (props) => {
    Modal.setAppElement("#root");
    let [editNapModalIsOpen, setEditNapModalIsOpen] = useState(false);
    let [deleteNapPromptIsOpen, setDeleteNapPromptIsOpen] = useState(false);
    let [alertIsOpen, setAlertIsOpen] = useState(false);
    let [alertContent, setAlertContent] = useState("");

    const deleteNap = () => {
        props.naps.deleteNap(props.nap);
        setDeleteNapPromptIsOpen(false);
    };

    const cancelDeletion = () => {
        setDeleteNapPromptIsOpen(false);
    };

    const onDeleteNapButtonClicked = () => {
        setDeleteNapPromptIsOpen(true);
    };

    const editNap = (start, end, notes) => {
        props.nap.start = start;
        props.nap.end = end;
        props.nap.notes = notes;
        props.naps.updateNap(props.nap, () => {
            setAlertContent(
                <Alert
                    text="Nap updated."
                    onConfirm={() => {
                        setAlertIsOpen(false);
                    }}
                />
            );
            setAlertIsOpen(true);
        });
        setEditNapModalIsOpen(false);
    };

    const onEditNapButtonClicked = () => {
        setEditNapModalIsOpen(true);
    };

    return (
        <li>
            <span className="date">
                {new Date(props.nap.start).toLocaleDateString()}
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
                {new Date(props.nap.end - props.nap.start).toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC"
                    }
                )}{" "}
                hours
            </span>
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
            {/* TODO: prevent Modal from jaumping-CSS-Thingy bug */}
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
                    start={props.nap.start}
                    end={props.nap.end}
                    notes={props.nap.notes}
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
        </li>
    );
}

export default LastNapsListItem;