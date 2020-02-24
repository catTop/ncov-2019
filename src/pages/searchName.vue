<template>
  <div id="index">
    <mt-field v-model="searchValue" placeholder="搜索姓名或手机号">
      <mt-button type="primary" size="small" @click.native="getsearchList">搜索</mt-button>
    </mt-field>
    <ul>
      <li class="liborder" v-for="(item,i) in data" :key="i">
        <mt-cell :title="item.name" :to="'/peopleForm?id='+item.id " is-link :label="item.comefrom"></mt-cell>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.liborder {
  border-bottom: 1px solid #cccccc;
}
ul {
  margin: 5px;
}
</style>
<script>
import { searchPeople } from "@/service/api/peopleInfo";
export default {
  data() {
    return {
      searchValue: "",
      data: []
    };
  },
  methods: {
    async getsearchList() {
      let data = await searchPeople({search:this.searchValue,userid:JSON.parse(localStorage.getItem("uinfo")).id});
      //let data = await searchPeople({ search: this.searchValue, userid: "1" });
      this.data = data || [];
    }
  },
  mounted() {
    this.getsearchList();
  }
};
</script>
