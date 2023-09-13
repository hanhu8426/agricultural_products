<script setup>
import {useRouter} from "vue-router";
import {ref} from 'vue'

const currentDate = ref(new Date());
const formattedDate = ref(formatDate(currentDate.value));
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}
const selectedPage = ref(0);
const PageName = ['市场管理','农产品种类管理','链接管理','日报管理','周报管理','预测报告管理']

const toMarket = () => {
  selectedPage.value = 0;
}
const toVariety = () => {
  selectedPage.value = 1;
}
const toLink = () => {
  selectedPage.value = 2;
}
const toDaily = () => {
  selectedPage.value = 3;
}
const toMonthly = () => {
  selectedPage.value = 4;
}
const toForecast = () => {
  selectedPage.value = 5;
}

// 点击退出按钮进行退出
const router = useRouter();
const toLogin = ()=> {
    router.push('/login'); // 假设路由的名称是 'logout'
  }


</script>

<template>
  <div class="app-container">
  <div class="app-header">
    <div class="app-header-left">
      <span class="app-icon"></span>
      <p class="app-name">农产品市场数据分析平台后台管理</p>
    </div>
    <div class="app-header-right">
      
      <button class="profile-btn">
        <img src="../../assets/images/头像.JPG" />
        <span>您好！管理员</span>
      </button>
    </div>
  </div>
  <div class="app-content">
    <div class="app-sidebar">
      <RouterLink to="/manage" style="background: none;" @click="toMarket">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===0 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </a>
      </RouterLink>
      <RouterLink to="/manage/variety" style="background: none;" @click="toVariety">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===1 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-feather"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
        </a>
      </RouterLink>
      <RouterLink to="/manage/link" style="background: none;" @click="toLink">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===2 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </a>
      </RouterLink>
      <RouterLink to="/manage/daily" style="background: none;" @click="toDaily">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===3 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        </a>
      </RouterLink>
      <RouterLink to="/manage/monthly" style="background: none;" @click="toMonthly">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===4 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
        </a>
      </RouterLink>
      <RouterLink to="/manage/forecast" style="background: none;" @click="toForecast">
        <a class="app-sidebar-link" :class="{ 'app-sidebar-link active': selectedPage===5 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </a>
      </RouterLink>
      
      <a class="app-sidebar-link" @click="toLogin" style="margin-top: 80px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </a>
    </div>
    <div class="projects-section">
      <div class="projects-section-header">
        <p>{{ PageName[selectedPage] }}</p>
        <p class="time">{{ formattedDate }}</p>
      </div>
      <div class="projects-section-line">
        <RouterView></RouterView>
      </div>
</div>

</div>
</div>
</template>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

* {
  box-sizing: border-box;
}

:root {
  --app-container: #f3f6fd;
  --main-color: #1f1c2e;
  --secondary-color: #4A4A4A;
  --link-color: #1f1c2e;
  --link-color-hover: #c3cff4;
  --link-color-active: #fff;
  --link-color-active-bg: #1f1c2e;
  --projects-section: #fff;
  --message-box-hover: #fafcff;
  --message-box-border: #e9ebf0;
  --more-list-bg: #fff;
  --more-list-bg-hover:  #f6fbff;
  --more-list-shadow: rgba(209, 209, 209, 0.4);
  --button-bg: #1f1c24;
  --search-area-bg: #fff;
  --star: #1ff1c2e;
  --message-btn: #fff;
}

.dark:root {
  --app-container: #1f1d2b;
  --app-container: #111827;
  --main-color: #fff;
  --secondary-color: rgba(255,255,255,.8);
  --projects-section: #1f2937;
  --link-color: rgba(255,255,255,.8);
  --link-color-hover: rgba(195, 207, 244, 0.1);
  --link-color-active-bg: rgba(195, 207, 244, 0.2);
  --button-bg: #1f2937;
  --search-area-bg: #1f2937;
  --message-box-hover: #243244;
  --message-box-border: rgba(255,255,255,.1);
  --star: #ffd92c;
  --light-font: rgba(255,255,255,.8);
  --more-list-bg: #2f3142;
  --more-list-bg-hover:  rgba(195, 207, 244, 0.1);
  --more-list-shadow: rgba(195, 207, 244, 0.1);
  --message-btn: rgba(195, 207, 244, 0.1);
}

html, body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

body {
  font-family: 'DM Sans', sans-serif;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-color: var(--app-container);
}

button, a {
  cursor: pointer;
}

.app {
  &-container {
    width: 1240px;
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    background-color: var(--app-container);
    transition: .2s;
    max-width: 1800px;
    
    button, input, optgroup, select, textarea {
      font-family: 'DM Sans', sans-serif;
    }
  }
  
  &-content {
    display: flex;
    height: 100%;
    overflow: hidden;
    padding: 16px 24px 24px 0;
  }
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 24px;
    position: relative;
    
    &-left, &-right {
      display: flex;
      align-items: center;
    }
    
    &-left { flex-grow: 1; } 
    
    &-right button {
      margin-left: 10px; 
    }
  }
  
  &-icon {
    width: 26px;
    height: 2px;
    border-radius: 4px;
    background-color: var(--main-color);
    position: relative;
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 2px;
      border-radius: 4px;
      background-color: var(--main-color);
      left: 50%;
      transform: translatex(-50%);
    }
    
    &:before { top: -6px; }
    &:after { bottom: -6px; }
  }
  
  &-name {
    color: var(--main-color);
    margin: 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    margin: 0 32px;
  }
}

.mode-switch {
  background-color: transparent;
  border: none;
  padding: 0;
  color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
}



