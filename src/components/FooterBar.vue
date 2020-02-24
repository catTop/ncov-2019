<template>
  <div class="tab-bar">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="listName">
        <img slot="icon" :src="img1">
        列表
      </mt-tab-item>
      <mt-tab-item id="addPeople">
        <img slot="icon" :src="img2">
        新增
      </mt-tab-item>
      <mt-tab-item id="searchName">
        <img slot="icon" :src="img3">
        搜索
      </mt-tab-item>
      <mt-tab-item id="me">
        <img slot="icon" :src="img4">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selected:"listName",
      img1:require("../assets/list-on.png"),
      img2:require("../assets/plus.png"),
      img3:require("../assets/search.png"),
      img4:require("../assets/me.png"),
    }
  },
      computed: {
      isShow: function () {
        return true;
      }
    },
    watch: {
      'selected': {
        handler(){
          if (this.selected == "listName") {
            this.$router.push('/main/listName');
            this.img1 = require("../assets/list-on.png")
          } else {
            this.img1 = require("../assets/list.png")
          }
          if (this.selected == "addPeople") {
            this.$router.push('/main/addPeople');
            this.img2 = require('../assets/plus-on.png')
          } else {
            this.img2 = require('../assets/plus.png')
          }
          if (this.selected == "searchName") {
            this.$router.push('/main/searchName')
            this.img3 = require("../assets/search-on.png");
          } else {
            this.img3 = require("../assets/search.png");
          }
          if (this.selected == "me") {
            this.$router.push('/main/me')
            this.img4 = require("../assets/me-on.png");
          } else {
            this.img4 = require("../assets/me.png");
          }
        }
      }
    }
};
</script>

<style scoped>

</style>
