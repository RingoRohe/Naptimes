// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Nap from 'models/Nap';
import Awake from 'models/Awake';

// Components
import Confirm from "components/shared/modal/Confirm";
import Duration from 'components/shared/duration/Duration';
import Timer from 'components/shared/timer/Timer';
import Headline from 'models/Headline';

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

    if (props.nap instanceof Headline) {
        return (
            <li className="headline">
                <h3>{props.nap.text}</h3>
            </li>
        );
    } else if (props.index === 0 && props.nap instanceof Awake) {
        return (
            <li className="awake">
                <span className="elapsed_time">
                    currently{" "}
                    <Timer start={props.nap.start} tick="every minute" /> awake
                </span>
            </li>
        );
    } else if (props.nap instanceof Nap) {
        return (
            <li className="nap">
                <span className="times">
                    {new Date(props.nap.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(props.nap.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
                <span className="duration">
                    <Duration
                        milliseconds={props.nap.end - props.nap.start}
                        showSeconds={false}
                    />
                    {props.index === 0 ? (
                        <span>
                            {" "}
                            (<Timer
                                start={props.nap.end}
                                tick="every minute"
                            />{" "}
                            ago)
                        </span>
                    ) : null}
                </span>
                {props.nap.notes ? (
                    <span className="notes">{props.nap.notes}</span>
                ) : null}
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
    } else if (props.nap instanceof Awake) {
        return (
            <li className="awake">
                <span className="duration">
                    <Duration
                        milliseconds={props.nap.end - props.nap.start}
                        showSeconds={false}
                    />{" "}
                    awake
                </span>
            </li>
        );
    }
}

export default LastNapsListItem;