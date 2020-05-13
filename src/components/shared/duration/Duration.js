import React from 'react'
import PropTypes from 'prop-types'

const Duration = props => {
    let timeInMiliseconds = props.milliseconds || Date.now();
    let showHours = props.showHours !== undefined ? props.showHours : true;
    let showMinutes = props.showMinutes !== undefined ? props.showMinutes : true;
    let showSeconds = props.showSeconds !== undefined ? props.showSeconds : true;

    let h, m, s;
    h = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
    m = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((timeInMiliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60);

    const getHours = () => {
        if (h > 0) {
            h < 10 ? (h = `0${h}`) : (h = `${h}`);
            return h + 'h';
        }
        return false;
    }
    const getMinutes = () => {
        if (m > 0) {
            m < 10 ? (m = `0${m}`) : (m = `${m}`);
            return m + 'm';
        }
        return false;
    }
    const getSeconds = () => {
        if (s > 0) {
            s < 10 ? (s = `0${s}`) : (s = `${s}`);
            return s + 's';
        }
        return false;
    }

    return (
        <span>
            {showHours ? getHours() : ''}
            {showHours && showMinutes ? ' ' : ''}
            {showMinutes ? getMinutes() : ''}
            {showMinutes && showSeconds ? ' ' : ''}
            {showSeconds ? getSeconds() : ''}
        </span>
    );
}

Duration.propTypes = {
    milliseconds: PropTypes.number,
    showHours: PropTypes.bool,
    showMinutes: PropTypes.bool,
    showSeconds: PropTypes.bool
}

export default Duration
