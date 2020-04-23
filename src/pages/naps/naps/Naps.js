// React
import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// Libs
import Modal from 'react-modal';

// Tools
import Timer from 'components/shared/timer/Timer';
import NapsForm from '../../../components/naps/napsform/NapsForm';

// Components
import Alert from 'components/shared/modal/Alert';
import NaplistWidget from 'components/naps/widgets/naplist/NaplistWidget';
import ChartDaily from 'components/naps/charts/daily/ChartDaily';

// Styles
import './naps.scss';
import ChartSleeptime from 'components/naps/charts/sleeptime/ChartSleeptime';

const Naps = props => {
    let [napCreatedAlertIsOpen, setNapCreatedAlertIsOpen] = useState(false);

    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.startNap();
    };

    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.finishNap();
    };

    const onNapsFormSubmit = (start, end, notes) => {
        const newNap = new Nap(start, end, notes);
        props.napsFunctions.createNap(newNap, () => {
            setNapCreatedAlertIsOpen(true);
        });
    }

    const StartStopForm = () => {
        return props.runningNap ? (
            <article className="card startstop">
                <button onClick={onFinishNapButtonClick}>
                    <Timer start={props.runningNap.start} /><br />
                    <span className="default">finish Nap?</span>
                    <span className="hover">finish Nap!</span>
                </button>
            </article>
        ) : (
            <article className="card startstop">
                <button onClick={onStartNapButtonClick}>START NAP</button>
            </article>
        );
    };

    return (
        <section className="page_naps">
            <StartStopForm />
            <article className="card">
                <NapsForm onSubmit={onNapsFormSubmit} />
            </article>
            {props.naps ? <ChartSleeptime className="chart" naps={props.naps} /> : null}
            {props.naps ? <ChartDaily className="chart" naps={props.naps} /> : null}
            {props.naps ? (
                <NaplistWidget
                    className="naplist card"
                    napsFunctions={props.napsFunctions}
                    naps={props.naps}
                />
            ) : null}
            <Modal
                isOpen={napCreatedAlertIsOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                    setNapCreatedAlertIsOpen(false);
                }}
                className="modal"
                overlayClassName={{
                    base: "backdrop",
                    afterOpen: "open",
                    beforeClose: "closed",
                }}
                closeTimeoutMS={100}
            >
                <Alert
                    text="Nap created"
                    onConfirm={() => {
                        setNapCreatedAlertIsOpen(false);
                    }}
                />
            </Modal>
        </section>
    );
}

Naps.propTypes = {
    napsFunctions: PropTypes.object.isRequired,
    runningNap: PropTypes.instanceOf(Nap)
};

export default Naps;
