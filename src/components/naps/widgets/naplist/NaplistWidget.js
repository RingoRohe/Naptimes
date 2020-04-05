// React
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Models
import Nap from 'models/Nap';

// Components
import LastNapsListItem from './NaplistListItem';

// Styles
import './naplist.scss';

const NaplistWidget = (props) => {
    let [naps, setNaps] = useState([]);
    
    useEffect(() => {
        // console.log('useEffect in NaplistWidget.js');
        let unbindFirestore = props.naps.getNaps(3)
            .onSnapshot(snapshot => {
                let naps = [];
                if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                        if (doc.data().end > 0) {
                            let nap = new Nap();
                            nap.fromFirebaseDoc(doc);
                            naps.push(nap);
                        }
                    })
                    setNaps(naps);
                } else {
                    setNaps([]);
                }
            });
        
        return () => {
            unbindFirestore();
        };
    }, [props.naps]);

    return (
        <article className={props.className}>
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {naps.map(item => (
                    <LastNapsListItem key={item.id} nap={item} naps={props.naps}/>
                ))}
            </ul>
        </article>
    );
}

export default NaplistWidget;