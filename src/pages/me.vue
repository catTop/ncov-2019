<template>
  <div id="index">
    <ul>
      <li class="liborder">
        <mt-cell :title="uinfo.username">
          <img slot="icon" src="../assets/user.png" width="24" height="24">
        </mt-cell>
      </li>
      <li class="liborder">
          <mt-cell title="导出人员表格" :to="'/api/exportexcel/?userid='+ uinfo.id" is-link>
            <img slot="icon" src="../assets/list-on.png" width="24" height="24">
          </mt-cell>
      </li>
      <li class="liborder">
        <mt-cell title="修改密码" to="/changePWD" is-link>
          <img slot="icon" src="../assets/xiugai.png" width="24" height="24">
        </mt-cell>
      </li>

      <li class="liborder" @click="logout">
        <mt-cell title="更换账号/退出"  is-link>
          <img slot="icon" src="../assets/tuichu.png" width="24" height="24">
        </mt-cell>
      </li>
    </ul>
    <div class="img-body">
      <p style="margin-bottom:25px">可以让外来人员扫描此码，自助填写信息</p>
      <div id="qrcode"></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import * as sso from '@/service/api/auth'

export default {
  data() {
    return {
      name: "",
      access: "南沙",
      uinfo: JSON.parse(localStorage.getItem('uinfo'))
      //qrcode: "http://localhost:8080/#/main/me"
    };
  },
  methods: {
    qrcode() {
      new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: `http://dengji.fangyi.cniotroot.cn/#/firstPage?userid=${this.uinfo.id}` // 设置二维码内容或跳转地址
      });
    },
    logout() {
      sso.logout().then(() => {
        localStorage.removeItem('uinfo')
        this.$router.push('/login')
      })
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.qrcode();
    // });
    
    this.qrcode()

  }
};
</script>
<style scoped>
.liborder {
  /* border-bottom: 1px solid #cccccc; */
}
ul {
  margin: 5px;
}
.img-body {
  margin-top: 30px;
  display: flex;
  flex-direction:column;
  align-items:center
}
</style>