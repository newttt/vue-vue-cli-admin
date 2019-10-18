<template>
        <div class="echart" ref="myCharts"></div>

</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
import Echarts from "@components/echarts"
import {getLineApi} from "@api"
export default { 
    name:"Home",
    data() {
        return {
            title:["娱乐","房租","购物","饮食","出行"]
        }
    },
    async created() {
        
    },
    async mounted() {
        let data = await getLineApi();
        let myChartData = data.data.data;
        myChartData.forEach((item,index)=>{
            item.name = this.title[index]
        })
        // 获取dom元素进行初始化实例
        let myChart = echarts.init(this.$refs.myCharts);
        myChart.title="环形图"
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:this.title
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:myChartData
                }
            ]

        })
    },
    methods:{
    drawPie() {
        
    }
}

}
</script>
<style>
    .echart {
        width: 100%;
        height:500px;
    }
</style>