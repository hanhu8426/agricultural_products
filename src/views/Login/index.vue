<script>
export default {
  data() {
    return {
      registerData: {
        name: '',
        password: '',
        email: ''
      },
      loginData: {
        username: '',
        password: ''
      },
      showRegisterForm: false
    };
  },
  methods: {
    login() {
      // 实现登录逻辑
    },
    toggleForm() {
      this.showRegisterForm = !this.showRegisterForm;
    }
  }
};
</script>


<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="用户名" v-model="loginData.username" />
        <input type="password" placeholder="密码" v-model="loginData.password" />
        <button @click.prevent="login">登录</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 在这里放置CSS代码 */
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 1280px;
  padding: 8% 0 ;
  margin: auto;
  background-color: #76b852;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 16px;
  //-webkit-transition: all 0.3 ease;
  //transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body { /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

