// React
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

// Components
import MeasurementsListItem from './MeasurementslistListItem';

// Styles
import './measurementslist.scss';
import Headline from 'models/Headline';

const MeasurementslistWidget = (props) => {
    let [lastMeasurements, setLastMeasurements] = useState([]);
    
    const formatDate = (date) => {
        return date.toLocaleDateString([], {
            weekday: 'short',
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    useEffect(() => {
        // console.log('useEffect in LastMeasurementsWidget.js');
        let tempMeasurements = [];
        let lastDate = '';
        props.measurements.forEach((measurement, index) => {
            // add Headline if neccessary
            const measurementDate = formatDate(new Date(measurement.time));
            if (measurementDate !== lastDate) {
                lastDate = measurementDate;
                let headline = new Headline(measurementDate, measurementDate);
                tempMeasurements.push(headline);
            }
            // add Measurement
            tempMeasurements.push(measurement);
        });
        setLastMeasurements(tempMeasurements);
    }, [props.measurements]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>Measurements</h2>
            <ul className="last_measurements_list">
                {lastMeasurements.map((item, index) => (
                    <MeasurementsListItem
                        key={item.id}
                        measurement={item}
                        index={index}
                        bodydataController={props.bodydataController}
                    />
                ))}
            </ul>
        </article>
    );
}

export default MeasurementslistWidget;