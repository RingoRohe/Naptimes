// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Measurement from 'models/Measurement';

// Components
import MeasurementForm from 'components/bodydata/measurementform/MeasurementForm';

// Styles
import './editmeasurement.scss';

const EditMeasurement = props => {
    let [measurement, setMeasurement] = useState(null);

    const history = useHistory();
    
    useEffect(() => {
        props.bodydataController.getMeasurementById(
            props.match.params.id,
            (fbMeasurement) => {
                const measurement = new Measurement();
                measurement.fromFirebaseDoc(fbMeasurement);
                setMeasurement(measurement);
            },
            () => {
                toast.error("Measurement not found.", {
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

    const saveMeasurements = (newMeasurement) => {
        if (newMeasurement.hasWeight()) {
            const weightMeasurement = new Measurement(newMeasurement.time, newMeasurement.weight);
            props.bodydataController.createMeasurement(
                weightMeasurement,
                () => { toast.success('Weight saved'); },
                () => { toast.error('Weight not saved'); }
            );
        }
        if (newMeasurement.hasBodySize()) {
            const bodyMeasurement = new Measurement(newMeasurement.time, null, newMeasurement.bodySize);
            props.bodydataController.createMeasurement(
                bodyMeasurement,
                () => { toast.success('Body Size saved'); },
                () => { toast.error('Body Size not saved'); }
            );
        }
        if (newMeasurement.hasHeadCircumference()) {
            const headMeasurement = new Measurement(newMeasurement.time, null, null, newMeasurement.headCircumference);
            props.bodydataController.createMeasurement(
                headMeasurement,
                () => { toast.success('Head Size saved'); },
                () => { toast.error('Head Size not saved'); }
            );
        }
        if (newMeasurement.hasTemperature()) {
            const temperature = new Measurement(newMeasurement.time, null, null, null, newMeasurement.temperature);
            props.bodydataController.createMeasurement(
                temperature,
                () => { toast.success('Temperaturesaved'); },
                () => { toast.error('Temperaturenot saved'); }
            );
        }
        history.goBack();
    }

    const onMeasurementFormSubmitted = (newMeasurement) => {
        props.bodydataController.deleteMeasurement(measurement, () => { saveMeasurements(newMeasurement);});
    }
    
    return (
        <section className="page_measurement_edit">
            {measurement ? (
                <MeasurementForm
                    measurement={measurement}
                    onSubmit={onMeasurementFormSubmitted}
                    headline="edit Measurement"
                />
            ) : (
                <p>Measurement not found.</p>
            )}
        </section>
    );
}

EditMeasurement.propTypes = {
    measurement: PropTypes.objectOf(Measurement),
    bodydataController: PropTypes.object
};

export default EditMeasurement;
