import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const RunningNapWidget = (props) => {
    let [elapsedTime, setElapsedTime] = useState(0);
    
    useEffect(() => {
        // console.log('useEffect in RunningNapWidget.js');
        let interval = null;
        if (props.runningNap) {
            // offset = 0;
            setElapsedTime(Date.now() - props.runningNap.start);
            interval = setInterval(() => {
                setElapsedTime(Date.now() - props.runningNap.start);
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
    }, [props.runningNap]);

    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.naps.finishNap();
    };

    return (
        <article className="naps_widget running card">
            <span className="card_icon fas fa-bed fa-3x"></span>
            <p>Your Buddy is sleeping...</p>
            <span className="timer">
                {new Date(elapsedTime).toLocaleTimeString([], {
                    timeZone: "UTC"
                })}
            </span>
            <button onClick={onFinishNapButtonClick}>
                Nap finished<span className="default">?</span>
                <span className="hover">!</span>
            </button>
        </article>
    );
}

export default RunningNapWidget;