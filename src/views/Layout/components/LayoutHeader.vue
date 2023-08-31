<script setup>

</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <h2 class="title">
        农产品市场数据分析大数据平台
      </h2>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li> <RouterLink to="/dataQuery">数据查询</RouterLink> </li>
        <li> <RouterLink to="/">市场行情</RouterLink> </li>
        <li> <RouterLink to="/">分析预测</RouterLink> </li>
      </ul>
      <ul class="login">
        <li> <RouterLink to="/">管理员登录</RouterLink> </li>
      </ul>
      
      
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: url('@/assets/images/true.jpg') no-repeat center  / cover;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/R.png') no-repeat center / contain;
    }
  }

  .title{
    width: 200px;
    padding-top: 20px;
    text-align: center;
    font-family: Title;
    font-size: 28px;
    a {
      display: block;
      height: 64px;
      width: 100%;
      text-indent: -9999px;
    }
  }

  .app-header-nav {
    width: 600px;
    display: flex;
    padding-top: 10px;
    padding-left: 80px;
    position: relative;
    z-index: 998;
  
    li {
      width: 120px;
      text-align: center;
  
      a {
        font-size: 18px;
        font-weight: bold;
        line-height: 32px;
        height: 32px;
        display: block;
        
  
        &:hover {
          background-color: #f1efef;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .login{
    width: 120px;
    display: flex;
    padding-left: 40px;
    padding-top: 10px;
    position: relative;
    z-index: 998;
  
    li {
      width: 120px;
      text-align: center;
  
      a {
        font-size: 14px;
        font-weight: bold;
        line-height: 32px;
        height: 32px;
        display: block;
  
        &:hover {
          background-color: #f1efef;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>