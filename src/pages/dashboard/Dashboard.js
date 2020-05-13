// react stuff
import React from 'react';
import PropTypes from 'prop-types';

// Models
import Nap from 'models/Nap';

// components
import RunningNapWidget from 'components/naps/widgets/runningnap/RunningNapWidget';
import LastNapWidget from 'components/naps/widgets/lastnap/LastNapWidget';
import StartNapMultiButton from 'components/naps/widgets/startnap/StartNapMultiButton';
import AgeWidget from 'components/widgets/AgeWidget';
import BirthdayWidget from 'components/widgets/BirthdayWidget';
import LastDiaperWidget from 'components/diapers/widgets/lastdiaper/LastDiaperWidget';
import AddDiaperButton from 'components/diapers/widgets/adddiaper/AddDiaperButton';
import DiaperChartDaily from 'components/diapers/widgets/dailychart/ChartDaily';

// Styles
import './dashboard.scss';
import BodydataChart from 'components/bodydata/widgets/chart/BodydataChart';

const Dashboard = (props) => {
    return (
        <section className="main">
            <BirthdayWidget currentUser={props.currentUser} />
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
                naps={props.naps}
                napsFunctions={props.napsFunctions}
            />
            <AddDiaperButton diapersController={props.diapersController} />
            <LastDiaperWidget
                diapers={props.diapers}
                diapersController={props.diapersController}
            />
            <DiaperChartDaily className='card' diapers={props.diapers} maxDays={3} />
            <BodydataChart className="card bodydatachart" measurements={props.measurements} />
            {props.currentUser.settings.childBirthday > 0 ? (
                <AgeWidget
                    birthday={props.currentUser.settings.childBirthday}
                    title={"Age of " + props.currentUser.settings.childName}
                />
            ) : null}
        </section>
    );
}

Dashboard.propTypes = {
    currentUser: PropTypes.object,
    runningNap: PropTypes.instanceOf(Nap),
    napsFunctions: PropTypes.object
};

export default Dashboard;