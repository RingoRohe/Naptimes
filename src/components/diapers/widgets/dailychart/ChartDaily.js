import React from 'react'
import PropTypes from 'prop-types'

// libs
import { GoogleCharts } from 'google-charts';

// Styles
import styles from "./chartDaily.scss";
import { useEffect } from 'react';

const ChartDaily = props => {
    let { diapers, maxDays = 7 } = props;
    let timeout = null;
    let data = [];

    const prepareData = () => {
        let date = '';
        let numPee = 0;
        let numPoo = 0;
        let numUndef = 0;

        diapers.forEach(diaper => {
            if (data.length < maxDays) {
                let tempDate = new Date(diaper.time).toLocaleDateString();
                // check if we have reached the next day
                if (tempDate !== date) {
                    // add last day to data array if not null
                    if (date !== '') {
                        data.push([date, numUndef, numPee, numPoo]);
                    }
                    date = tempDate;
                    numPee = 0;
                    numPoo = 0;
                    numUndef = 0;
                }
                // increment Pee and Poo
                numPee += diaper.pee ? 1 : 0;
                numPoo += diaper.poo ? 1 : 0;
                numUndef += !diaper.poo && !diaper.pee ? 1 : 0;
            }
        });
        if (data.length < maxDays) {
            data.push([date, numUndef, numPee, numPoo]);
        }
    }

    function prepareChart() {
        var dataTable = new GoogleCharts.api.visualization.DataTable();
        dataTable.addColumn("string", "Date");
        dataTable.addColumn("number", "Not set");
        dataTable.addColumn("number", "Pee");
        dataTable.addColumn("number", "Poo");

        data.reverse();
        dataTable.addRows(data);

        var options = {
            title: "Diapers per Day",
            isStacked: true,
            colors: ['grey', styles.yellow, styles.brown],
        };

        var chart = new GoogleCharts.api.visualization.ColumnChart(
            document.getElementById("diaperschart")
        );

        chart.draw(dataTable, options);
    }

    const drawChart = () => {
        if (diapers && diapers.length > 0) {
            data = [];
            prepareData();
            GoogleCharts.load(prepareChart, { packages: ["corechart", "bar"] });
        }
    }

    drawChart();

    const _handleWindowResize = () => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            drawChart();
        }, 1000);
    }

    const ChartContainer = () => {
        return (
            <div id={"diaperschart"}></div>
        );
    };

    useEffect(() => {
        window.addEventListener("resize", _handleWindowResize);

        return (() => {
            window.removeEventListener("resize", _handleWindowResize);
        })
        // eslint-disable-next-line
    }, [diapers]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-chart-line fa-3x"></span>
            <ChartContainer><p>Still gathering Data...</p></ChartContainer>
        </article>
    );
}

ChartDaily.propTypes = {
    diapers: PropTypes.array.isRequired,
    maxDays: PropTypes.number
}

export default ChartDaily
