<template>
  <div class="card">
    <div class="title"><p>Temperature</p>
      <div class="icon">
        <img src="like.svg" alt="">
      </div>
    </div>
    <div class="content">
      <div class="box-hold">
          <div class="box-sm box-sm-1">
              <div class="info">
                  <p class="blue">{{ setTemp | currency}} ° C</p>
              </div>
              <div class="sub-txt">
                  <p>Recommended Set temperature Based on Regression Tree</p>
              </div>
          </div>
          <div class="box-sm box-sm-2">
              <div class="info">
                  <p class="blue">29.5 ° C</p>
              </div>
              <div class="sub-txt">
                  <p>Outside Temperature</p>
              </div>
          </div>
      </div>

      <div class="chart-box">
        <div class="chart-title">
          <p>Average Room temperature across 24 hours in one day</p>
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
    height: 200,
  },
  title: {
    text: '',
  },

  yAxis: {
    title: {
      text: 'Temperature (°C)',
    },
    plotLines: [
      {
        value: 0,
        width: 3,
        color: '#3499FD',
      },
    ],
  },

  xAxis: {
    title: {
      text: "Hours in a day"
    }
  },

  tooltip: {
    valueSuffix: '°C',
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Data",
      data: []
    }
  ]
};

const api = "http://localhost:3000/test";
const apiChart = "http://localhost:3000/test3";
let headers = new Headers();
headers.append("Authorization", "Basic " + btoa("Shobhit:lmao"));

export default {
  name: 'Temperaturecard',
  components: {},
  data() {
    return {
      options: options,
      setTemp: 0
    };
  },
  mounted() {
    fetch(api, {
      method: "GET",
      headers: headers
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        this.setTemp = data.temperature;
      });
    });
    fetch(apiChart,{
      method: "GET",
      headers: headers
    }).then((response) => {
      response.json().then((dat) => {
        console.log(dat);
        this.options.series = [{
          name: "data",
          data: dat.avg_temp_list
        }]
      })
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
.card {
  width: 400px;
  display: inline-block;
  margin: 20px;
  border-radius: 15px;
  .title {
    text-align: center;
    background-color: white;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    font-size: 18px;
    position: relative;
    padding: 10px 0;
    color: #59add1;

    .icon{
      position: absolute;
      top: 5px;
      right: 5px;
      width: 9%;
    }
  }
  .content {
    padding: 20px 10px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: #aaaaaa;
    .box-hold{
            display: flex;
    }
    .box {
      height: 120px;
      margin-bottom: 20px;
      box-shadow: 2px 2px 10px 0px #4c4a4a;
      background: white;
    }
    .sub-txt{
          font-size: 10px;
          text-align: center;
      }

      .info{
          font-size: 24px;
    /* height: 80%; */
    text-align: center;
    /* padding: 4% 16%; */
    padding: 18px;
      }
    .box-sm{

        width: 47.4%;
        height: 120px;

      box-shadow: 2px 2px 10px 0px #4c4a4a;
      background: white;
      position: relative;


    }
    .box-sm-1{
        margin:0px 10px 20px 0px;
    }
    .box-sm-2{
        margin:0px 0px 20px 10px;
    }
  }
}

.green{
    color: rgb(125, 174, 50);
}
.blue{
    color: #59add1;
}
.red{
    color: #DB7B73;
}

.chart-box {
  box-shadow: 2px 2px 10px 0px #4c4a4a;
  .chart-title {
    background: white;
    margin-bottom: 6px;
    height: 25px;
    padding: 9px 10px 2px 10px;
    padding-left: 30px;
    font-size: 12px;
  }
  .chart {
    height: 200px;

    background: white;
  }
}
</style>
