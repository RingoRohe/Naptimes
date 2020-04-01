import React from 'react';
import Timer from 'components/tools/Timer';

const RunningNapWidget = (props) => {
    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.naps.finishNap();
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