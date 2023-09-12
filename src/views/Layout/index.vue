<script setup> 
import LayoutFooter from './components/LayoutFooter.vue'
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
  import { loadFull } from "tsparticles";
  import { useRoute } from 'vue-router';

const route = useRoute();

const scrollToTab = (hash) => {
  const targetElement = document.querySelector(hash);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};




  const loaderChars = ref(['C', 'R', 'E', 'A', 'T', 'E', 'D', ' ', 'B', 'Y', ' ', '暑', '期', '项', '目', '-', '1', '3', '组']);
      const currentId = ref(null);
      const currentTab = ref(null);
      const tabContainerHeight = 70;
      const lastScroll = ref(0);
  
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
};
    //   function onTabClick(event, element) {
    //     event.preventDefault();
    //     const scrollTop = document.querySelector(element.getAttribute('href')).offsetTop - tabContainerHeight + 1;
    //     window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    //   }



      function onScroll() {
        checkHeaderPosition();
        lastScroll.value = window.scrollY;
      }
  
      function onResize() {
        if (currentId.value) {
          setSliderCss();
        }
      }
  
      function checkHeaderPosition() {
        const headerHeight = 75;
        const navContainer = document.querySelector('.nav-container');
        if (window.scrollY > headerHeight) {
          navContainer.classList.add('nav-container--scrolled');
        } else {
          navContainer.classList.remove('nav-container--scrolled');
        }
        const offset = document.querySelector('.nav').offsetTop + document.querySelector('.nav').offsetHeight - tabContainerHeight - headerHeight;
        if (window.scrollY > lastScroll.value && window.scrollY > offset) {
          navContainer.classList.add('nav-container--move-up');
          navContainer.classList.remove('nav-container--top-first');
          navContainer.classList.add('nav-container--top-second');
        } else if (window.scrollY < lastScroll.value && window.scrollY > offset) {
          navContainer.classList.remove('nav-container--move-up');
          navContainer.classList.remove('nav-container--top-second');
          navContainer.classList.add('nav-container-container--top-first');
        } else {
          navContainer.classList.remove('nav-container--move-up');
          navContainer.classList.remove('nav-container--top-first');
          navContainer.classList.remove('nav-container--top-second');
        }
      }
  
      
  
      function setSliderCss() {
        let width = '0';
        let left = '0';
        if (currentTab.value) {
          width = window.getComputedStyle(currentTab.value).width;
          left = currentTab.value.offsetLeft + 'px';
        }
        document.querySelector('.nav-tab-slider').style.width = width;
        document.querySelector('.nav-tab-slider').style.left = left;
      }
  
      onMounted(() => {
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        // 监听路由变化，滚动到对应选项卡
        watchEffect(() => {
          const hash = route.hash;
          if (hash) {
            scrollToTab(hash);
          }
        });
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      });
</script>

<template>
   
  <div>
      <section class="nav">
        <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
        <h1>农产品市场数据分析平台</h1>
        <h3 class="span loader">
          <span class="m" v-for="(char, index) in loaderChars" :key="index">{{ char }}</span>
        </h3>
        <div class="nav-container" :class="navContainerClass">
          <router-link to="/" class="nav-tab" :class="{ myActive: $route.path === '/' }">首页</router-link>
          <router-link to="/dataQuery" class="nav-tab" :class="{ myActive: $route.path === '/dataQuery' }">数据查询</router-link>
          <router-link to="/marketInfo" class="nav-tab" :class="{ myActive: $route.path === '/marketInfo' }">市场行情</router-link>
          <router-link to="/analysisForecast" class="nav-tab" :class="{ myActive: $route.path === '/analysisForecast' }">分析预测</router-link>
          <router-link to="/login" class="nav-tab" :class="{ myActive: $route.path === '/login' }">管理员登录</router-link>
          <!-- 其他选项卡链接... -->
          <span class="nav-tab-slider" :style="{ left: tabSliderLeft }"></span>
        </div>
      </section>
  
      <div style="margin-top: 30px;z-index: 999;"><RouterView></RouterView></div>
       
    </div>
  <div>
    <LayoutFooter />
  </div>
</template>

<style lang="scss">
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: "ROBOTO", sans-serif;
}

.myActive {
  color: #4b565b !important;;
  background-color: #fef8ef!important;
}
.nav,
.slider {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
position: relative;
background-color: #1e1f26;
text-align: center;
padding: 0 2em;
}

