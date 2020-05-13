// React
import React from 'react';
import PropTypes from 'prop-types';

// Libs
import { toast } from "react-toastify";

// Styles
import './diapers.scss';
import DiapersForm from 'components/diapers/diapersform/DiapersForm';
import DiaperslistWidget from 'components/diapers/widgets/diaperslist/DiaperslistWidget';
import ChartDaily from 'components/diapers/widgets/dailychart/ChartDaily';

const Diapers = props => {
    const onDiaperSave = (diaper) => {
        props.diapersController.createDiaper(diaper, () => {
            toast.success('Diaper saved!');
        });
    }
    return (
        <section className="page_diapers">
            <article className="card diaperform">
                <DiapersForm onSubmit={onDiaperSave} />
            </article>
            <article className="card diaperslist">
                <DiaperslistWidget diapers={props.diapers} diapersController={props.diapersController} />
            </article>
            <ChartDaily className="card dailychart" diapers={props.diapers} />
        </section>
    );
}

Diapers.propTypes = {
    diapersController: PropTypes.object
};

export default Diapers;
