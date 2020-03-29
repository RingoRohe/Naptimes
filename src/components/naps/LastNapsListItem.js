import React from 'react';

const LastNapsListItem = (props) => {
    const onDeleteNapButtonClicked = () => {
        props.napsController.deleteNap(props.nap);
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
                    <button className="icon fas fa-trash fa-1x" onClick={onDeleteNapButtonClicked}></button>
                </li>
                <li>
                    <button className="icon fas fa-pen fa-1x"></button>
                </li>
            </ul>
        </li>
    );
}

export default LastNapsListItem;