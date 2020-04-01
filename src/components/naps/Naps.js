// React
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// Tools
import Timer from 'components/tools/Timer';
import NapsForm from './NapsForm';
import Alert from 'components/modal/Alert';

const Naps = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.naps.startNap();
    };

    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.naps.finishNap();
    };

    const onNapsFormSubmit = (start, end, notes) => {
        const newNap = new Nap(start, end, notes);
        props.naps.createNap(
            newNap,
            () => {
                props.modal.setContent(<Alert text="New Nap created." onConfirm={props.modal.hide} />);
                props.modal.show();
            });
    }

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

    return (
        <section className="page_naps">
            <StartStopForm />
            <div className="card"><NapsForm onSubmit={onNapsFormSubmit} /></div>
        </section>
    );
}

Naps.propTypes = {
    naps: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap)
};

export default Naps;
