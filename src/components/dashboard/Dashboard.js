// react stuff
import React from 'react';

// components
import RunningNapWidget from 'components/naps/RunningNapWidget';
import LastNapsWidget from 'components/naps/LastNapsWidget';

const Dashboard = (props) => {
    return (
        <section className="main">
            {props.runningNap ? <RunningNapWidget naps={props.naps} runningNap={props.runningNap} /> : null}
            <LastNapsWidget firebase={props.firebase} currentUser={props.currentUser} naps={props.naps} />
            <article className="card">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit, esse? Harum, asperiores.
                </p>
            </article>
            <article className="card">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ea expedita animi perferendis dicta architecto!
                </p>
            </article>
        </section>
    );
}

export default Dashboard;