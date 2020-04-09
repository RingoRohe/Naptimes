// React
import React from 'react';

// Components
import LastNapsListItem from './NaplistListItem';

// Styles
import './naplist.scss';

const NaplistWidget = (props) => {
    return (
        <article className={props.className}>
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {props.naps.map(item => (
                    <LastNapsListItem
                        key={item.id}
                        nap={item}
                        napsFunctions={props.napsFunctions}
                    />
                ))}
            </ul>
        </article>
    );
}

export default NaplistWidget;