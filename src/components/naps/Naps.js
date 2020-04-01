// React
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// Tools
import Timer from 'components/tools/Timer';

const Naps = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.naps.startNap();
    };

    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.naps.finishNap();
    };

    const StartStopForm = () => {
        return props.runningNap ? (
            <div className="card startstop">
                <button onClick={onFinishNapButtonClick}>
                    <Timer start={props.runningNap.start} class={'default'} />
                    <span className="hover">Nap finished!</span>
                </button>
            </div>
        ) : (
            <div className="card startstop">
                <button onClick={onStartNapButtonClick}>START NAP</button>
            </div>
        );
    };

    const CreatePreviousNapForm = () => {
        return (
            <form className="card">
                <fieldset>
                    <legend>create Nap</legend>
                    <input type="text" id="notes" placeholder="notes" />
                    <input type="submit" value="save"/>
                </fieldset>
            </form>
        );
    };

    return (
        <section className="page_naps">
            <StartStopForm />
            <CreatePreviousNapForm />
        </section>
    );
}

Naps.propTypes = {
    naps: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap)
};

export default Naps;
