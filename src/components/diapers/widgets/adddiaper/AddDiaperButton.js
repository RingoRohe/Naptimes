// React
import React from 'react'
import PropTypes from 'prop-types'

// Models
import Diaper from 'models/Diaper';

// Libs
import { toast } from 'react-toastify';

// Styles
import './adddiaperbutton.scss';
import { useState } from 'react';

const AddDiaperButton = props => {
    let [diaper, setDiaper] = useState(new Diaper());

    const saveDiaper = () => {
        props.diapersController.createDiaper(diaper, () => {
            toast.success("new Diaper saved");
            setDiaper(new Diaper());
        }, () => {
            toast.error('not saved');
        });
    }

    const onAddDiaperButtonClick = e => {
        e.preventDefault();
        diaper.time = Date.now();
        saveDiaper();
    };
    
    const onAddDiaperButtonContextClick = e => {
        e.preventDefault();
        toast(<DiaperTimePrompt onButtonClicked={(ms) => {
            diaper.time = Date.now() - ms;
            onAddDiaperButtonContextClick_step2();
        }} />, {
            closeOnClick: false,
            autoClose: false,
            className: "no_padding",
        });
    };

    const onAddDiaperButtonContextClick_step2 = () => {
        toast(
            <DiaperTypePrompt
                onButtonClicked={(pee, poo) => {
                    diaper.pee = pee;
                    diaper.poo = poo;
                    saveDiaper();
                }}
            />,
            {
                closeOnClick: false,
                autoClose: false,
                className: "no_padding",
            }
        );
    };

    const DiaperTypePrompt = props => {
        const onTypeButtonClicked = (pee, poo) => {
            toast.dismiss();
            props.onButtonClicked(pee, poo);
        };
        const onCancelClicked = () => {
            toast.dismiss();
            setDiaper(new Diaper());
        };
        return (
            <div className="diaper_type_prompt">
                <button onClick={() => { onTypeButtonClicked(true, false); }}>Pee</button>
                <button onClick={() => { onTypeButtonClicked(false, true); }}>Poo</button>
                <button onClick={() => { onTypeButtonClicked(true, true); }}>Pee and Poo</button>
                <button onClick={onCancelClicked}>cancel</button>
            </div>
        );
    }

    const DiaperTimePrompt = props => {
        const onTimeButtonClicked = (ms) => {
            toast.dismiss();
            props.onButtonClicked(ms);
        }
        const onCancelClicked = () => {
            toast.dismiss();
            setDiaper(new Diaper());
        }
        return (
            <div className="diaper_time_prompt">
                <button onClick={() => { onTimeButtonClicked(0) }}>now</button>
                <button onClick={() => { onTimeButtonClicked(60*1000) }}>1 Minute ago</button>
                <button onClick={() => { onTimeButtonClicked(2*60*1000) }}>2 Minutes ago</button>
                <button onClick={() => { onTimeButtonClicked(5*60*1000) }}>5 Minutes ago</button>
                <button onClick={() => { onTimeButtonClicked(10*60*1000) }}>10 Minutes ago</button>
                <button onClick={() => { onTimeButtonClicked(15*60*1000) }}>15 Minutes ago</button>
                <button onClick={() => { onTimeButtonClicked(20*60*1000) }}>20 Minutes ago</button>
                <button onClick={() => { onTimeButtonClicked(30*60*1000) }}>30 Minutes ago</button>
                <button onClick={onCancelClicked}>cancel</button>
            </div>
        );
    }

    return (
        <article className="card startstopmulti">
                <button onClick={onAddDiaperButtonClick} onContextMenu={onAddDiaperButtonContextClick}>Add Diaper</button>
        </article>
    );
}

AddDiaperButton.propTypes = {
    diapersController: PropTypes.object
};

export default AddDiaperButton
