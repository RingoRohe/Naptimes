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
import NoData from 'components/shared/nodata/NoData';

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
                <span className="time">
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
                {lastDiaper.pee ? (
                    <span className="pee fas fa-tint active"></span>
                ) : (
                    <span className="pee fas fa-tint"></span>
                )}
                {lastDiaper.poo ? (
                    <span className="poo fas fa-poop active"></span>
                ) : (
                    <span className="poo fas fa-poop"></span>
                )}
            </p>
            <ul className="actions">
                <li>
                    <button
                        className="icon fas fa-trash fa-1x"
                        onClick={onDeleteDiaperButtonClicked}
                    ></button>
                </li>
                <li>
                    <LinkButton
                        className="icon fas fa-pen fa-1x"
                        to={"/diapers/edit/" + lastDiaper.id}
                    >
                        <span></span>
                    </LinkButton>
                </li>
            </ul>
        </article>
    ) : (
        <NoData className="diapers_widget single card" headline="Last Diaper" text="Not enough Data to show" />
    );
}

export default LastDiaperWidget;