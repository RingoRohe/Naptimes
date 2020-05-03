// React
import React from 'react';

// Components
import Confirm from 'components/shared/modal/Confirm';

// Libs
import { toast } from 'react-toastify';

// Styles
import "../napswidget.scss";
import "./lastnap.scss";
import Duration from 'components/shared/duration/Duration';
import Timer from 'components/shared/timer/Timer';
import LinkButton from 'components/shared/LinkButton';

const LastNapWidget = (props) => {
    let { naps, napsFunctions } = props;
    let lastNap = null;
    if (naps.length > 0) {
        lastNap = naps[0];
    }

    const deleteNap = () => {
        napsFunctions.deleteNap(lastNap);
        toast.success("Deleted", { delay: 500 });
    }

    const onDeleteNapButtonClicked = () => {
        toast(
            <Confirm
                headline="Delete?"
                text="Do you really want to delete this Nap?"
                onConfirm={deleteNap}
            />,
            {
                autoClose: false,
            }
        );
    };

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
        </article>
    ) : null;
}

export default LastNapWidget;