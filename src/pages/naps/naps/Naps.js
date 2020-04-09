// React
import React, {useState, useEffect} from 'react';
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
import ChartDaily from 'components/naps/charts/today/ChartDaily';

// Styles
import './naps.scss';

const Naps = props => {
    let [napCreatedAlertIsOpen, setNapCreatedAlertIsOpen] = useState(false);
    let [todayNaps, setTodayNaps] = useState([]);

    useEffect(() => {
        let dateOffset = 24 * 60 * 60 * 1000 * 7; // 7 days
        let firstDayStart = new Date();
        firstDayStart.setHours(0, 0, 0, 0);
        firstDayStart.setTime(firstDayStart.getTime() - dateOffset);
        let lastDayEnd = new Date();
        lastDayEnd.setHours(23, 59, 59, 999);

        let unbindFirestore = props.napsFunctions
            .getNaps(firstDayStart.getTime(), lastDayEnd.getTime())
            .onSnapshot(snapshot => {
                let naps = [];
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        if (doc.data().end > 0) {
                            let nap = new Nap();
                            nap.fromFirebaseDoc(doc);
                            naps.push(nap);
                        }
                    });
                    setTodayNaps(naps);
                } else {
                    setTodayNaps([]);
                }
            });

        return () => {
            unbindFirestore();
        };
    }, [props.napsFunctions]);

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
            <div className="card startstop">
                <button onClick={onFinishNapButtonClick}>
                    <Timer start={props.runningNap.start} /><br />
                    <span className="default">finish Nap?</span>
                    <span className="hover">finish Nap!</span>
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
            <div className="card">
                <NapsForm onSubmit={onNapsFormSubmit} />
            </div>
            <NaplistWidget
                className="naplist card"
                napsFunctions={props.napsFunctions}
                naps={todayNaps}
            />
            <ChartDaily className="chart" naps={todayNaps} />
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
                    beforeClose: "closed"
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
    napsFunctions: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap)
};

export default Naps;
