// React
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// Models
import Nap from 'models/Nap';

// Components
import LastNapsListItem from './LastNapsListItem';

// Styles
import '../napswidget.scss';
import './lastnaps.scss';

const LastNapsWidget = (props) => {
    let [lastNaps, setLastNaps] = useState([]);
    
    useEffect(() => {
        // console.log('useEffect in LastNapsWidget.js');
        if (props.currentUser && props.currentUser.uid) {
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
                        setLastNaps(naps);
                    } else {
                        setLastNaps([]);
                    }
                });
            
            return () => {
                unbindFirestore();
            };
        }
    }, [props.currentUser, props.naps]);

    return (
        <article className="naps_widget last card">
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {lastNaps.map(item => (
                    <LastNapsListItem key={item.id} nap={item} naps={props.naps}/>
                ))}
            </ul>
        </article>
    );
}

export default LastNapsWidget;