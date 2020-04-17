// React
import React from 'react';
import { useEffect, useState } from 'react';

// Components
import LastNapsListItem from './LastNapsListItem';

// Styles
import '../napswidget.scss';
import './lastnaps.scss';

const LastNapsWidget = (props) => {
    let [lastNaps, setLastNaps] = useState([]);
    
    useEffect(() => {
        // console.log('useEffect in LastNapsWidget.js');
        let tempNaps = [];
        props.naps.forEach((nap, index) => {
            if (index < 3) {
                tempNaps.push(nap);
            }
        });
        setLastNaps(tempNaps);
    }, [props.naps]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {lastNaps.map((item) => (
                    <LastNapsListItem
                        key={item.id}
                        nap={item}
                        naps={props.napsFunctions}
                    />
                ))}
            </ul>
        </article>
    );
}

export default LastNapsWidget;