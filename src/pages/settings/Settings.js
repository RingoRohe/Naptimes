// React
import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';

// libs
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// styles
import './settings.scss';

const Settings = props => {
    let [childName, setChildName] = useState('');
    let [childBirthday, setChildBirthday] = useState(0);

    useState(() => {
        if (props.currentUser && props.currentUser.settings) {
            let sttngs = props.currentUser.settings;
            setChildName(sttngs.childName);
            setChildBirthday(sttngs.childBirthday);
        }
    }, [props.currentUser]);

    const onChildNameInputChanged = e => {
        setChildName(e.target.value);
    }

    const saveSettings = () => {
        // props.currentUser.settings.childName = childName;
        // props.currentUser.settings.childBirthday = childBirthday;
        // console.log(props.currentUser);
        childBirthday = childBirthday || 0;
        const settings = {
            childName,
            childBirthday
        };
        props.userController.saveSettings(settings, props.currentUser);
    }
    
    return props.currentUser ? (
        <section className="page_settings">
            <article className="card child_name">
                <h2>Your Baby's Name?</h2>
                <input
                    type="text"
                    name="child_name"
                    onFocus={(e) => e.target.select()}
                    value={childName}
                    onChange={onChildNameInputChanged}
                />
            </article>
            <article className="card child_birthday">
                <span className="card_icon fas fa-birthday-cake fa-3x"></span>
                <h2>Baby's Birthday</h2>
                <DatePicker
                    className
                    selected={childBirthday}
                    onChange={(date) => setChildBirthday(date.getTime())}
                    dateFormat="dd.MM.yyyy"
                    showTimeInput
                    inline
                />
            </article>
            <article className="card nopadding save">
                <button onClick={saveSettings}>Save Settings</button>
            </article>
        </section>
    ) : (
        <section className="page_settings main">
            <span>no Settings</span>
        </section>
    );
}

Settings.propTypes = {
    currentUser: PropTypes.object.isRequired,
    userController: PropTypes.object
}

export default Settings
