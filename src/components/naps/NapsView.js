import React from 'react';

const NapsView = (props) => {
    const onStartNapButtonClick = (e) => {
        e.preventDefault();
        props.napsController.startNap(props.currentUser);
        props.modal.hide();
    }
    
    return (
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

export default NapsView;