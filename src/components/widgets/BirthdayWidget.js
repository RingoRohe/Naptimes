import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './birthday.scss';

const BirthdayWidget = props => {
    let today = new Date();
    let childBirthday = new Date(props.currentUser.settings.childBirthday);
    let todayString = `${today.getDate()}.${today.getMonth()}`;
    let childBirthdayString = `${childBirthday.getDate()}.${childBirthday.getMonth()}`;
    let years = today.getFullYear() - childBirthday.getFullYear();
    let yearsString = years + (years > 1 ? ' Years' : ' Year');
    
    if ((todayString === childBirthdayString && years > 0)) {
        return (
            <article className="card birthday">
                <span class="background fas fa-birthday-cake"></span>
                <h2>Happy Birthday</h2>
                <p>
                    {props.currentUser.settings.childName} turns {yearsString}{" "}
                    today. \o/
                </p>
            </article>
        );
    } else if (todayString === childBirthdayString && years === 0) {
        return (
            <article className="card birthday newborn">
                <span class="background fas fa-baby-carriage"></span>
                <h2>Happy Birthday</h2>
                <p>Congratulations!</p>
            </article>
        );
    } else {
        return null;
    }
}

BirthdayWidget.propTypes = {
    currentUser: PropTypes.object.isRequired
}

export default BirthdayWidget
