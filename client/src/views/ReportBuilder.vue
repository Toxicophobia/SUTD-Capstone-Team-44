<template>
  <div class="report">
    <form>
      <div class="main-box">
        <div class="box">
          <div class="box-partition wd-3">
            <div class="title">Date Range</div>
            <div class="subtext">Select a custom Range Date</div>
          </div>
          <div class="box-partition wd-3">
            <div class="title-1">Time Period</div>
            <div class="subtext">
              <div>
                <input
                  type="radio"
                  v-model="form.time_period"
                  id="time-period"
                  name="time-period"
                  value="True"
                  class="subtext-radio"
                  checked
                />
              </div>
              <div>
                <select v-model="form.time_period_sel" id="time-period-sel">
                  <option>--Please choose an option--</option>
                  <option value="30">Last 30 days</option>
                  <option value="60">Last 60 days</option>
                  <option value="90">Last 90 Days</option>
                </select>
              </div>
            </div>
          </div>
          <div class="box-partition wd-6">
            <div class="title-1">Custom dates</div>
            <div class="subtext">
              <div>
                <input
                  type="radio"
                  v-model="form.custom_date"
                  id="custom_date"
                  name="time-period"
                  value="False"
                  class="subtext-radio"
                  checked
                />
              </div>
              <div>
                <span>
                    From:
                </span>

                <input v-model="form.from" type="date" style="    height: 15px;" />
                <span>
                    To:
                </span>

                <input v-model="form.to" type="date" style="    height: 15px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="box">
          <div class="box-partition wd-3">
            <div class="title">Select Floors & Rooms</div>
            <div class="subtext">Select the Rooms and/or floors to include</div>
          </div>
          <div class="box-partition wd-3">
            <div class="align-c">
              <div class="title-1">All</div>
              <div class="subtext">
                <div>
                  <input
                    type="radio"
                    id="all_room_floor"
                    name="all_room_floor"
                    value="all"
                    v-model="form.all_room_floor"
                    class="subtext-radio"
                    checked
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="box-partition wd-3">
            <div class="title-1">Floors</div>
            <div class="subtext">
              <div>
                <input
                  type="radio"
                    id="floors"
                    name="all_room_floor"
                    value="floor"
                    v-model="form.floors"
                    class="subtext-radio"
                    checked
                />
              </div>
              <div>
                <select id="floors_sel" v-model="form.floors_sel">
                  <option value>--Please choose an option--</option>
                  <option value="7">Floor 7</option>
                  <option value="8">Floor 8</option>
                </select>
              </div>
            </div>
          </div>
          <div class="box-partition wd-3">
            <div class="title-1">Rooms</div>
            <div class="subtext">
              <div>
                <input
                  type="radio"
                    id="rooms"
                    name="all_room_floor"
                    value="room"
                    v-model="form.rooms"
                    class="subtext-radio"
                    checked
                />
              </div>
              <div>
                <select id="rooms_sel" v-model="form.rooms_sel">
                  <option value>--Please choose an option--</option>
                  <option value="750">Room 750</option>
                  <option value="751">Room 751</option>
                  <option value="752">Room 752</option>
                  <option value="850">Room 850</option>
                  <option value="851">Room 851</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="box">
          <div class="box-partition wd-3">
            <div class="title">Select Parameters</div>
            <div class="subtext">Select the Rooms and/or floors to include</div>
          </div>
          <div class="box-partition wd-9">
            <div class="title-1"></div>
            <div class="subtext">
              <input type="radio" id="type_humidity" name="type" v-model="form.type" value="Humidity" checked />
              <label for="type_humidity">Humidity</label>
              <input type="radio" id="type_temperature"  v-model="form.type" name="type" value="Temperature" checked />
              <label for="type_temperature">Temperature</label>
              <input type="radio" id="type_temperature_set_point"  v-model="form.type" name="type" value="Temperature Set Point" checked />
              <label for="type_temperature_set_point">Temperature Set Point</label>
            </div>
          </div>
        </div>
      </div>
      <button @click="SubmitForm">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "ReportBuilder",
  components: {},
  data() {
    return {
      form: {
        time_period: "False",
        time_period_sel: "",
        from: '',
        to: '',
        all_room_floor: '',
        floors_sel: '',
        rooms_sel: '',
        type: ''
      }
    };
  },
  methods: {
    SubmitForm: function() {
    let self = this;
      axios.post('http://localhost:3000/genReport', this.form)
        .then(function(response){
            self.$router.go({path: '/'})
        });
    }
  }
};
</script>


<style lang="scss">
.report {
  margin: 40px 25px;
  .main-box {
    border-radius: 10px;
    background-color: white;
    margin: 18px 20px;
    padding: 10px 10px;
  }
  .box {
    display: flex;

    .box-partition {
      border-right: 2px solid #cccccc;
      float: left;
      min-height: 20px;
      padding: 0 25px;
      &:last-child {
        border: 0px solid black;
        margin-right: auto;
      }
      &:first-child {
        padding-left: 15px;
        margin-left: auto;
      }

      .title {
        font-size: 17px;
        font-weight: bold;
        padding-top: 9px;
      }
      .title-1 {
        font-size: 15px;
        padding-top: 11px;
      }
      .subtext {
        font-size: 12px;
        padding-top: 22px;
        padding-bottom: 18px;
        .subtext-radio {
          float: left;
          padding: 3px 5px;
          margin-right: 15px;
        }
      }
    }

    .wd-3 {
      width: 25%;
    }
    .wd-6 {
      width: 50%;
    }
    .wd-2 {
      width: 16.66%;
    }
    .wd-1 {
      width: 8.33%;
    }
    .wd-4 {
      width: 33.33%;
    }
    .wd-12 {
      width: 100%;
    }
    .wd-9 {
      width: 75%;
    }
  }
}

.align-c {
  width: 10%;
  margin: auto;
}
</style>
