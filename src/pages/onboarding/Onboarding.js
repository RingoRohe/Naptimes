// React
import React from 'react'

// Styles
import './onboarding.scss';

const Onboarding = props => {
    return (
        <div className="onboarding">
            <h2>Where am I?</h2>
            <p>
                What you see is a simple <span className="fab fa-react"></span>
                React-JS Project to track data (mostly Sleeptimes) of your
                Toddler/Baby or whatever wears a diaper. But the Main Reason for
                this, is getting Myself into this React-JS Thing and learn
                something new during CoVid-19 Crisis. And therefore you can
                checkout the Sourcecode on <a href="https://github.com/RingoRohe/Naptimes"><span className="fab fa-github"></span> Github</a>.
            </p>
            <p>
                If you want to give it a Try, feel free to <a href="./login">create an Account or login</a>. But be warned: this is far away from finished or even working correctly.
            </p>
        </div>
    );
}

export default Onboarding
