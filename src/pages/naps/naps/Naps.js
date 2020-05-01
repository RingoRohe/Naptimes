// React
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// Libs
import { toast } from "react-toastify";

// Tools
import NapsForm from '../../../components/naps/napsform/NapsForm';

// Components
import NaplistWidget from 'components/naps/widgets/naplist/NaplistWidget';
import ChartDaily from 'components/naps/charts/daily/ChartDaily';
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';

// Styles
import './naps.scss';
import ChartSleeptime from 'components/naps/charts/sleeptime/ChartSleeptime';
import StartNapMultiButton from 'components/naps/widgets/startnap/StartNapMultiButton';

const Naps = props => {
    const onNapsFormSubmit = (start, end, notes) => {
        const newNap = new Nap(start, end, notes);
        props.napsFunctions.createNap(newNap, () => {
            toast.success("Nap created");
        });
    }

    return (
        <section className="page_naps">
            {props.runningNap ? null : (
                <StartNapMultiButton napsFunctions={props.napsFunctions} />
            )}
            {props.runningNap ? (
                <RunningNapWidget
                    napsFunctions={props.napsFunctions}
                    runningNap={props.runningNap}
                    currentUser={props.currentUser}
                />
            ) : null}
            <article className="card">
                <NapsForm onSubmit={onNapsFormSubmit} />
            </article>
            {props.naps ? (
                <ChartSleeptime className="chart" naps={props.naps} />
            ) : null}
            {props.naps ? (
                <ChartDaily className="chart" naps={props.naps} />
            ) : null}
            {props.naps ? (
                <NaplistWidget
                    className="naplist card"
                    napsFunctions={props.napsFunctions}
                    naps={props.naps}
                    runningNap={props.runningNap}
                />
            ) : null}
        </section>
    );
}

Naps.propTypes = {
    napsFunctions: PropTypes.object.isRequired,
    runningNap: PropTypes.instanceOf(Nap)
};

export default Naps;
