<template>
  <div id="app">
    <div class="back">
      <div class="sidenav">
        <router-link class-active="active" to="/user-profile">
          <img src="icon.svg" alt="">
        </router-link>
        <router-link class-active="active" to="/insight">Insight Cards</router-link>
        <router-link class-active="active" to="/report">Report Builder</router-link>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

body{
    margin: 0;
}

.sidenav {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding: 35px 40px 35px 20px;

  border: 1.5px solid;
  border-top: 0;
  border-bottom: 0;
  border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(226, 226, 226, 1) 48%, rgba(255, 255, 255, 0) 100%);
  border-image-slice: 1;

  a {
        padding: 30px 35px;
    text-align: center;
    display: block;
    box-shadow: 2px 2px 6px 0px #9a9a9a;
    margin: 15px 10px;
    border-radius: 13px;
    background-color: white;
    font-size: 25px;
    text-decoration: none;
        text-decoration-line: none;
        background-color: white;
      color: rgb(125,174,50);
    &.router-link-exact-active {
        background-color:rgb(125,174,50);
      color: white;
    }

    &:visited{
        color: inherits;
    }
    &:hover{
        text-decoration: none;
        text-decoration-line: none;
    }

  }
}

.main {
  margin-left: 370px;
  margin-right: 2%;
  font-size: 28px;
  padding: 35px 10px;
}
.back {
  background-color: #dddddd;
  min-height: 1980px;
}

p{
    margin: 0;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>