.add-btn {
  color: #fff;
  background-color: var(--button-bg);
  padding: 0;
  border: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-btn {
  color: var(--main-color);
  padding: 0;
  border: 0;
  background-color: transparent;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-btn {
  padding: 0;
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 12px;
  border-left: 2px solid #ddd;
  
  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 4px;
  }
  
  span {
    color: var(--main-color);
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
}

.page-content{
  flex: 1;
  width: 100%;
}

.app-sidebar {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &-link {
    color: var(--main-color);
    color: var(--link-color);
    margin: 16px 0;
    transition: .2s;
    border-radius: 50%;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
      background-color: var(--link-color-hover);
      color: var(--link-color-active);
    }

    &.active {
      background-color: var(--link-color-active-bg);
      color: var(--link-color-active);
    }
  }
}

.projects-section {
  flex: 2;
  background-color: var(--projects-section);
  border-radius: 32px;
  padding: 32px 32px 0 32px;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  
  &-line {
    justify-content: space-between;
    align-items: center;
    padding-bottom: 32px;
  }
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    color: var(--main-color);
    
    p {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      opacity: .9;
      margin: 0;
      color: var(--main-color);
    }
    
    .time {
      font-size: 20px;
    }
  }
}



.project-box {
  --main-color-card: #dbf6fd;
  border-radius: 30px;
  padding: 16px;
  background-color: var(--main-color-card);
  
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    color: var(--main-color);
    
    span {
      color: #4A4A4A;
      opacity: .7;
      font-size: 14px;
      line-height: 16px;
    }
  }
  
  &-content-header {
    text-align: center;
    margin-bottom: 16px;
    
    p { margin: 0; }
  }
  
  &-wrapper {
    padding: 8px;
    transition: .2s;
  }
}

.project-btn-more {
  padding: 0;
  height: 14px;
  width: 24px;
  height: 24px;
  position: relative;
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  
  /*&:after, &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--main-color);
    opacity: .8;
    left: 50%;
    transform: translatex(-50%);
  }
  
  &:before { top: 0;}
  &:after { bottom: 0; }*/
}

.more-wrapper {
  position: relative;
}

.box-content-header {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  opacity: .7;
}

.box-content-subheader {
  font-size: 14px;
  line-height: 24px;
  opacity: .7;
}

.box-progress {
  display: block;
  height: 4px;
  border-radius: 6px;
  
  &-bar {
    width: 100%;
    height: 4px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    margin: 8px 0;
  }
  
  &-header {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    margin: 0;
  }
  
  &-wrapper {
    
  }
  
  &-percentage {
    text-align: right;
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
  }
}

.project-box-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    background-color: rgba(255,255,255,0.6);;
    width: calc(100% + 32px);
    top: 0;
    left: -16px;
    height: 1px;
  }
}

.participants {
  display: flex;
  align-items: center;
  
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    
    &:not(:first-child) {
      margin-left: -8px;
    }
  }
}

.add-participant {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255,255,255,0.6);
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.days-left {
  background-color: rgba(255,255,255,0.6);
  font-size: 12px;
  border-radius: 20px;
  flex-shrink: 0;
  padding: 6px 16px;
  font-weight: 700;
}

.mode-switch.active .moon {
  fill: var(--main-color);
}



@media screen and (max-width: 980px) {
  .project-boxes.jsGridView .project-box-wrapper {
    width: 50%;
  }
  
  .status-number, .status-type {
    font-size: 14px;
  }
  
  .status-type:after {
    width: 4px;
    height: 4px;
  }
  
  .item-status { margin-right: 0; }
}

@media screen and (max-width: 880px) {
  .messages-section {
    transform: translateX(100%);
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    
    .messages-close { display: block; }
  }
  
  .messages-btn { display: flex; }
}

@media screen and (max-width: 720px) {
  .app-name, .profile-btn span { display: none; }
  
  .add-btn, .notification-btn, .mode-switch {
    width: 20px;
    height: 20px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  .app-header-right button {
    margin-left: 4px;
  }
}

@media screen and (max-width: 520px) {
  .projects-section { overflow: auto; }
  .project-boxes { overflow-y: visible; }
  
  .app-sidebar, .app-icon { display: none; }
  
  .app-content { padding: 16px 12px 24px 12px;}
  
  .status-number, .status-type {
    font-size: 10px;
  }
  
  .view-btn {
    width: 24px;
    height: 24px;
  }
  
  .app-header {
    padding: 16px 10px;
  }
  
  .search-input {
    max-width: 120px;
  }
  
  .project-boxes.jsGridView .project-box-wrapper {
    width: 100%;
  }
  
  .projects-section {
    padding: 24px 16px 0 16px;
  }
  
  .profile-btn img {
    width: 24px;
    height: 24px;
  }
  
  .app-header {
    padding: 10px;
  }
  
  .projects-section-header p,
  .projects-section-header .time{
    font-size: 18px;
  }
  
  .status-type {
    padding-right: 4px;
    
    &:after {
      display: none;
    }
  }
  
  .search-input {
    font-size: 14px;
  }
  
  .messages-btn { top: 48px; }

  .box-content-header {
    font-size: 12px;
    line-height: 16px;
  }

  .box-content-subheader {
    font-size: 12px;
    line-height: 16px;
  }

  .project-boxes.jsListView .project-box-header > span {
    font-size: 10px;
  }

  .box-progress-header {
    font-size: 12px;
  }

  .box-progress-percentage {
    font-size: 10px;
  }

  .days-left {
    font-size: 8px;
    padding: 6px 6px;
    text-align: center;
  }

  .project-boxes.jsListView .project-box > * {
    margin-right: 10px;
  }

  .project-boxes.jsListView .more-wrapper {
    right: 2px;
    top: 10px;
  }
}

</style>