// React
import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// Libs
import Modal from 'react-modal';

// Tools
import NapsForm from '../../../components/naps/napsform/NapsForm';

// Components
import Alert from 'components/shared/modal/Alert';
import NaplistWidget from 'components/naps/widgets/naplist/NaplistWidget';
import ChartDaily from 'components/naps/charts/daily/ChartDaily';
import StartNapButton from 'components/naps/widgets/startnap/StartNapButton';
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';

// Styles
import './naps.scss';
import ChartSleeptime from 'components/naps/charts/sleeptime/ChartSleeptime';

const Naps = props => {
    let [napCreatedAlertIsOpen, setNapCreatedAlertIsOpen] = useState(false);

    const onNapsFormSubmit = (start, end, notes) => {
        const newNap = new Nap(start, end, notes);
        props.napsFunctions.createNap(newNap, () => {
            setNapCreatedAlertIsOpen(true);
        });
    }

    return (
        <section className="page_naps">
            {props.runningNap ? null : <StartNapButton napsFunctions={props.napsFunctions} />}
            {props.runningNap ? <RunningNapWidget napsFunctions={props.napsFunctions} runningNap={props.runningNap} currentUser={props.currentUser} /> : null}
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
