// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Components
import Confirm from "components/shared/modal/Confirm";
import Duration from 'components/shared/duration/Duration';
import Timer from 'components/shared/timer/Timer';

const LastNapsListItem = (props) => {
    const history = useHistory();

    const deleteNap = () => {
        props.naps.deleteNap(props.nap);
        toast.success("Deleted", { delay: 500 });
    };

    const onDeleteNapButtonClicked = () => {
        toast(
            <Confirm
                headline="Delete?"
                text="Do you really want to delete this Nap?"
                onConfirm={deleteNap}
            />, {
            autoClose: false
        });
    };

    const onEditNapButtonClicked = () => {
        history.push(`/naps/edit/${props.nap.id}`);
    };

    return (
        <li>
            <span className="date">
                {new Date(props.nap.start).toLocaleDateString([], {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}
            </span>
            <span className="times">
                {new Date(props.nap.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })} - {new Date(props.nap.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </span>
            <span className="duration">
                <Duration milliseconds={props.nap.end - props.nap.start} showSeconds={false} /><br />
                (<Timer start={props.nap.end} tick="every minute" /> ago)
            </span>
            {props.nap.notes ? <span className="notes">{props.nap.notes}</span> : null}
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