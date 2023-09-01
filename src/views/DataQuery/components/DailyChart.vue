<template>
    <div>
      <div id="chart-container" style="width: 90%; height: 400px; margin: 0 auto;"></div>
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  
  export default {
    props:{
        refProductExponent: Array,
        refVegetableBasketExponent: Array,
        refGrainOilExponent: Array,
    },
    mounted() {
      Highcharts.chart('chart-container', {
        title:{
            text: '注：定基指数，以2015年为100计算',
            align: 'right',
            style: {
                fontSize: '12px', // 设置标题的大小
                fontWeight:  'normal'
            }
        },
        tooltip: {
          formatter: function () {
            // 只展示数据点的和值
            return '</b> ' + this.y;
          },
        },
        yAxis: {
            title: {
                enabled: false
            }
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%Y-%m-%d' // 日期格式为年月（例如：2022年01月）
            },
        },

        legend: {
            layout: 'horizontal',
            align: 'center', // 居中对齐
            verticalAlign: 'top'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: Date.parse('2023-08-22'), // 设置起始日期
                pointInterval: 24 * 3600 * 1000
            }
        },

        series: [{
            name: '农产品批发价格200指数',
            data: this.refProductExponent
        }
         , {
             name: '‘菜篮子’产品批发价格200指数',
             data: this.refVegetableBasketExponent
         }, {
             name: '粮油产品批发价格200指数',
             data: this.refGrainOilExponent
         }
        ],
        

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: '#f5fdfb' // 设置图表的背景颜色为浅蓝色
  },
    });
    }
}
  </script>
  
  