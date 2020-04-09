// react stuff
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// components
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';
import LastNapsWidget from 'components/naps/widgets/lastnaps/LastNapsWidget';
import LastNapWidget from 'components/naps/widgets/lastnap/LastNapWidget';
import StartNapButton from 'components/naps/widgets/startnap/StartNapButton';

const Dashboard = (props) => {
    return (
        <section className="main">
            {props.runningNap ? null : <StartNapButton napsFunctions={props.napsFunctions} />}
            {props.runningNap ? <RunningNapWidget napsFunctions={props.napsFunctions} runningNap={props.runningNap} /> : null}
            <LastNapWidget firebase={props.firebase} currentUser={props.currentUser} napsFunctions={props.napsFunctions} />
            <LastNapsWidget className="naps_widget last card" napsFunctions={props.napsFunctions} />
            <article className="card">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum amet iure enim fugiat dolorum unde commodi adipisci eaque minima ex tempore facere reprehenderit, facilis ipsam, repellendus illum. Odit, accusamus delectus!
                </p>
            </article>
        </section>
    );
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap),
    napsFunctions: PropTypes.object
};

export default Dashboard;