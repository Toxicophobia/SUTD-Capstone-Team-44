
<template>
  <div class="tabContainer">
    <div class="buttonContainer">
      <button v-on:click="showPanel(0)">All</button>
      <button v-on:click="showPanel(1)">Saved</button>
      <button v-on:click="showPanel(2)">Actionable</button>
    </div>
    <div class="tabPanel">
      <Temperaturecard />
      <Humiditycard />
      <Laundrycard />
    </div>
    <div class="tabPanel">Content 2</div>
    <div class="tabPanel">Content 3</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Temperaturecard from "../components/Temperaturecard.vue";
import Humiditycard from "../components/Humiditycard.vue";
import Laundrycard from "../components/Laundrycard.vue";

export default {
  name: "Insight",
  components: {
    Temperaturecard,
    Humiditycard,
    Laundrycard
  },
  data() {
    return {
      
    };
  },
  methods: {
    
    showPanel(index) {
      const tabB = document.querySelectorAll(
        ".tabContainer .buttonContainer button"
      );
      const tabP = document.querySelectorAll(".tabContainer .tabPanel");
      tabP.forEach(node => {
        node.style.display = "none";
      });
      tabP[index].style.display = "block";

      tabB.forEach(node => {
        node.style.background = "white";
        node.style.color = "rgb(125, 174, 50)";
      });
      tabB[index].style.background = "rgb(125, 174, 50)";
      tabB[index].style.color = "white";
    }
  }
};
</script>

<style lang="scss" scoped>
.tabContainer {
  width: 100%;
  height: 350px;
  .buttonContainer {
    height: 18%;
    padding: 0 20px;
    button {
      width: 28%;
      height: 100%;
      margin: 10px 2.5%;
      float: left;
      font-family: inherit;
      font-size: 25px;
      border-radius: 13px;
      padding: 15px 10px;
      border: none;
      box-shadow: 2px 2px 6px 0px #9a9a9a;
      background-color: rgb(125, 174, 50);
      color: white;
    }
  }
  .tabPanel {
    height: 85%;
    margin-top: 60px;

    box-sizing: border-box;
    display: none;
  }
}
</style>
