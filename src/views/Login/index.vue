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
            enable: false,
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
      <header class="head-form">
      <h2>Log In</h2>
   </header>
      <form style="padding: 0 70px 50px 0;justify-content: center;">
        <div style="display: flex;align-items: center;">
          <div style="width: 50px;height: 50px;background: #fff;display: flex;justify-content: center;align-items: center;"><img src="../../assets/images/用户.png" alt="" style="width: 30px;height: 30px;background: #fff;"></div>
          <input  type="text" placeholder="用户名" v-model="loginData.adminID" style="margin-top: 15px;border: none;border-bottom: 2px solid #D1D1D4;background: none;width: 75%;"/>
        </div>
        <div style="display: flex;align-items: center;">
          <div style="width: 50px;height: 50px;background: #fff;display: flex;justify-content: center;align-items: center;"><img src="../../assets/images/密码.png" alt="" style="width: 30px;height: 30px;background: #fff;"></div>
          <input type="password" placeholder="密码" v-model="loginData.adminPassword " style="margin-top: 15px;border: none;border-bottom: 2px solid #D1D1D4;background: none;width: 75%;" />
        </div>
        
        <button @click.prevent="login" class="login-button" style="width: 200px;margin-top: 30px;margin-right: 100px;background: #fff;font-size: 16px;border-radius: 26px;border: 1px solid #fae9a7;text-transform: uppercase;font-weight: 700;color: #b49105;box-shadow: 0px 2px 2px #b49105;cursor: pointer;">登录</button>
        <div style="background-color: white;margin-top: 50px;margin-left: 50px;width: 80px;">
    <RouterLink to="/" class="backHome">返回首页</RouterLink>
  </div>
  <div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 在这里放置CSS代码 */
@import url('https://fonts.googleapis.com/css?family=Roboto:300');
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');


.screen__background {		
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);	
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;	
	top: -50px;
	right: 120px;	
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #fcecb4;	
	top: -172px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #faf5e8, #fae9a7);
	top: -24px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #feefbd;	
	top: 420px;
	right: 50px;	
	border-radius: 60px;
}

header {
    margin:30px 0;
    margin-right: 200px;
    text-align: center;
}
/* Login title form form */
header h2 {
    font-size: 250%;
    font-family: 'Playfair Display', serif;
    color: #3e403f;
}
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
  background: linear-gradient(90deg, #faf8ee, #fff2bc);
  /* background: #fbf2e5; */
  max-width: 500px;
  min-height: 500px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 20px;
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
body {
	background: linear-gradient(90deg, #C7C5F4, #776BCC);		
}
.backHome{
  background-color: white;
  color: #4b565b;
  font-size: 16px;
}
.backHome:hover{
  text-decoration: underline;
}
button:hover {
    transform: translatey(3px);
    box-shadow: none;
}
</style>

