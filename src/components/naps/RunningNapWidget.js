import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Nap from 'models/Nap';

const RunningNapWidget = (props) => {
    let [elapsedTime, setElapsedTime] = useState(0);
    let [runningNap, setRunningNap] = useState(null);
    
    useEffect(() => {
        // console.log('count');
        let interval = null;

        // bind to running nap
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
        let last = ref.orderBy('start').where('start', '>', 0).where('end', '==', 0).limit(1);
        const unmountRunningNapListener = last.onSnapshot(snapshot => {
            if (snapshot.empty) {
                setRunningNap(null);
                if (interval) {
                    clearInterval(interval);
                }
            } else {
                const nap = new Nap();
                nap.fromObject({
                    start: snapshot.docs[0].data().start,
                    end: snapshot.docs[0].data().end
                });
                setRunningNap(nap);

                var offset = new Date().getTimezoneOffset()*60*1000;
                setElapsedTime(Date.now() - nap.start + offset);
                interval = setInterval(() => {
                    setElapsedTime(Date.now() - nap.start + offset);
                    // console.log('interval running');
                }, 1000);
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

        return () => {
            unmountRunningNapListener();
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [props.firebase, props.currentUser]);

    return (
        <article className="card">
            {<p>
                {runningNap ? (new Date(elapsedTime)).toLocaleTimeString() : "no Nap running"}
            </p>}
        </article>
    );
}

export default RunningNapWidget;