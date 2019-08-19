<template>
  <div class="card">
    <div class="title">
      <p>Humidity</p>
      <div class="icon">
        <img src="like.svg" alt />
      </div>
    </div>
    <div class="content">
      <div class="box-hold">
        <div class="box-sm box-sm-1">
          <div class="info">
            <p class="blue">{{ curHumid | currency }} %</p>
          </div>
          <div class="sub-txt">
            <p>Current Humidity <br> across all rooms</p>
          </div>
        </div>
        <div class="box-sm box-sm-2">
          <div class="info">
            <p class="blue">50% - 70%</p>
          </div>
          <div class="sub-txt">
            <p>Comfortable Humidity</p>
          </div>
        </div>
      </div>

      <div class="chart-box">
        <div class="chart-title">
          <p>Boxplots of Humidity in Last 5 Days Accross All the Rooms</p>
        </div>
        <div class="chart">
          <highcharts :options="options" ref="humid"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Highcharts from "highcharts";
import More from "highcharts/highcharts-more";
More(Highcharts);
import io from "socket.io-client";

var options = {
  chart: {
    type: "boxplot",
    height: 200
  },

  title: {
    text: ""
  },

  legend: {
    enabled: false
  },

  xAxis: {
    categories: ["1", "2", "3", "4", "5"],
    title: {
      text: "Last 5 days"
    }
  },

  series: [
    {
      name: "Observations",
      data: [
        [760, 801, 848, 895, 965],
        [733, 853, 939, 980, 1080],
        [714, 762, 817, 870, 918],
        [724, 802, 806, 871, 950],
        [834, 836, 864, 882, 910],
        [834, 836, 864, 882, 910]
      ],
      tooltip: {
        headerFormat: "<em>Experiment No {point.key}</em><br/>"
      }
    }
  ]
};

const api = "http://localhost:3000/test4";
const apiChart = "http://localhost:3000/test2";
let headers = new Headers();
headers.append("Authorization", "Basic " + btoa("Shobhit:lmao"));

export default {
  name: "Humiditycard",
  components: {},
  data() {
    return {
      options: options,
      curHumid: 0,
      save: '',
      socket: io("localhost:3000")
    };
  },
  mounted() {
    fetch(api, {
      method: "GET",
      headers: headers
    }).then(response => {
      response.json().then(data => {
        console.log(data);
        this.curHumid = data.humidity;
      });
    });
    fetch(apiChart, {
      method: "GET",
      headers: headers
    }).then(response => {
      response.json().then(dat => {
        var arr = [
          this.retQuart(dat.day_1),
          this.retQuart(dat.day_2),
          this.retQuart(dat.day_3),
          this.retQuart(dat.day_4),
          this.retQuart(dat.day_5)
        ];

        this.options.series = [
          {
            name: "data",
            data: arr
          }
        ];
      });
    });
  },
  methods: {
    transpose: function(matrix) {
      return matrix.reduce(
        (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
        []
      );
    },
    sortNumber: function(a, b) {
      return a - b;
    },
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        save : 'humidity'
      });
    },
    quantile: function(array, percentile) {
      array.sort(this.sortNumber);
      var index = (percentile / 100) * (array.length - 1);
      if (Math.floor(index) == index) {
        var result = array[index];
      } else {
        var i = Math.floor(index);
        var fraction = index - i;
        var result = array[i] + (array[i + 1] - array[i]) * fraction;
      }
      return result;
    },

    retQuart: function(arr) {
      return [
        this.quantile(arr, 0),
        this.quantile(arr, 0.25),
        this.quantile(arr, 0.5),
        this.quantile(arr, 0.75),
        this.quantile(arr, 1)
      ];
    }
  },
  filters: {
    currency(amount) {
      const amt = Number(amount)
      return amt && amt.toLocaleString(undefined, {maximumFractionDigits:1}) || '0'
    }
  }
};
</script>

<style lang="scss">

</style>
