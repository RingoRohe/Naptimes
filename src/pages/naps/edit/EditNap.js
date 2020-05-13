// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Nap from 'models/Nap';

// Components
import NapsForm from 'components/naps/napsform/NapsForm';

// Styles
import './edit_nap.scss';

const EditNap = props => {
    let [nap, setNap] = useState(null);

    const history = useHistory();
    
    useEffect(() => {
        props.napsFunctions.getNapById(
            props.match.params.id,
            (fbNap) => {
                const nap = new Nap();
                nap.fromFirebaseDoc(fbNap);
                setNap(nap);
            },
            () => {
                toast.error("Nap not found.", {
                    onClose: () => {
                        goBack();
                    },
                });
            }
        );
        // eslint-disable-next-line
    }, []);

    const goBack = () => {
        history.push('/');
    }

    const saveNap = (start, end, notes) => {
        nap.start = start;
        nap.end = end;
        nap.notes = notes;
        setNap(nap);
        props.napsFunctions.updateNap(nap, () => { history.goBack();});
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
        </section>
    );
}

EditNap.propTypes = {
    nap: PropTypes.objectOf(Nap),
    napsFunctions: PropTypes.object
};

export default EditNap;
