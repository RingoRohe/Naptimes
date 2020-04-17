// React
import React from 'react';

// Components
import LastNapsListItem from './NaplistListItem';

// Styles
import './naplist.scss';

const NaplistWidget = (props) => {
    return (
        <article className={props.className}>
            <span className="card_icon fas fa-list fa-3x"></span>
            <h2>last Naps</h2>
            <ul className="last_naps_list">
                {props.naps.map((item) => (
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