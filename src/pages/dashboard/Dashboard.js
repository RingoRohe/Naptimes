// react stuff
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// components
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';
import LastNapsWidget from 'components/naps/widgets/lastnaps/LastNapsWidget';
import LastNapWidget from 'components/naps/widgets/lastnap/LastNapWidget';
import StartNapMultiButton from 'components/naps/widgets/startnap/StartNapMultiButton';
import AgeWidget from 'components/widgets/AgeWidget';

const Dashboard = (props) => {
    return (
        <section className="main">
            {props.runningNap ? null : (
                <StartNapMultiButton napsFunctions={props.napsFunctions} />
            )}
            {props.runningNap ? (
                <RunningNapWidget
                    napsFunctions={props.napsFunctions}
                    runningNap={props.runningNap}
                    currentUser={props.currentUser}
                />
            ) : null}
            <LastNapWidget
                firebase={props.firebase}
                currentUser={props.currentUser}
                napsFunctions={props.napsFunctions}
            />
            <AgeWidget
                birthday={props.currentUser.settings.childBirthday}
                title={"Age of " + props.currentUser.settings.childName}
            />
            <LastNapsWidget
                className="naps_widget last card"
                napsFunctions={props.napsFunctions}
                naps={props.naps}
                runningNap={props.runningNap}
            />
        </section>
    );
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap),
    napsFunctions: PropTypes.object
};

export default Dashboard;