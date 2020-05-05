import React, { useEffect } from 'react'
import PropTypes from "prop-types";

// libs
import { GoogleCharts } from 'google-charts';

// Styles
import styles from './chartDaily.scss';
import '../tooltip.scss';
import Duration from 'components/shared/duration/Duration';

const ChartDaily = props => {
    let data = [];
    let timeout = null;

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
                    nap.notes ? nap.notes : "",
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
                        singleColor: styles.timelineSingleColor,
                    },
                    tooltip: { isHtml: true },
                    // tooltip: { trigger: "selection" },
                    hAxis: {
                        minValue: data[i]["startDate"],
                        maxValue: data[i]["endDate"],
                        format: "HH:MM",
                    },
                    height: 100,
                    chartArea: {
                        left: 20,
                        top: 30,
                        bottom: 10,
                    },
                };

                chart.draw(dataTable, options);
            }
        });
    };

    const drawChart = () => {
        if (props.naps && props.naps.length > 0) {
            data = [];
            prepareChartData();
            GoogleCharts.load(drawCharts, { packages: ["timeline"] });
        }
    }

    const _handleWindowResize = () => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            drawChart();
        }, 1000);
    };

    drawChart();

    const ChartContainer = (props) => {
        
        const headline = () => {
            if (props.d["naps"].length > 0) {
                if (props.i === 1) return ("Today"); 
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
        const duration = () => {
            if (props.d["naps"].length > 0) {
                let duration = props.d["naps"].reduce((acc, cur) => {
                    return acc + cur[4].getTime() - cur[3].getTime();
                }, 0);
                // console.log(<Duration milliseconds={duration} />);
                return duration;
            } else {
                return null;
            }
        };
        const durtionValue = duration();
        return (
            <div>
                <h2>
                    {headline()}
                    {durtionValue ? " (" : null}
                    {durtionValue ? <Duration milliseconds={durtionValue} showSeconds={false} /> : null}
                    {durtionValue ? ")" : null}
                </h2>
                {props.d['naps'].length > 0 ? <div id={"day_chart_" + props.i}></div> : null}
            </div>
        );
    }

    useEffect(() => {
        window.addEventListener("resize", _handleWindowResize);

        return () => {
            window.removeEventListener("resize", _handleWindowResize);
        };
        // eslint-disable-next-line
    }, [props.naps]);

    return (
        <article className={props.className + " card"}>
            <span className="card_icon fas fa-chart-line fa-3x"></span>
            {data.map((d, i) => (
                <ChartContainer key={i} d={d} i={i + 1} />
            ))}
        </article>
    );
}

ChartDaily.propTypes = {
    naps: PropTypes.array.isRequired
};

export default ChartDaily
