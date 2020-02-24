<template>
  <div id="index">
    <mt-header title="出入人员登记系统" fixed></mt-header>
    <div class="text-body">
      <h4>到访信息</h4>
      <mt-field
        label="单位联系人："
        :state="rules.contactname"
        placeholder="请输入联系人姓名"
        v-model="data.contactname"
      >
        <span style="color:red">*</span>
      </mt-field>
      <mt-field
        label="联系人电话："
        :state="rules.contactphone"
        placeholder="请输入联系电话"
        type="tel"
        v-model="data.contactphone"
      >
        <span style="color:red">*</span>
      </mt-field>
      <mt-field label="到访事由：" :state="rules.reason" placeholder="请输入到访事由" v-model="data.reason">
        <span style="color:red">*</span>
      </mt-field>
      <mt-range v-model="temperature10" :min="350" :max="400" :step="1" :bar-height="3">
        <div slot="start">记录温度：</div>
        <div slot="end">
          {{data.temperature}}
          <span style="color:red">*</span>
        </div>
      </mt-range>
      <div style="margin-top:25px">
        <mt-button type="primary" size="large" @click.native="handleClick">提交信息</mt-button>
      </div>
    </div>
    <footer-div></footer-div>
  </div>
</template>
<script>
import { submitSec } from "@/service/api/fillForm";
import { Toast } from "mint-ui";
import FooterDiv from "../components/FooterDiv.vue";
export default {
  components: {
    "footer-div": FooterDiv
  },
  data() {
    return {
      data: {
        phone: this.$route.query.phone,
        reason: "",
        contactname: "",
        contactphone: "",
        temperature: 35,
        userid: this.$route.query.userid
      },

      temperature10: 350,

      rules: {
        contactname: "warning",
        contactphone: "warning",
        reason: "warning"
        //temperature:"",
      }
    };
  },
  watch: {
    temperature10: function(newval) {
      this.data.temperature = newval / 10;
    },
    //到访
    "data.contactname": function(newval) {
      if (newval.length > 0) {
        this.rules.contactname = "success";
      } else {
        this.rules.contactname = "error";
      }
    },
    "data.contactphone": function(newval) {
      if (/^[1][3,4,5,7,8][0-9]{9}$/.test(newval)) {
        this.rules.contactphone = "success";
      } else {
        this.rules.contactphone = "error";
      }
    },
    "data.reason": function(newval) {
      if (newval.length > 1) {
        this.rules.reason = "success";
      } else {
        this.rules.reason = "error";
      }
    }
  },
  methods: {
    async handleClick() {
      if (
        this.rules.contactname == "success" &&
        this.rules.contactphone == "success" &&
        this.rules.reason == "success"
      ) {
        await submitSec(this.data);
        this.$router.push("/success");
      } else {
        Toast("请按要求输入完整信息！");
      }
    }
  }
};
</script>
<style scoped>
#index {
  margin-bottom: 85px;
}
h4 {
  margin: 0;
  padding: 0;
}
.text-body {
  margin: 8px 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #cccccc;
  padding: 10px 15px;
  margin-top: 60px;
}
</style>