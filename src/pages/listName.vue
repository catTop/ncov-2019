<template>
  <div id="index">
    <ul>     
        <li class="liborder" v-for="(item,i) in data" :key="i">
          <mt-cell :title="item.name" :to="'/peopleForm?id='+item.id " is-link :label="item.comefrom"></mt-cell>
        </li>
    </ul>
  </div>
</template>
<script>
import { peopleList } from "@/service/api/peopleInfo";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    async getPeopleList() {
      let data = await peopleList(JSON.parse(localStorage.getItem("uinfo")).id);
      //let data = await peopleList("1");
      this.data = data || [];
    }
  },
  mounted() {
    this.getPeopleList();
  }
};
</script>
<style scoped>
.liborder {
  border-bottom: 1px solid #cccccc;
}
ul {
  margin: 5px;
}
</style>
