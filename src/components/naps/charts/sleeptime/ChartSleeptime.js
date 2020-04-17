import React from 'react'
import PropTypes from "prop-types";

// libs
import { GoogleCharts } from 'google-charts';

// Styles
import styles from './chartSleeptime.scss';
import '../tooltip.scss';

const ChartSleeptime = props => {
    let data = [];

    const tooltip = (nap) => {
        let startDate = new Date(nap.start);
        let endDate = new Date(nap.end);
        return `<div class="tootltip">
            <h3>${nap.notes ? nap.notes : "no notes"}</h3>
            <p class="duration">${startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })} - ${endDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</p>
            </div>`;
    }

    const sortNapsIntoDays = (naps) => {
        let sortedNaps = [];

        /*
        *   Walk through all naps und sort them to its belonging Day.
        *   If a Nap reaches over two Days, split it.
        */
        
        naps.forEach((nap) => {
            let offset = 24 * 60 * 60 * 1000; // 1 day
            let day = null;

            let startDate = new Date(nap.start);
            let endDate = new Date(nap.end);

            if (startDate.getDate() === endDate.getDate()) {
                // create new Date at day with time 0:0:0 as index
                day = new Date(startDate);
                day.setHours(0, 0, 0, 0);
                // create array index if not exists
                sortedNaps.push({
                    day: day.getTime(),
                    start: nap.start,
                    end: nap.end,
                    nap,
                });
            } else {
                // nap was overnight so split it into two days
                // part one: start until midnight (startdate stays untouched)
                
                // change end Date to 23:59:59 of start Day
                let endOfFirstPart = new Date(endDate);
                endOfFirstPart.setHours(23, 59, 59, 999);
                endOfFirstPart.setTime(endOfFirstPart.getTime() - offset);

                day = new Date(nap.start);
                day.setHours(0, 0, 0, 0);

                sortedNaps.push({
                    'day': day.getTime(),
                    'start': nap.start,
                    'end': endOfFirstPart.getTime(),
                    nap
                });

                // part two: midnight until end

                // change start of Nap to 0:0:0 of end Day
                let startOfSecondPart = new Date(startDate);
                startOfSecondPart.setHours(0, 0, 0, 0);
                startOfSecondPart.setTime(startOfSecondPart.getTime() + offset);

                day = new Date(startOfSecondPart);
                day.setHours(0, 0, 0, 0);

                sortedNaps.push({
                    day: day.getTime(),
                    start: startOfSecondPart.getTime(),
                    end: nap.end,
                    nap,
                });
            }
        });

        return sortedNaps;
    }

    function prepareChartData() {
        const sortedNaps = sortNapsIntoDays(props.naps);
        // console.log(sortedNaps);
        
        let dates = {};
        sortedNaps.forEach((napObject) => {
            const date = new Date(napObject.day);
            
            if (!(date.toLocaleDateString() in dates)) {
                dates[date.toLocaleDateString()] = 0;
            }
            dates[date.toLocaleDateString()] += (napObject.end - napObject.start);
        });

        for (let date in dates) {
            let h, m;
            h = Math.floor(dates[date] / 1000 / 60 / 60);
            m = Math.floor((dates[date] / 1000 / 60 / 60 - h) * 60);

            data.push([date, timeToDecimal(`${h}:${m}`)]);
        }

        data.reverse();
    }

    function drawCharts() {
        const container = document.getElementById("sleeptimechart");
        const chart = new GoogleCharts.api.visualization.AreaChart(container);
        const dataTable = new GoogleCharts.api.visualization.DataTable();
        const date_formatter = new GoogleCharts.api.visualization.DateFormat({
            pattern: "HH:MM",
        });
        
        var chartData = GoogleCharts.api.visualization.arrayToDataTable([["Date", "Hours of Sleep"]].concat(data));

        var options = {
            hAxis: { title: "Date" },
            vAxis: { minValue: 0, maxValue: 20 },
            colors: [styles.timelineSingleColor]
        };

        chart.draw(chartData, options);
    };

    const timeToDecimal = (t) => {
        var arr = t.split(":");
        var dec = parseInt((arr[1] / 6) * 10, 10);

        return parseFloat(
            parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec
        );
    };

    prepareChartData();
    GoogleCharts.load(drawCharts, { packages: ['corechart'] });

    const ChartContainer = () => {
        return (
            <div>
                <h2>Sleeptimes</h2>
                <div id={"sleeptimechart"}></div>
            </div>
        );
    }

    return (
        <article className={props.className + " card"}>
            <span className="card_icon fas fa-chart-line fa-3x"></span>
            <ChartContainer />
        </article>
    );
}

ChartSleeptime.propTypes = {
    naps: PropTypes.array
};

export default ChartSleeptime
