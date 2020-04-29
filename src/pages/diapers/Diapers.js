// React
import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Components
import Confirm from 'components/shared/modal/Confirm';

// Models
import Nap from 'models/Nap';

// Libs
import { toast } from "react-toastify";

// Styles
import './diapers.scss';

const Diapers = props => {
    return (
        <section className="page_diapers">
            <article className="card">
                <h2>Test</h2>
            </article>
        </section>
    );
}

Diapers.propTypes = {

};

export default Diapers;
