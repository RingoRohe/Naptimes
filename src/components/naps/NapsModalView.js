import React from 'react';

const NapsModalView = (props) => {
    const onStartNapButtonClick = (e) => {
        e.preventDefault();
        props.napsController.startNap();
        props.modal.hide();
    }

    const onFinishNapButtonClick = (e) => {
        e.preventDefault();
        props.napsController.finishNap();
        props.modal.hide();
    }
    
    return props.napsController.runningNap ? (
        <form>
            <fieldset>
                <legend>Nap</legend>
                <button onClick={onFinishNapButtonClick}>NAP FINISHED</button>
            </fieldset>
        </form>
    ) : (
        <form>
            <fieldset>
                <legend>start Nap</legend>
                <button onClick={onStartNapButtonClick}>START NAP</button>
            </fieldset>
            {/* <fieldset>
                <legend>add previous Nap</legend>
                <label htmlFor="nap_time_start">Start</label><input type="time" id="nap_time_start"/>
                <label htmlFor="nap_time_end">End</label><input type="time" id="nap_time_end"/>
            </fieldset> */}
        </form>
    );
}

export default NapsModalView;