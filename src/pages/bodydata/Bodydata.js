// React
import React from 'react'
import PropTypes from 'prop-types'

// Libs
import { toast } from "react-toastify";

// Styles
import './bodydata.scss';
import MeasurementForm from 'components/bodydata/measurementform/MeasurementForm';

const Bodydata = props => {
    const { bodydataController } = props;
    const onMeasurementFormSubmitted = (measurement) => {
        bodydataController.createMeasurement(
            measurement,
            () => {toast.success('Measurement saved');},
            () => {toast.error('Measurement not saved');}
        );
    }
    return (
        <section className="page_bodydata">
            <article className="card measurementform">
                <MeasurementForm onSubmit={onMeasurementFormSubmitted} />
            </article>
        </section>
    );
}

Bodydata.propTypes = {
    currentUser: PropTypes.object
}

export default Bodydata