.nav h1,
.slider h1 {
font-family: "Josefin Sans", sans-serif;
font-size: 22px;
margin: 0;
padding-bottom: 0.5rem;
letter-spacing: 0.5rem;
color: #893448!important;
transition: all 0.3s ease;
z-index: 3;
}
h1:hover {
transform: translate3d(0, -10px, 22px);
color: #919e8b!important;
}

.slider h2 {
font-size: 2vw;
letter-spacing: 0.3rem;
font-family: "ROBOTO", sans-serif;
font-weight: 300;
color: #faebd7;
z-index: 4;
}
h3.span {
  margin-top: 50px;
font-size: 30px;
letter-spacing: 0.7em;
font-family: "ROBOTO", sans-serif;
font-weight: 300;
color: #ffb248;
z-index: 4;
}

a {
text-decoration: none;
}

.nav-container {
display: flex;
flex-direction: row;
position: absolute;
bottom: 0;
width: 100%;
height: 75px;
box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
background: #1e1f26;
z-index: 10;
transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-first {
position: fixed;
top: 75px;
transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-container--top-second {
position: fixed;
top: 0;
}
.nav-tab {
display: flex;
justify-content: center;
align-items: center;
flex: 1;
background-color: #ebdba4;
color: #893448;
letter-spacing: 0.1rem;
transition: all 0.5s ease;
font-size: 2vw;
}

.nav-tab:hover {
color: #4b565b;
background: #fef8ef;
transition: all 0.5s ease;
}

.nav-tab-slider {
position: absolute;
bottom: 0;
width: 0;
height: 2px;
background: #919e8b;
transition: left 0.3s ease;
}
.background {
position: absolute;
height: 90vh;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: -999;
}
@media (min-width: 800px) {
.nav h1,
.slider h1 {
  font-size: 22px;
}

.nav h2,
.slider h2 {
  font-size: 3vw;
}

.nav-tab {
  font-size: 3vw;
}
}

@media (min-width: 360px) {
  

.nav h1,
.slider h1 {
  font-size: 90px;
}

.nav h2,
.slider h2 {
  font-size: 2vw;
  letter-spacing: 0.2vw;
}

.nav-tab {
  font-size: 1.2vw;
}
}
.background {
position: absolute;
height: 100vh;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: -999;
}
.loader span {
color: #4b565b!important;
text-shadow: 0 0 0 #5470c6!important;
animation: loading 1s ease-in-out infinite alternate;
}
.loader {
  color: #4b565b;
  text-shadow: 0 0 0 #4b565b;
  animation: loading 1s ease-in-out infinite alternate;
}

@keyframes loading {
to {
  text-shadow: 20px 0 70px #4b565b;
  color: #4b565b;
}
}

.loader span:nth-child(2) {
animation-delay: 0.1s;
}

.loader span:nth-child(3) {
animation-delay: 0.2s;
}
.loader span:nth-child(4) {
animation-delay: 0.3s;
}
.loader span:nth-child(5) {
animation-delay: 0.4s;
}
.loader span:nth-child(6) {
animation-delay: 0.5s;
}
.loader span:nth-child(7) {
animation-delay: 0.6s;
}
.loader span:nth-child(8) {
animation-delay: 0.7s;
}
.loader span:nth-child(9) {
animation-delay: 0.8s;
}

.loader span:nth-child(10) {
animation-delay: 0.9s;
}
.loader span:nth-child(11) {
animation-delay: 1s;
}
.loader span:nth-child(12) {
animation-delay: 1.1s;
}
.loader span:nth-child(13) {
animation-delay: 1.2s;
}
.loader span:nth-child(14) {
animation-delay: 1.3s;
}
.loader span:nth-child(15) {
animation-delay: 1.4s;
}
.loader span:nth-child(16) {
animation-delay: 1.5s;
}
.loader span:nth-child(17) {
animation-delay: 1.6s;
}
.loader span:nth-child(18) {
animation-delay: 1.7s;
}
.loader span:nth-child(19) {
animation-delay: 1.8s;
}
.loader span:nth-child(20) {
animation-delay: 1.9s;
}
.loader span:nth-child(21) {
animation-delay: 2s;
}
.loader span:nth-child(22) {
animation-delay: 2.1s;
}

</style>
