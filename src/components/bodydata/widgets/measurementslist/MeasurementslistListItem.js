// React
import React from 'react';
import { useHistory } from 'react-router-dom';

// Libs
import { toast } from "react-toastify";

// Models
import Measurement from 'models/Measurement';
import Headline from 'models/Headline';

// Components
import Confirm from "components/shared/modal/Confirm";

const LastMeasurementsListItem = (props) => {
    const history = useHistory();

    const deleteMeasurement = () => {
        props.bodydataController.deleteMeasurement(props.measurement);
        toast.success('deleted', { delay: 500 });
    };

    const onDeleteMeasurementButtonClicked = () => {
        toast(
            <Confirm
                headline="Delete?"
                text="Do you really want to delete this Measurement?"
                onConfirm={deleteMeasurement}
            />,
            {
                autoClose: false,
            }
        );
    };

    const onEditMeasurementButtonClicked = () => {
        history.push(`/bodydata/edit-measurement/${props.measurement.id}`);
    };

    if (props.measurement instanceof Headline) {
        return (
            <li className="headline">
                <h3>{props.measurement.text}</h3>
            </li>
        );
    } else if (props.measurement instanceof Measurement) {
        let icon, data, unit, className = null;
        if (props.measurement.hasWeight()) {
            icon = 'weight';
            className = 'weight'
            data = parseFloat(Math.round(props.measurement.weight / 10) / 100);
            unit = 'kg';
        }
        if (props.measurement.hasBodySize()) {
            icon = 'child';
            className = 'bodySize'
            data = parseFloat(props.measurement.bodySize);
            unit = 'cm';
        }
        if (props.measurement.hasHeadCircumference()) {
            icon = 'circle-notch';
            className = 'headCircumference'
            data = parseFloat(props.measurement.headCircumference);
            unit = 'cm';
        }
        return (
            <li key={props.measurement.id} className="measurement">
                <span className="time">
                    {new Date(props.measurement.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
                <span className={"measurement-icon fas fa-"+icon}></span>
                <span className={"data "+className}>
                    {data.toLocaleString()} {unit}
                </span>
                <ul className="actions">
                    <li>
                        <button
                            className="icon fas fa-trash fa-1x"
                            onClick={onDeleteMeasurementButtonClicked}
                        ></button>
                    </li>
                    <li>
                        <button
                            className="icon fas fa-pen fa-1x"
                            onClick={onEditMeasurementButtonClicked}
                        ></button>
                    </li>
                </ul>
            </li>
        );
    }
}

export default LastMeasurementsListItem;