import React from 'react';

const NapsView = (props) => {
    return (
        <form>
            <h2>Naps</h2>
            <fieldset>
                <legend>add previous Nap</legend>
                <label htmlFor="nap_time_start">Start</label><input type="time" id="nap_time_start"/>
                <label htmlFor="nap_time_end">End</label><input type="time" id="nap_time_end"/>
            </fieldset>
        </form>
    );
}

export default NapsView;