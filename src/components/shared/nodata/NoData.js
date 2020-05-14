import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './nodata.scss'

const NoData = props => {
    return (
        <div className={props.className + ' nodata'}>
            {props.headline ? (
                <h2>{props.headline}</h2>
            ) : (null)}
            {props.text ? (
                <p>{props.text}</p>
            ) : (null)}
        </div>
    )
}

NoData.propTypes = {
    headline: PropTypes.string,
    text: PropTypes.string
}

export default NoData
