// React
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

// Components
import LastDiapersListItem from './DiaperslistListItem';

// Styles
import './diaperslist.scss';
import Headline from 'models/Headline';

const DiaperslistWidget = (props) => {
    let [lastDiapers, setLastDiapers] = useState([]);
    
    const formatDate = (date) => {
        return date.toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    useEffect(() => {
        // console.log('useEffect in LastDiapersWidget.js');
        let tempDiapers = [];
        let lastDate = '';
        props.diapers.forEach((diaper, index) => {
            // add Headline if neccessary
            const diaperDate = formatDate(new Date(diaper.time));
            if (diaperDate !== lastDate) {
                lastDate = diaperDate;
                let headline = new Headline(diaperDate, diaperDate);
                tempDiapers.push(headline);
            }
            // add Nap
            tempDiapers.push(diaper);
        });
        setLastDiapers(tempDiapers);
    }, [props.diapers]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>Diapers</h2>
            <ul className="last_diapers_list">
                {lastDiapers.map((item, index) => (
                    <LastDiapersListItem
                        key={item.id}
                        diaper={item}
                        index={index}
                        diapersController={props.diapersController}
                    />
                ))}
            </ul>
        </article>
    );
}

export default DiaperslistWidget;