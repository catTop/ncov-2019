<template>
  <div id="index">
    <mt-header title="设置密码" fixed></mt-header>
    <div class="content-div">
      <mt-field label="原始密码" placeholder="请输入原始密码" type="password" v-model="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="new_password"></mt-field>
      <mt-field label="确认新密码" placeholder="请输入新密码" type="password" v-model="checkPass"></mt-field>
      <mt-button type="primary" size="large" @click.native="handleClick">确认</mt-button>
    </div>
  </div>
</template>
<script>
import * as sso from '@/service/api/auth'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      new_password: "",
      password: "",
      checkPass:"",
    };
  },
  methods: {
    async handleClick() {
      if(this.new_password != this.checkPass) {
        return Toast('密码不一致')
      }
      await sso.change({
        new_password: this.new_password,
        password: this.password,
        checkPass: this.checkPass
      });
      localStorage.removeItem('uinfo')
      this.$router.push('/login')
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