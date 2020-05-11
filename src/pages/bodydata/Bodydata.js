// React
import React from 'react'
import PropTypes from 'prop-types'

// Libs
import { toast } from "react-toastify";

// Components
import MeasurementslistWidget from 'components/bodydata/widgets/measurementslist/MeasurementslistWidget';

// Styles
import './bodydata.scss';
import MeasurementForm from 'components/bodydata/measurementform/MeasurementForm';
import Measurement from 'models/Measurement';

const Bodydata = props => {
    const { bodydataController } = props;
    const onMeasurementFormSubmitted = (measurement) => {
        if (measurement.hasWeight()) {
            const weightMeasurement = new Measurement(measurement.time, measurement.weight);
            bodydataController.createMeasurement(
                weightMeasurement,
                () => {toast.success('Weight saved');},
                () => {toast.error('Weight not saved');}
            );
        }
        if (measurement.hasBodySize()) {
            const bodyMeasurement = new Measurement(measurement.time, null, measurement.bodySize);
            bodydataController.createMeasurement(
                bodyMeasurement,
                () => {toast.success('Body Size saved');},
                () => {toast.error('Body Size not saved');}
            );
        }
        if (measurement.hasHeadCircumference()) {
            const headMeasurement = new Measurement(measurement.time, null, null, measurement.headCircumference);
            bodydataController.createMeasurement(
                headMeasurement,
                () => {toast.success('Head Size saved');},
                () => {toast.error('Head Size not saved');}
            );
        }
    }
    return (
        <section className="page_bodydata">
            <article className="card measurementform">
                <MeasurementForm onSubmit={onMeasurementFormSubmitted} />
            </article>
            <article className="card measurementslist">
                <MeasurementslistWidget
                    measurements={props.measurements}
                    bodydataController={props.bodydataController}
                />
            </article>
        </section>
    );
}

Bodydata.propTypes = {
    currentUser: PropTypes.object
}

export default Bodydata
