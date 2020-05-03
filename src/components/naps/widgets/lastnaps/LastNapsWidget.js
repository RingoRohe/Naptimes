// React
import React from 'react';
import { useEffect, useState } from 'react';

// Models
import Awake from 'models/Awake';

// Components
import LastNapsListItem from './LastNapsListItem';

// Styles
import '../napswidget.scss';
import './lastnaps.scss';
import Headline from 'models/Headline';

const LastNapsWidget = (props) => {
    let [lastNaps, setLastNaps] = useState([]);

    const formatDate = (date) => {
        return date.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        // console.log('useEffect in LastNapsWidget.js');
        let tempNaps = [];
        let napsToUse = props.naps.slice(0, 3);
        let lastDate = '';
        napsToUse.forEach((nap, index) => {
            const napDate = formatDate(new Date(nap.start));
            if (napDate !== lastDate) {
                lastDate = napDate;
                let headline = new Headline(napDate, napDate);
                tempNaps.push(headline);
            }
            // if this is the last nap, add time from end until now
            if (index === 0 && !props.runningNap) {
                const currentAwake = new Awake(
                    napsToUse[index].end,
                    Date.now(),
                    nap.id + '_'
                );
                tempNaps.push(currentAwake);
            }
            // add Nap
            tempNaps.push(nap);
            // add awake time between current nap and the one before
            if (index+1 < napsToUse.length) {
                const awake = new Awake(
                    napsToUse[index + 1].end,
                    napsToUse[index].start,
                    napsToUse[index].id + napsToUse[index+1].id
                );
                tempNaps.push(awake);
            }
        });
        setLastNaps(tempNaps);
    }, [props.naps, props.runningNap]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {lastNaps.map((item, index) => (
                    <LastNapsListItem
                        key={item.id}
                        nap={item}
                        index={index}
                        naps={props.napsFunctions}
                    />
                ))}
            </ul>
        </article>
    );
}

export default LastNapsWidget;