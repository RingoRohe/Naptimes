// React
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';

// libs
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import './settings.scss';

const Settings = props => {
    let [childName, setChildName] = useState('');
    let [childBirthday, setChildBirthday] = useState(0);
    let [delegateUsers, setDelegateUsers] = useState([]);

    let toastId = null;

    useEffect(() => {
        if (props.currentUser && props.currentUser.settings) {
            let sttngs = props.currentUser.settings;
            setChildName(sttngs.childName);
            setChildBirthday(sttngs.childBirthday);
        }
    }, [props.currentUser]);

    useEffect(() => {
        if (props.currentUser && props.currentUser.uid && delegateUsers.length === 0) {
            props.userController.getDelegateUsers(
                props.currentUser,
                (users) => setDelegateUsers(users),
                (err) => { toast.error('error'); });
        }
        // eslint-disable-next-line
    }, [props.currentUser, props.userController]);

    const onChildNameInputChanged = e => {
        setChildName(e.target.value);
    }

    const saveSettings = () => {
        toastId = toast.info("saving...", { autoClose: false });
        childBirthday = childBirthday || 0;
        const settings = {
            childName,
            childBirthday
        };
        props.userController.saveSettings(settings, props.currentUser, () => {
            toast.update(toastId, {
                render: "saved!",
                type: toast.TYPE.SUCCESS,
                autoClose: true
            });
        }, () => {
            toast.update(toastId, {
                render: "not saved!",
                type: toast.TYPE.ERROR,
                autoClose: true,
            });
        });
    }

    const copyText = (e) => {
        /* Get the text field */
        var copyText = e.target;

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        toast.success('copied to clipboard');
    }

    // TODO: add managable List of Delegate Users
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
            <article className="card userid">
                <span className="card_icon far fa-copy fa-3x"></span>
                <h2>your UserID</h2>
                <input type="text" value={props.currentUser.realUid} readOnly onClick={copyText} />
            </article>
            <article className="card delegates">
                <h2>{delegateUsers.length} delegated Users</h2>
                <ul>
                    {delegateUsers.map(user => (
                        <li key={user.uid}>{user.displayName}</li>
                    ))}
                </ul>
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
