<template>
  <div id="index">
    <mt-header title="出入人员登记系统" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content-div">
      <ul>
        <li>
          <span>最近更新日期： {{data.add_time}}</span>
        </li>
      </ul>
    </div>
    <div class="text-header">人员信息</div>
    <ul>
      <li>
        <span>姓名: {{data.name}}</span>
        <span>身份证号: {{data.idcard}}</span>
      </li>
      <li>
        <!-- <span>车牌号: {{data.carid}}</span> -->
        <span>联系电话: {{data.phone}}</span>
      </li>
      <li>
        <span>是否本地户籍: {{data.is_local?"是":"否"}}</span>
        <span>是否来自湖北: {{data.is_fromhubei?"是":"否"}}</span>
      </li>
      <li>
        <span>来源地区: {{data.comefrom}}</span>
      </li>
      <li>
        <span>现住址: {{data.desc==""?"无":data.desc}}</span>
        <span>春运出行方式: {{data.travel_mode==1?"火车":(data.travel_mode==2?"自驾":(data.travel_mode==3?"汽车":(data.travel_mode==4?"飞机":"无")))}}</span>
      </li>
      <li>
        <span>车牌/列车号/航班: {{data.carid==""?"无":data.carid}}</span>
      </li>
      <li>
        <span>返回日期: {{data.springtime}}</span>
      </li>
    </ul>

    <div v-for="(item,i) in visitinfo" :key="i">
      <div class="text-header">到访信息</div>
      <ul>
        <li>
          <span>本单位联系人: {{item.contactname}}</span>
          <span>联系人电话: {{item.contactphone}}</span>
        </li>
        <li>
          <span>到访事由: {{item.reason}}</span>
        </li>
        <li>
          <span>记录体温: {{item.temperature}}</span>
          <span>到访时间: {{item.add_time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { peopleInfo } from "@/service/api/peopleInfo";
export default {
  data() {
    return {
      data: {},
      visitinfo:[],
    };
  },
  methods: {
    async getPeopleInfo() {
      let data = await peopleInfo({id:this.$route.query.id,userid:JSON.parse(localStorage.getItem("uinfo")).id});
      //let data = await peopleInfo({id:this.$route.query.id,userid:"1"});
      this.data = data || {};
      this.visitinfo = this.data.visitinfo || [];
    }
  },
  mounted() {
    this.getPeopleInfo();
  }
};
</script>
<style scoped>
#index {
  margin-bottom: 15px;
}
.content-div {
  margin-top: 45px;
}
.text-header {
  margin-top: 10px;
  margin-left: 5px;
  font-size: 18px;
  line-height: 40px;
  border-bottom: 1px solid #cccccc;
}
li {
  margin-left: 10px;
  margin-top: 10px;
}
span {
  border-radius: 8px;
  background-color: #cccccc;
  margin-right: 8px;
  display: inline-block;
  padding: 5px;
  font-size: 12px;
}
</style>