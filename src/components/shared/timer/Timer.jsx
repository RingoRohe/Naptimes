import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const Timer = props => {
    let [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // console.log('useEffect in Timer.js');
        let interval = null;
        if (props.start) {
            setElapsedTime(Date.now() - props.start);
            interval = setInterval(() => {
                setElapsedTime(Date.now() - props.start);
            }, 1000);
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
    }, [props.start]);

    return (
        <span className={props.class || "timer"}>
            {new Date(elapsedTime).toLocaleTimeString([], {
                timeZone: "UTC"
            })}
        </span>
    );
}

Timer.propTypes = {
    start: PropTypes.number
}

export default Timer
