// React
import React from 'react'
import PropTypes from 'prop-types'

// Libs
import { toast } from 'react-toastify';

// Styles
import './startnapbutton.scss';

const StartNapMultiButton = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.startNap();
    };
    
    const onStartNapLongPress = e => {
        e.preventDefault();
        toast(<NapStartTimePrompt onButtonClicked={(ms) => {
            let startDate = new Date(Date.now() - ms);
            props.napsFunctions.startNap(startDate);
        }} />, {
            closeOnClick: false,
            autoClose: false,
            className: "no_padding",
        });
    };

    const NapStartTimePrompt = props => {
        const startNapDelayed = (ms) => {
            props.onButtonClicked(ms);
            toast.dismiss();
        }
        const onCancelClicked = () => {
            toast.dismiss();
        }
        return (
            <div className="nap_start_time_prompt">
                <button onClick={() => { startNapDelayed(60*1000) }}>1 Minute ago</button>
                <button onClick={() => { startNapDelayed(2*60*1000) }}>2 Minutes ago</button>
                <button onClick={() => { startNapDelayed(5*60*1000) }}>5 Minutes ago</button>
                <button onClick={() => { startNapDelayed(10*60*1000) }}>10 Minutes ago</button>
                <button onClick={() => { startNapDelayed(15*60*1000) }}>15 Minutes ago</button>
                <button onClick={() => { startNapDelayed(20*60*1000) }}>20 Minutes ago</button>
                <button onClick={() => { startNapDelayed(30*60*1000) }}>30 Minutes ago</button>
                <button onClick={onCancelClicked}>cancel</button>
            </div>
        );
    }

    return (
        <article className="card startstopmulti">
                <button onClick={onStartNapButtonClick} onContextMenu={onStartNapLongPress}>Start Nap</button>
        </article>
    );
}

StartNapMultiButton.propTypes = {
    napsFunctions: PropTypes.object
};

export default StartNapMultiButton
