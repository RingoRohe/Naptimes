// React
import React from 'react';

// Tools
import Timer from 'components/shared/timer/Timer';

// Libs
import { toast } from 'react-toastify';

// Styles
import "../napswidget.scss";
import "./runningnap.scss";

const RunningNapWidget = (props) => {
    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.finishNap();
    };

    const onFinishNapButtonContext = (e) => {
        e.preventDefault();
        toast(
            <FinishNapTimePrompt
                onButtonClicked={(ms) => {
                    let finishDate = new Date(Date.now() - ms);
                    props.napsFunctions.finishNap(finishDate);
                }}
            />,
            {
                closeOnClick: false,
                autoClose: false,
                className: "no_padding",
            }
        );
    };

    const FinishNapTimePrompt = props => {
        const finishNapDelayed = (ms) => {
            props.onButtonClicked(ms);
            toast.dismiss();
        }
        const onCancelClicked = () => {
            toast.dismiss();
        }
        return (
            <div className="nap_finish_time_prompt">
                <button onClick={() => { finishNapDelayed(60*1000) }}>1 Minute ago</button>
                <button onClick={() => { finishNapDelayed(2*60*1000) }}>2 Minutes ago</button>
                <button onClick={() => { finishNapDelayed(5*60*1000) }}>5 Minutes ago</button>
                <button onClick={() => { finishNapDelayed(10*60*1000) }}>10 Minutes ago</button>
                <button onClick={() => { finishNapDelayed(15*60*1000) }}>15 Minutes ago</button>
                <button onClick={() => { finishNapDelayed(20*60*1000) }}>20 Minutes ago</button>
                <button onClick={() => { finishNapDelayed(30*60*1000) }}>30 Minutes ago</button>
                <button onClick={onCancelClicked}>cancel</button>
            </div>
        );
    }

    return (
        <article className="naps_widget running card">
            <span className="card_icon fas fa-bed fa-3x"></span>
            <p>{props.currentUser.settings.childName} is sleeping...</p>
            {props.runningNap
                ? (<Timer start={props.runningNap.start} />)
                : null
            }
            <button onClick={onFinishNapButtonClick} onContextMenu={onFinishNapButtonContext}>
                Nap finished<span className="default">?</span>
                <span className="hover">!</span>
            </button>
        </article>
    );
}

export default RunningNapWidget;