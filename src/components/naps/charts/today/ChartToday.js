import React from 'react'

// libs
import { GoogleCharts } from 'google-charts';

// Styles
import styles from './chartToday.scss';
import '../tooltip.scss';

const ChartToday = props => {
    GoogleCharts.load(drawChart, { 'packages': ['timeline'] });

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

    const dataNaps = props.naps.map((nap) => {
        return [
            'naps',
            nap.notes ? nap.notes : 'no notes',
            tooltip(nap),
            new Date(nap.start),
            new Date(nap.end)
        ];
    });

    function drawChart() {
        const container = document.getElementById("today_chart");
        const chart = new GoogleCharts.api.visualization.Timeline(container);
        const dataTable = new GoogleCharts.api.visualization.DataTable();

        dataTable.addColumn({ type: "string", id: "Name" });
        dataTable.addColumn({ type: "string", id: "notes" });
        dataTable.addColumn({
            type: "string",
            role: "tooltip",
            p: { html: true }
        });
        dataTable.addColumn({ type: "date", id: "Start" });
        dataTable.addColumn({ type: "date", id: "End" });
        dataTable.addRows(dataNaps);

        var date_formatter = new GoogleCharts.api.visualization.DateFormat({
            pattern: "HH:MM"
        });
        date_formatter.format(dataTable, 2); 
        date_formatter.format(dataTable, 3); 

        let todayMorning = new Date();
        todayMorning.setHours(0, 0, 0, 0);
        let todayEvening = new Date();
        todayEvening.setHours(23, 59, 59, 999);

        var options = {
            timeline: {
                showRowLabels: false,
                singleColor: styles.timelineSingleColor
            },
            tooltip: { isHtml: true },
            // tooltip: { trigger: "selection" },
            hAxis: {
                viewWindow: {
                    min: todayMorning,
                    max: todayEvening
                },
                format: "HH:MM"
            },
            height: 100
        };

        chart.draw(dataTable, options);
    }

    return (
        <article className={props.className + ' card'}>
            <h2>Today's Data</h2>
            <div id="today_chart"></div>
        </article>
    )
}

ChartToday.propTypes = {

}

export default ChartToday
