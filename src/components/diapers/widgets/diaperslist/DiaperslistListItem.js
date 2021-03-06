// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Diaper from 'models/Diaper';
import Headline from 'models/Headline';

// Components
import Confirm from "components/shared/modal/Confirm";
import Timer from 'components/shared/timer/Timer';

const LastDiapersListItem = (props) => {
    const history = useHistory();

    const deleteDiaper = () => {
        props.diapersController.deleteDiaper(props.diaper);
        toast.success('deleted', { delay: 500 });
    };

    const onDeleteDiaperButtonClicked = () => {
        toast(
            <Confirm
                headline="Delete?"
                text="Do you really want to delete this Diaper?"
                onConfirm={deleteDiaper}
            />,
            {
                autoClose: false,
            }
        );
    };

    const onEditDiaperButtonClicked = () => {
        history.push(`/diapers/edit/${props.diaper.id}`);
    };

    if (props.diaper instanceof Headline) {
        return (
            <li className="headline listsection_headline">
                <h3>{props.diaper.text}</h3>
            </li>
        );
    } else if (props.diaper instanceof Diaper) {
        return (
            <li className="diaper">
                <div className="info">
                    <span className="time">
                        {new Date(props.diaper.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        {props.diaper.pee ? (
                            <span className="pee fas fa-tint active"></span>
                        ) : (
                            <span className="pee fas fa-tint"></span>
                        )}
                        {props.diaper.poo ? (
                            <span className="poo fas fa-poop active"></span>
                        ) : (
                            <span className="poo fas fa-poop"></span>
                        )}
                    </span>
                    <span className="elapsed_time">
                        <Timer tick="every minute" start={props.diaper.time} />{" "}
                        ago
                    </span>
                    {props.diaper.notes ? (
                        <span className="notes">{props.diaper.notes}</span>
                    ) : null}
                </div>
                <ul className="actions">
                    <li>
                        <button
                            className="icon fas fa-trash fa-1x"
                            onClick={onDeleteDiaperButtonClicked}
                        ></button>
                    </li>
                    <li>
                        <button
                            className="icon fas fa-pen fa-1x"
                            onClick={onEditDiaperButtonClicked}
                        ></button>
                    </li>
                </ul>
            </li>
        );
    }
}

export default LastDiapersListItem;