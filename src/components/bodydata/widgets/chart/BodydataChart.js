// React
import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from "react";

// libs
import { GoogleCharts } from "google-charts";

const BodydataChart = props => {
    let { measurements = 0 } = props;
    let timeout = null;
    let data = [];

    const prepareData = () => {
        if (measurements && measurements.length > 0) {
            measurements.forEach(measurement => {
                let item = [];
                // set Date
                let date = new Date(measurement.time);
                date.setHours(0, 0, 0, 0);
                item.push(date);

                // set Weight
                if (measurement.hasWeight()) {
                    item.push(parseInt(measurement.weight, 10));
                    item.push((measurement.weight / 1000).toLocaleString() + ' kg');
                } else {
                    item.push(null);
                    item.push(null);
                }

                // set Body Size
                if (measurement.hasBodySize()) {
                    item.push(parseFloat(measurement.bodySize, 10));
                    item.push(measurement.bodySize + ' cm');
                } else {
                    item.push(null);
                    item.push(null);
                }

                // set Head Size
                if (measurement.hasHeadCircumference()) {
                    item.push(parseFloat(measurement.headCircumference, 10));
                    item.push(measurement.headCircumference + ' cm');
                } else {
                    item.push(null);
                    item.push(null);
                }
                data.push(item);
            });
        }
    }

    function prepareChart() {
        const dataTable = new GoogleCharts.api.visualization.DataTable();
        dataTable.addColumn("date", "Date");
        dataTable.addColumn("number", "Weight");
        dataTable.addColumn({ type: "string", role: "annotation" });
        dataTable.addColumn("number", "Body Size");
        dataTable.addColumn({ type: "string", role: "annotation" });
        dataTable.addColumn("number", "Head Size");
        dataTable.addColumn({ type: "string", role: "annotation" });

        data.reverse();
        dataTable.addRows(data);

        var options = {
            title: "Body Data",
            isStacked: false,
            series: {
                0: { targetAxisIndex: 0 },
                1: { targetAxisIndex: 1 },
                2: { targetAxisIndex: 1 },
            },
            vAxes: {
                0: {
                    title: "g",
                    viewWindow: {
                        min: 1000,
                    },
                },
                1: {
                    title: "cm",
                    viewWindow: {
                        min: 20,
                    },
                },
            },
            backgroundColor: "transparent",
            interpolateNulls: true,
        };

        const elem = document.querySelector("#bodydatachart");
        if (elem) {
            options.height = elem.offsetWidth*0.8;
        }

        var chart = new GoogleCharts.api.visualization.ComboChart(
            document.getElementById("bodydatachart")
        );

        chart.draw(dataTable, options);
    }

    const drawChart = () => {
        if (measurements && measurements.length > 0) {
            data = [];
            prepareData();
            GoogleCharts.load(prepareChart, {
                packages: ["corechart", "line"],
            });
        }
    };

    drawChart();

    const _handleWindowResize = () => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            drawChart();
        }, 400);
    };

    const ChartContainer = () => {
        return <div id={"bodydatachart"}></div>;
    };

    useEffect(() => {
        window.addEventListener("resize", _handleWindowResize);

        return () => {
            window.removeEventListener("resize", _handleWindowResize);
        };
        // eslint-disable-next-line
    }, [measurements]);

    return (
        <article className={props.className}>
            <span className="card_icon fas fa-chart-line fa-3x"></span>
            <ChartContainer>
                <p>Still gathering Data...</p>
            </ChartContainer>
        </article>
    );
}

BodydataChart.propTypes = {
    measurements: PropTypes.array.isRequired
}

export default BodydataChart
