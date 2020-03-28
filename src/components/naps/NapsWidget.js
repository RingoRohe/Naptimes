import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const NapsWidget = (props) => {
    let [elapsedTime, setElapsedTime] = useState(0);
    
    useEffect(() => {
        // console.log('useEffect in RunningNapWidget.js');
        let interval = null;
        if (props.runningNap) {
            var offset = new Date().getTimezoneOffset() * 60 * 1000;
            setElapsedTime(Date.now() - props.runningNap.start + offset);
            interval = setInterval(() => {
                setElapsedTime(Date.now() - props.runningNap.start + offset);
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
        props.napsController.finishNap();
    };

    return props.runningNap ? (
        <article className="naps_widget running card">
            <span className="icon fas fa-bed fa-3x"></span>
            <p>Your Buddy is sleeping...</p>
            <span className="timer">{new Date(elapsedTime).toLocaleTimeString()}</span>
            <button onClick={onFinishNapButtonClick}>Nap finished<span className="default">?</span><span className="hover">!</span></button>
        </article>
    ) : (
        <article className="naps_widget card">
            <span className="icon fas fa-bed fa-3x"></span>
            <p>no Nap running</p>
        </article>
    );
}

export default NapsWidget;