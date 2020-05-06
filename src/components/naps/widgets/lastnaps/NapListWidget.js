// React
import React from 'react';
import { useEffect, useState } from 'react';

// Models
import Awake from 'models/Awake';

// Components
import LastNapsListItem from './NapListItem';

// Styles
import '../napswidget.scss';
import './naplist.scss';
import Headline from 'models/Headline';
import Nap from 'models/Nap';

const LastNapsWidget = (props) => {
    let [lastNaps, setLastNaps] = useState([]);
    let { maxNaps = 0 } = props;

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
        let napsToUse = props.naps;
        if (maxNaps > 0) {
            napsToUse = napsToUse.slice(0, maxNaps);
        }
        let lastDate = '';
        napsToUse.forEach((nap, index) => {
            // if new Cycle (new Day) add Headline
            const napDate = formatDate(new Date(nap.start));
            if (napDate !== lastDate) {
                lastDate = napDate;
                let headline = new Headline(napDate, napDate);
                tempNaps.push(headline);
            }
            // if this is the last nap and nap is running, add time from end until running nap
            if (index === 0 && props.runningNap) {
                const newNap = new Nap(
                    props.runningNap.start,
                    props.runningNap.end,
                    props.runningNap.notes,
                    props.runningNap.id+'2'
                );
                tempNaps.push(newNap);
                const currentAwake = new Awake(
                    napsToUse[index].end,
                    props.runningNap.start,
                    nap.id + "_" + props.runningNap.id
                );
                tempNaps.push(currentAwake);
            }
            // if this is the last nap, add time from end until now
            if (index === 0 && !props.runningNap) {
                const currentAwake = new Awake(
                    napsToUse[index].end,
                    Date.now(),
                    nap.id + '_',
                    true
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
    }, [props.naps, props.runningNap, maxNaps]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>last Naps</h2>
            <ul className="naps_list">
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