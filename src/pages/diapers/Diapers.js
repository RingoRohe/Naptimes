// React
import React from 'react';
import PropTypes from 'prop-types';

// Libs
import { toast } from "react-toastify";

// Styles
import './diapers.scss';
import DiapersForm from 'components/diapers/diapersform/DiapersForm';

const Diapers = props => {
    const onDiaperSave = (diaper) => {
        console.log(diaper);
        props.diapersController.createDiaper(diaper, () => {
            toast.success('Diaper saved!');
        });
    }
    return (
        <section className="page_diapers">
            <article className="card">
                <DiapersForm onSubmit={onDiaperSave} />
            </article>
            <article className="card">
                <h2>Test</h2>
            </article>
        </section>
    );
}

Diapers.propTypes = {
    diapersController: PropTypes.object
};

export default Diapers;
