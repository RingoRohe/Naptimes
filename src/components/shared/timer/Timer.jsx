import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const Timer = props => {
    let [timeString, setTimeString] = useState(0);
    let options = { hideSeconds: false, hideMinutes: false, hideHours: false, ...props };
    let { start, tick, hideSeconds, hideMinutes, hideHours } = options;

    // get the desired interval
    let tick_ms = 0;
    if (typeof (tick) === 'number') {
        tick_ms = Math.floor(tick);
    } else if (['secondly', 'every second', 'once per second'].includes(tick)) {
        tick_ms = 1000;
    } else if (['minutely', 'every minute', 'once per minute'].includes(tick)) {
        tick_ms = 1000 * 60;
        hideSeconds = true;
    } else if (['hourly', 'every hour', 'once per hour'].includes(tick)) {
        tick_ms = 1000 * 60 * 60;
        hideMinutes = true;
    } else {
        tick_ms = 1000; // default to 1 Second
    }

    const ticker = () => {
        // get the digits
        let h, m, s;
        let now = Date.now();
        h = Math.floor((now - start) / 1000 / 60 / 60);
        m = Math.floor(((now - start) / 1000 / 60 / 60 - h) * 60);
        s = Math.floor((((now - start) / 1000 / 60 / 60 - h) * 60 - m) * 60);

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

        // format digits
        let timeString = '';
        timeString += !hideHours ? getHours() : '';
        timeString += !hideHours && !hideMinutes ? ' ' : '';
        timeString += !hideMinutes ? getMinutes() : '';
        timeString += !hideMinutes && !hideSeconds ? ' ' : '';
        timeString += !hideSeconds ? getSeconds() : '';

        setTimeString(timeString);
    }

    useEffect(() => {
        // console.log('useEffect in Timer.js');

        let interval = null;
        if (start) {
            ticker();
            interval = setInterval(ticker, tick_ms);
        } else {
            if (interval) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    // eslint-disable-next-line
    }, [start, tick_ms]);

    return (
        <span className={props.class || "timer"}>{timeString}</span>
    );
}

Timer.propTypes = {
    start: PropTypes.number,
    tick: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hideSeconds: PropTypes.bool,
    hideMinutes: PropTypes.bool,
    hideHours: PropTypes.bool
}

export default Timer
