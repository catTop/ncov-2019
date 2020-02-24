<template>
  <div id="main">
    <mt-header title="出入人员登记系统" fixed></mt-header>

    <div class="content-div">
      <router-view/>
    </div>
    <footer-bar class="footer"></footer-bar>
  </div>
</template>

<script>
import Footer from "../components/FooterBar.vue";

export default {
  name: "main",
  components: {
    "footer-bar": Footer
  }
};
</script>

<style>
.content-div {
    margin-top:45px;
    padding-bottom: 40px;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>