﻿﻿/*import Chart from 'highcharts/es-modules/Core/Chart/Chart.js';
import ColumnSeries from 'highcharts/es-modules/Series/Column/ColumnSeries.js';
import * as Highcharts from 'highcharts';
import { createMessageRouter } from "@morgan-stanley/composeui-messaging-client";

let varChart;
let client;

window.addEventListener('load', function () {
  varChart = Highcharts.chart('container', {
    chart: {
      type: 'column',
      events: {
        load: requestData
      }
    },
    title: {
      text: 'Monthly Sales Data'
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Value',
        margin: 80,
      }
    },
    xAxis: {
      categories: ['Jan','Feb','March','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    },
    series: [{
      name: 'Buy',
      data: [] 
    }, {
      name: 'Sell',
      data: []
    }]
  });
});

  window.document.getElementById("close-button").onclick =
    async ev => {
      if (!client) return;
      const tmpClient = client;
      client = undefined;
      tmpClient.close();
    };


async function requestData() {

  (async () => {
    client = createMessageRouter();

    window.client = client;

    await client.connect();

    client.subscribe('proto_select_monthlySales', (message) => {

      const payload = JSON.parse(message.payload);
      const symbol = payload.symbol;
      const buyData = payload.buy;
      const sellData = payload.sell;

      varChart.setTitle({ text: "Monthly sales for " + symbol });
      varChart.series[0].setData([]);
      varChart.series[1].setData([]);

      buyData.forEach(function (p) {
        varChart.series[0].addPoint(p, false);
      });

      sellData.forEach(function (p) {
        varChart.series[1].addPoint(p, false);
      });

      varChart.redraw();
    });
  })();
}*/

import {chart} from 'highcharts';

let varChart;


window.addEventListener('load', function () {
  varChart = chart('container', {
    chart: {
      type: 'column',
      events: {
        load: requestData
      }
    },
    title: {
      text: 'Monthly Sales Data'
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: {
        text: 'Value',
        margin: 80,
      }
    },
    xAxis: {
      categories: ['Jan','Feb','March','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    },
    series: [{
      name: 'Buy',
      data: [] 
    }, {
      name: 'Sell',
      data: []
    }]
  });
});