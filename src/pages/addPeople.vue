<template>
  <div id="index">
    <div class="text-body">
      <h4>人员信息</h4>

      <mt-field label="姓名：" :state="rules.name" placeholder="请输入人员姓名" v-model="data.name">
        <span style="color:red">*</span>
      </mt-field>
      <mt-field label="身份证号：" :state="rules.idcard" placeholder="请输入证件号码" v-model="data.idcard">
        <span style="color:red">*</span>
      </mt-field>
      <!-- <mt-field label="车牌号：" placeholder="请输入车牌号" v-model="data.carid"></mt-field> -->
      <mt-field
        label="联系电话："
        :state="rules.phone"
        placeholder="请输入联系电话"
        type="tel"
        v-model="data.phone"
      >
        <span style="color:red">*</span>
      </mt-field>
      <mt-radio title="是否本地户籍：" v-model="data.is_local" :options="options1"></mt-radio>
      <mt-radio title="是否来自湖北：(必填)" v-model="data.is_fromhubei" :options="options2"></mt-radio>
      <mt-field label="来源地区：" :state="rules.comefrom" placeholder="请输入地址" v-model="data.comefrom">
        <span style="color:red">*</span>
      </mt-field>
      <mt-field label="现居住：" placeholder="请输入地址" v-model="data.desc"></mt-field>
      <mt-radio title="春运出行方式：" v-model="data.travel_mode" :options="options3"></mt-radio>
      <mt-field label="车牌/班次：" placeholder="车牌/列车号/航班（选填）" v-model="data.carid"></mt-field>
      <mt-field
        label="返回日期："
        placeholder="请选择"
        type="date"
        v-model="data.springtime"
        :state="rules.springtime"
      >
        <span style="color:red">*</span>
      </mt-field>
      <!-- <mt-field label="备注：" placeholder="备注说明情况" v-model="data.desc"></mt-field> -->
    </div>

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
  </div>
</template>
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
}
</style>
<script>
import { submitFir } from "@/service/api/fillForm";
import { Toast } from "mint-ui";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      data: {
        name: "",
        idcard: "",
        carid: "",
        phone: "",
        is_local: "0",
        is_fromhubei: "0",
        comefrom: "",
        travel_mode: "",
        springtime: null,
        desc: "",

        reason: "",
        contactname: "",
        contactphone: "",
        temperature: 35,
        userid: null
      },

      temperature10: 350,

      options1: [
        {
          label: "是",
          value: "1"
        },
        {
          label: "否",
          value: "0"
        }
      ],
      options2: [
        {
          label: "是",
          value: "1"
        },
        {
          label: "否",
          value: "0"
        }
      ],
      options3: [
        {
          label: "火车",
          value: "1"
        },
        {
          label: "自驾",
          value: "2"
        },
        {
          label: "汽车",
          value: "3"
        },
        {
          label: "飞机",
          value: "4"
        }
      ],
      rules: {
        name: "warning",
        idcard: "warning",
        phone: "warning",
        comefrom: "warning",
        springtime: "warning",

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
    "data.phone": function(newval) {
      if (/^[1][3,4,5,7,8][0-9]{9}$/.test(newval)) {
        this.rules.phone = "success";
      } else {
        this.rules.phone = "error";
      }
    },
    "data.idcard": function(newval) {
      if (
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          newval
        )
      ) {
        this.rules.idcard = "success";
      } else {
        this.rules.idcard = "error";
      }
    },
    "data.name": function(newval) {
      if (newval.length > 0) {
        this.rules.name = "success";
      } else {
        this.rules.name = "error";
      }
    },
    "data.comefrom": function(newval) {
      if (newval.length > 1) {
        this.rules.comefrom = "success";
      } else {
        this.rules.comefrom = "error";
      }
    },
    "data.springtime": function(newval) {
      if (newval != null && newval != "" && newval != undefined) {
        this.rules.springtime = "success";
        console.log(newval);
      } else {
        this.rules.springtime = "error";
      }
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
        this.rules.name == "success" &&
        this.rules.idcard == "success" &&
        this.rules.phone == "success" &&
        this.rules.comefrom == "success" &&
        this.rules.contactname == "success" &&
        this.rules.contactphone == "success" &&
        this.rules.reason == "success" &&
        this.rules.springtime == "success"
      ) {
        await submitFir(this.data);
        Toast("操作成功！");
        setTimeout(() => this.$router.push(`/main/listName`), 300);

        //this.$router.push("/success");
      } else {
        Toast("请按要求输入完整信息！");
      }
    }
  },
  mounted() {
    this.data.userid = JSON.parse(localStorage.getItem("uinfo")).id;
    // if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.phone)) {
    //   this.rules.phone = "success";
    // } else {
    //   this.rules.phone = "error";
    // }
  }
};
</script>
