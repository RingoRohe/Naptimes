// React
import React from 'react';

// Tools
import Timer from 'components/shared/timer/Timer';

// Styles
import "../napswidget.scss";
import "./runningnap.scss";

const RunningNapWidget = (props) => {
    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.finishNap();
    };

    return (
        <article className="naps_widget running card">
            <span className="card_icon fas fa-bed fa-3x"></span>
            <p>Your Buddy is sleeping...</p>
            {props.runningNap
                ? (<Timer start={props.runningNap.start} />)
                : null
            }
            <button onClick={onFinishNapButtonClick}>
                Nap finished<span className="default">?</span>
                <span className="hover">!</span>
            </button>
        </article>
    );
}

export default RunningNapWidget;