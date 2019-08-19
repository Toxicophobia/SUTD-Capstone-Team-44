<template>
  <div class="card">
    <div class="title"><p class="red">Laundry Pick up</p>
      <div class="icon">
        <img src="like.svg" alt="">
      </div>
    </div>
    <div class="content">
      <div class="box-hold">
          <div class="box-sm box-sm-1">
              <div class="info">
                  <p class="red">{{ avgReq }} </p>
              </div>
              <div class="sub-txt">
                  <p>Average requests per day <br> in last 30 days</p>
              </div>
          </div>
          <div class="box-sm box-sm-2">
              <div class="info">
                  <p class="red">{{ avgWait | currency }} mins </p>
              </div>
              <div class="sub-txt">
                  <p>Average wait time</p>
              </div>
          </div>
      </div>

      <div class="chart-box">
        <div class="chart-title">
          <p>Average Number of Request across 24 hours in one day </p>
        </div>
        <div class="chart">
          <highcharts :options="options" ref="highcharts"></highcharts>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Highcharts from 'highcharts';

const options = {
  chart: {
    type: 'column',
    height: 200,
  },
  title: {
    text: '',
  },

  yAxis: {
    title: {
      text: 'Duration in hours',
    },
  },

  xAxis: {
    title: {
      text: "Hours in a day"
    }
  },

  tooltip: {
    valueSuffix: 'hrs',
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Data",
      data: [],
      color: '#DB7B73'
    }
  ]
};

const api = "http://localhost:3000/test5";

let headers = new Headers();
headers.append("Authorization", "Basic " + btoa("Shobhit:lmao"));

export default {
  name: 'Laundrycard',
  components: {},
  data() {
    return {
      options: options,
      avgReq: 0,
      avgWait: 0
    };
  },
  mounted() {
    fetch(api, {
      method: "GET",
      headers: headers
    }).then((response) => {
      response.json().then((dat) => {
        console.log(dat);
        this.options.series = [{
            name: 'data',
            data: dat.avg_request_list
        }];
        this.avgReq = dat.avg_request_per_day;
        this.avgWait = dat.avg_wait_time;
      });
    });

  },
  methods: {
    updateCredits() {
      const { chart } = this.$refs.highcharts;
      chart.credits.update({
        style: {
          color: `#${((Math.random() * 0xffffff) | 0).toString(16)}`,
        },
      });
    },
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
