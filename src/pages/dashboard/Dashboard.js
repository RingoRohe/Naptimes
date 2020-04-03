// react stuff
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// components
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';
import LastNapsWidget from 'components/naps/widgets/lastnaps/LastNapsWidget';
import LastNapWidget from 'components/naps/widgets/lastnap/LastNapWidget';
import Onboarding from '../onboarding/Onboarding';

const Dashboard = (props) => {
    return (
        props.currentUser
        ? (<section className="main">
            {props.runningNap? <RunningNapWidget naps={props.naps} runningNap={props.runningNap} /> : null}
            <LastNapsWidget firebase={props.firebase} currentUser={props.currentUser} naps={props.naps} />
            <LastNapWidget firebase={props.firebase} currentUser={props.currentUser} naps={props.naps} />
            <article className="card">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum amet iure enim fugiat dolorum unde commodi adipisci eaque minima ex tempore facere reprehenderit, facilis ipsam, repellendus illum. Odit, accusamus delectus!
                </p>
            </article>
            </section>)
        : <Onboarding/>
    );
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap),
    naps: PropTypes.object
}

export default Dashboard;