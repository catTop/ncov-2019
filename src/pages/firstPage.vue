<template>
  <div id="index">
    <mt-header title="出入人员登记系统" fixed></mt-header>
    <div class="content-div">
      <mt-field label="手机号码" :state="state" placeholder="请输入手机号" v-model="phone"></mt-field>
      <mt-button type="primary" size="large" @click.native="handleClick">进入</mt-button>
    </div>
    <footer-div></footer-div>
  </div>
</template>
<script>
import { submitPhone } from "@/service/api/fillForm";
import { Toast } from "mint-ui";
import FooterDiv from "../components/FooterDiv.vue";
export default {
  components: {
    "footer-div": FooterDiv
  },
  data() {
    return {
      phone: "",
      state: ""
    };
  },
  watch: {
    phone: function(newval) {
      if (/^[1][3,4,5,7,8][0-9]{9}$/.test(newval)) {
        this.state = "success";
      } else {
        this.state = "error";
      }
    }
  },
  methods: {
    async handleClick() {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        Toast("请输入11位的手机号！");
      } else {
        let data = await submitPhone({
          phone: this.phone,
          userid: this.$route.query.userid
        });
        if (data.flag == 1) {
          this.$router.push(
            `/openAddVisit?userid=${this.$route.query.userid}&phone=${
              data.phone
            }`
          );
        } else {
          this.$router.push(
            `/openAddPeople?userid=${this.$route.query.userid}&phone=${
              data.phone
            }`
          );
        }
      }
    }
  }
};
</script>
<style scoped>
#index {
}
.content-div {
  margin: 90px 45px;
}
</style>