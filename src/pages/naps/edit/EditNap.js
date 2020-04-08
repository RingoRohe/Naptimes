// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Libs
import Modal from 'react-modal';

// Models
import Nap from 'models/Nap';

// Components
import NapsForm from 'components/naps/napsform/NapsForm';
import Alert from 'components/shared/modal/Alert';

// Styles
import './edit_nap.scss';

const EditNap = props => {
    Modal.setAppElement('#root');

    let [nap, setNap] = useState(null);
    let [alertIsOpen, setAlertIsOpen] = useState(false);

    const history = useHistory();

    useEffect(() => {
        props.naps.getNapById(
            props.match.params.id,
            (fbNap) => {
                const nap = new Nap();
                nap.fromFirebaseDoc(fbNap);
                setNap(nap);
            },
            () => {
                setAlertIsOpen(true);
            }
        );
    }, [props.naps, props.match.params.id]);

    const goBack = () => {
        history.push('/');
    }

    const saveNap = (start, end, notes) => {
        nap.start = start;
        nap.end = end;
        nap.notes = notes;
        setNap(nap);
        // TODO: replace Alert with something better
        props.naps.updateNap(nap, () => {alert('yeah!')});
    }
    
    return (
        <section className="page_nap_edit">
            {nap ? (
                <NapsForm
                    start={nap.start}
                    end={nap.end}
                    notes={nap.notes}
                    onSubmit={saveNap}
                    headline="edit Nap"
                />
            ) : (
                <p>Nap not found.</p>
            )}
            <Modal
                isOpen={alertIsOpen}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                    goBack();
                }}
                overlayClassName={{
                    base: "backdrop",
                    afterOpen: "open",
                    beforeClose: "closed"
                }}
                className="modal"
                closeTimeoutMS={100}
            >
                <Alert text="Nap not found." onConfirm={goBack} />
            </Modal>
        </section>
    );
}

EditNap.propTypes = {
    nap: PropTypes.objectOf(Nap)
}

export default EditNap;
