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
        let numDiapers = 0;

        diapers.forEach(diaper => {
            if (data.length < maxDays) {
                let tempDate = new Date(diaper.time).toLocaleDateString();
                // check if we have reached the next day
                if (tempDate !== date) {
                    // add last day to data array if not null
                    if (date !== '') {
                        data.push([
                            date,
                            numDiapers,
                            numDiapers,
                            numPee,
                            numPoo,
                        ]);
                    }
                    date = tempDate;
                    numPee = 0;
                    numPoo = 0;
                    numDiapers = 0;
                }
                // increment Pee and Poo
                numPee += diaper.pee ? 1 : 0;
                numPoo += diaper.poo ? 1 : 0;
                numDiapers += 1;
            }
        });
        if (data.length < maxDays) {
            data.push([date, numDiapers, numDiapers, numPee, numPoo]);
        }
    }

    function prepareChart() {
        var dataTable = new GoogleCharts.api.visualization.DataTable();
        dataTable.addColumn("string", "Date");
        dataTable.addColumn("number", "Diapers");
        dataTable.addColumn({ type: "number", role: "annotation" });
        dataTable.addColumn("number", "Pee");
        dataTable.addColumn("number", "Poo");

        data.reverse();
        dataTable.addRows(data);

        const min = 0;
        const max = Math.floor(data.reduce((a, b) => a[1] > b[1] ? a : b)[1]) + 2;

        var options = {
            title: "Diapers per Day",
            isStacked: false,
            colors: [styles.timelineSingleColor, styles.yellow, styles.brown],
            seriesType: "bars",
            series: { 0: { type: "area" } },
            backgroundColor: "transparent",
            chartArea: {
                left: 20,
                top: 30,
                bottom: 30
            },
            vAxis: {
                title: "amount",
                viewWindow: {
                    min: min < 0 ? 0 : min,
                    max: max,
                },
            },
        };

        var chart = new GoogleCharts.api.visualization.ComboChart(
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
