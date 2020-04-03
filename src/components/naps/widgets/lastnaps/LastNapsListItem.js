// React
import React from 'react';

// Components
import { Alert, Confirm } from "components/shared/modal/Modal";
import NapsForm from 'components/naps/napsform/NapsForm';

const LastNapsListItem = (props) => {
    // const onDeleteNapButtonClicked = () => {
    //     props.naps.deleteNap(props.nap);
    // };

    const deleteNap = () => {
        props.naps.deleteNap(props.nap);
        props.modal.hide();
    };

    const cancelDeletion = () => {
        props.modal.hide();
    };

    const onDeleteNapButtonClicked = () => {
        //
        // props.modal.setContent(<h1>Bla</h1>);
        props.modal.setContent(
            <Confirm
                headline="Delete this Nap?"
                text="Do you really want to delete this Nap?"
                onConfirm={deleteNap}
                onCancel={cancelDeletion}
            />
        );
        props.modal.show();
    };

    const editNap = (start, end, notes) => {
        props.nap.start = start;
        props.nap.end = end;
        props.nap.notes = notes;
        props.naps.updateNap(props.nap,
            () => {
                props.modal.setContent(
                    <Alert text="Nap updated." onConfirm={props.modal.hide} />
                );
                props.modal.show();
            }
        );
        props.modal.hide();
    }

    const onEditNapButtonClicked = () => {
        props.modal.setContent(
            <NapsForm
                start={props.nap.start}
                end={props.nap.end}
                notes={props.nap.notes}
                onSubmit={editNap} />
        );
        props.modal.show();
    }

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
        </li>
    );
}

export default LastNapsListItem;