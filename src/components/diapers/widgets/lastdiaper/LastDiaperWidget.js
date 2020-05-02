// React
import React from 'react';

// Components
import Confirm from 'components/shared/modal/Confirm';

// Libs
import { toast } from 'react-toastify';

// Styles
import "../diaperswidget.scss";
import "./lastdiaper.scss";
import Timer from 'components/shared/timer/Timer';
import LinkButton from 'components/shared/LinkButton';

const LastDiaperWidget = (props) => {
    let { diapers, diapersController } = props;
    let lastDiaper = null;
    if (diapers.length > 0) {
        lastDiaper = diapers[0];
    }

    const deleteDiaper = () => {
        diapersController.deleteDiaper(lastDiaper);
        toast.success("Deleted", { delay: 500 });
    }

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

    return lastDiaper ? (
        <article className="diapers_widget single card">
            <h2>last Diaper</h2>
            <p>
                <span className="date">
                    {new Date(lastDiaper.time).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </span>
                <span className="times">
                    {new Date(lastDiaper.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
                <span className="elapsed_time">
                    <Timer start={lastDiaper.time} tick="every minute" /> ago
                </span>
                {lastDiaper.notes ? (
                    <span className="notes">"{lastDiaper.notes}"</span>
                ) : null}
            </p>
            <ul className="actions">
                <li>
                    <button
                        className="icon fas fa-trash fa-1x"
                        onClick={onDeleteDiaperButtonClicked}
                    ></button>
                </li>
                {/* <li>
                    <LinkButton
                        className="icon fas fa-pen fa-1x"
                        to={"/diapers/edit/" + lastDiaper.id}
                    >
                        <span></span>
                    </LinkButton>
                </li> */}
            </ul>
        </article>
    ) : null;
}

export default LastDiaperWidget;