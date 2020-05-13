// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Diaper from 'models/Diaper';

// Components
import DiapersForm from 'components/diapers/diapersform/DiapersForm';

// Styles
import './edit_diaper.scss';

const EditDiaper = props => {
    let [diaper, setDiaper] = useState(null);

    const history = useHistory();
    
    useEffect(() => {
        props.diapersController.getDiaperById(
            props.match.params.id,
            (fbDiaper) => {
                const diaper = new Diaper();
                diaper.fromFirebaseDoc(fbDiaper);
                setDiaper(diaper);
            },
            () => {
                toast.error("Diaper not found.", {
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

    const saveDiaper = (updatedDiaper) => {
        updatedDiaper.id = diaper.id;
        props.diapersController.updateDiaper(updatedDiaper, () => {
            setDiaper(updatedDiaper);
            toast.success('updated');
            history.goBack();
        });
    }
    
    return (
        <section className="page_diaper_edit">
            {diaper ? (
                <DiapersForm
                    time={diaper.time}
                    pee={diaper.pee}
                    poo={diaper.poo}
                    notes={diaper.notes}
                    onSubmit={saveDiaper}
                    headline="edit Diaper"
                />
            ) : (
                <p>Diaper not found.</p>
            )}
        </section>
    );
}

EditDiaper.propTypes = {
    diaper: PropTypes.objectOf(Diaper),
    diapersController: PropTypes.object
};

export default EditDiaper;
