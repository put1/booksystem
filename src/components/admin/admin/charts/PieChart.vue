<template>
  <div :class="main" :style="{height:height,width:width}"></div>
</template>

<script>
  let echarts = require('echarts')
  require('echarts/theme/macarons')
  export default {
    name: "PieChart",
    props: {
      main: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    methods: {
      mounted() {
        this.myEcharts()
      },
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(this.$el, 'macarons');
        // 指定图表的配置项和数据
        this.chart.setOption({
          backgroundColor: '#ffffff',
          title: {
            text: '图书种类总量',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#1e2a2b'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '該類總數',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 500, name: 'JAVA'},
                {value: 310, name: 'Python'},
                {value: 274, name: 'Html'},
                {value: 235, name: 'Vue'},
                {value: 400, name: 'C++/C'},
              ].sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              label: {
                color: 'black'
              },
              labelLine: {
                lineStyle: {
                  color: 'black'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#00a2e9',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        });
      }
    },
    mounted() {
      this.myEcharts()
    }
  }
</script>

<style scoped>

</style>
