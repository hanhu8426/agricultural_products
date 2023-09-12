<script setup>
import {ref} from 'vue'
import axios from 'axios';
import {useRouter} from "vue-router";
import {baseUrl} from "@/main";
import { loadFull } from "tsparticles";

const options = {
      background: {
        color: {
          value: "#fef8ef",//粒子颜色
          opacity: 0.5,
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",//可用的click模式有: "push", "remove", "repulse", "bubble"。
          },
          onHover: {
            enable: true,
            mode: "grab",//可用的hover模式有: "grab", "repulse", "bubble"。
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#893448',
        },
        links: {
          color: '#893448',//'#dedede'。线条颜色。
          distance: 150,//线条长度
          enable: true,//是否有线条
          opacity: 0.5,//线条透明度。
          width: 1,//线条宽度。
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 2,//粒子运动速度。
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,//粒子数量。
        },
        opacity: {
          value: 0.5,//粒子透明度。
        },
        shape: {
          type: "none", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    };
    const particlesInit = async engine => {
        await loadFull(engine);
};
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
}
const loginData=  ref({
  adminID: '',
  adminPassword: ''
})
const router = useRouter(); // 获取Vue Router实例
const login = () => {
  axios
      .post(`${baseUrl}/administratorLogin`,  {
          adminID: loginData.value.adminID,
          adminPassword: loginData.value.adminPassword
        })
      .then(response => {
        // 登录成功后的处理
        if (response.data.Msg === "ok") {
          // 在这里可以进行跳转到另一个页面的操作，比如使用Vue Router
          router.push('/manage');
        } else {
          // 处理登录失败的情况
          alert('登录失败，请检查用户名和密码。');
        }
      })
      .catch(error => {
        console.error('登录请求失败', error);
      });
}
</script>


<template>
  
  
  <div class="login-page">
    <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
    <div class="form">
      <form style="padding: 50px;justify-content: center;">
        <input type="text" placeholder="用户名" v-model="loginData.adminID" style="margin-top: 30px;"/>
        <input type="password" placeholder="密码" v-model="loginData.adminPassword " style="margin-top: 20px;" />
        <button @click.prevent="login" style="width: 200px;margin-top: 30px;background-color: #eee3c1;color: #893448;">登录</button>
        <div style="background-color: #fbf2e5;padding-top: 50px;">
    <RouterLink to="/" class="backHome">返回首页</RouterLink>
  </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 在这里放置CSS代码 */
@import url(https://fonts.googleapis.com/css?family=Roboto:300);


.home{
  background-color: #76b852;
  padding-left: 40px;
  padding-top: 20px;
}
.login-page {
  width: 1280px;
  padding: 8% 0 ;
  margin: auto;
  background-color: #76b852;
}
.form {
  position: relative;
  z-index: 1;
  background: #fbf2e5;
  max-width: 500px;
  min-height: 500px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #fff;
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
.backHome{
  background-color: #fbf2e5;
  color: #4b565b;
  font-size: 18px;
}
.backHome:hover{
  text-decoration: underline;
}
</style>

