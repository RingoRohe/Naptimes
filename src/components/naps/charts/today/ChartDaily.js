import React from 'react'
import PropTypes from "prop-types";

// libs
import { GoogleCharts } from 'google-charts';

// Styles
import styles from './chartToday.scss';
import '../tooltip.scss';

const ChartDaily = props => {
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

    function prepareChartData() {
        Array.from(Array(7)).forEach((x, i) => {
            // console.log('cycle ' + i);
            data[i] = [];

            data[i]["containerName"] = 'day_chart_' + (i + 1);

            // create dates
            let offset = 24 * 60 * 60 * 1000; // 1 day
            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setTime(startDate.getTime() - offset * i);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            endDate.setTime(endDate.getTime() - offset * i);

            data[i]['startDate'] = startDate;
            data[i]['endDate'] = endDate;

            // get naps from that day
            const filteredNaps = props.naps.filter(
                nap =>
                    nap.end > startDate.getTime() &&
                    nap.start < endDate.getTime()
            );

            // adapt start and end if neccessary
            data[i]["naps"] = filteredNaps.map(nap => {
                let newStartDate = new Date(nap.start);
                let newEndDate = new Date(nap.end);

                if (nap.start < startDate.getTime()) {
                    newStartDate.setHours(0, 0, 0, 0);
                    newStartDate.setTime(newStartDate.getTime() + offset);
                }
                if (nap.end > endDate.getTime()) {
                    newEndDate.setHours(23, 59, 59, 999);
                    newEndDate.setTime(newEndDate.getTime() - offset);
                }

                return [
                    "naps",
                    nap.notes ? nap.notes : "no notes",
                    tooltip(nap),
                    newStartDate,
                    newEndDate
                ];
            });
        });
    }

    function drawCharts() {
        Array.from(Array(7)).forEach((x, i) => {

            if (data[i]['naps'].length > 0) {
                const container = document.getElementById(data[i]["containerName"]);
                const chart = new GoogleCharts.api.visualization.Timeline(container);
                const dataTable = new GoogleCharts.api.visualization.DataTable();
                const date_formatter = new GoogleCharts.api.visualization.DateFormat({
                    pattern: "HH:MM"
                });

                dataTable.addColumn({ type: "string", id: "Name" });
                dataTable.addColumn({ type: "string", id: "notes" });
                dataTable.addColumn({
                    type: "string",
                    role: "tooltip",
                    p: { html: true }
                });
                dataTable.addColumn({ type: "date", id: "Start" });
                dataTable.addColumn({ type: "date", id: "End" });
                dataTable.addRows(data[i]["naps"]);

                date_formatter.format(dataTable, 3);
                date_formatter.format(dataTable, 4);

                var options = {
                    timeline: {
                        showRowLabels: false,
                        singleColor: styles.timelineSingleColor
                    },
                    tooltip: { isHtml: true },
                    // tooltip: { trigger: "selection" },
                    hAxis: {
                        minValue: data[i]["startDate"],
                        maxValue: data[i]["endDate"],
                        format: "HH:MM"
                    },
                    height: 100
                };

                chart.draw(dataTable, options);
            }
        });
    };

    prepareChartData();
    GoogleCharts.load(drawCharts, { packages: ["timeline"] });

    const ChartContainer = (props) => {
        
        const headline = () => {
            if (props.d["naps"].length > 0) {
                if (props.i === 1) return 'Today'; 
                if (props.i === 2) return 'Yesterday';
                return props.d.startDate.toLocaleDateString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
            } else {
                return null;
            }
        };
        return (
            <div>
                <h2>{headline()}</h2>
                {props.d['naps'].length > 0 ? <div id={"day_chart_" + props.i}></div> : null}
            </div>
        );
    }

    return (
        <article className={props.className + " card"}>
            {data.map((d, i) => (
                <ChartContainer key={i} d={d} i={i + 1} />
            ))}
        </article>
    );
}

ChartDaily.propTypes = {
    naps: PropTypes.array
};

export default ChartDaily
