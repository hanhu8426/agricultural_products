<script setup>
import { ref } from 'vue'
const currentDate = ref(new Date());
const formattedDate = ref(formatDate(currentDate.value));
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}
</script>

<template>
    <div class="Exponent">
        <div class="exponent_box">
            <div class="exponent_box_title">
                <img src="../../assets/images/exponent_pic.png" alt="" style="width: 30px;height: 30px;">
                <span style="margin-left: 10px;font-size: 22px;font-weight: 700;">农产品批发价格200指数</span>
            </div>
            <p class="exponent_box_date">{{ formattedDate }}</p>
            <div class="exponent_box_pic">
                <div class="line_all"></div>
                <div class="line_dis"></div>
                <div class="line1_text">
                    <span style="display: block;">“菜篮子”产品批发</span>
                    <span style="display: block;text-align: center;">
                        价格指数
                        
                    </span>
                </div>
                <div class="line1_data">122.39</div>
                <div class="line2_text">
                    <span style="display: block;">粮油产品批发</span>
                    <span style="display: block;text-align: center;">
                        价格指数
                        
                    </span>
                </div>
                <div class="line2_data">120.18</div>
                <div class="line0_text">
                    <span></span>
                    <span></span>
                </div>
                <div class="line0_data"></div>
            </div>
        </div>
        <div class="exponent_chart">

        </div>
    </div>
</template>

<style scoped>
.Exponent{
    width: 1240px;
    padding: 0 18px;
    padding-top: 20px;
    height: 486px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background-color: white;
}
.exponent_box{
    float: left;
    width: 350px!important;
    height: 100%;
}
.exponent_box_title{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 14px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px 4px 0 0;
    background: url(../../assets/images/home_title.png) no-repeat;
    background-size: 100% 100%;
}
.exponent_box_date{
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    font-weight: 700;
    font-size: 20px;
}
.exponent_box_pic{
    position: relative;
    margin-top: 20px;
    height: calc(100% - 90px);
}
.line_all{
    height: 196px;
    width: 24px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
}
.line_dis{
    position: absolute;
    height: 140px;
    width: 68px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
    top: 112px;
    left: 24px;
}
.line1_text{
    font-weight: 700;
    font-size: 15px;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #0dad3e;
    position: absolute;
    top: 48px;
    left: 83px;
}
.line1_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #0dad3e;
    position: absolute;
    top: 94px;
    left: 92px;
    text-align: center;
    line-height: 36px;
    font-family: Impact;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #0dad3e;
}
.line2_text{
    font-weight: 700;
    font-size: 15px;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #e1a412;
    position: absolute;
    top: 186px;
    left: 106px;
}
.line2_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #e8ab18;
    position: absolute;
    top: 232px;
    left: 92px;
    text-align: center;
    line-height: 36px;
    font-family: Impact;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #7dc53b;
}
.line0_text{
    width: 165px;
    height: 38px;
    line-height: 38px;
    background-color: #e42431;
    position: absolute;
    top: -18px;
    left: 24px;
    text-align: center;
}
.line0_data{
    width: 140px;
    height: 38px;
    border: 2px solid #e42431;
    position: absolute;
    top: -18px;
    left: 189px;
}
.exponent_chart{
    float: right;
    margin-left: 20px;
    width: 800px!important;
    height: 100%;
}
</style>