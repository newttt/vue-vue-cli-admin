<template>
<div class="books-list">
    <!-- 选择器 -->
    <el-select v-model="apiInfo.free">
        <el-option
        v-for="item in freeSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
   </el-select>
    <el-select v-model="apiInfo.group">
        <el-option
        v-for="item in groupSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
   </el-select>
    <el-select v-model="apiInfo.finish">
        <el-option
        v-for="item in finishSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
   </el-select>
    <el-select v-model="apiInfo.sortId">
        <el-option
        v-for="item in sortIdSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
   </el-select>
    <!-- 表格 -->
  <el-table
    :data="booksList"
    border
    :fit="flag"
    height="100%"
    style="width: 100%;">
    <el-table-column
      fixed
      prop="name"
      label="书籍名称"
      align="center"
      width="120">
      
    </el-table-column>
    <el-table-column
      prop="authorIcon"
      label="作者头像"
      align="center"
      width="120">
      <template slot-scope="scope">
        <img :src="scope.row.authorIcon" style="width: 80px;height: 80px;margin:auto">
      </template>
    </el-table-column>
    <el-table-column
      prop="authorName"
      label="作者姓名"
      align="center"
      width="120">
    </el-table-column>
    
    <el-table-column
      prop="icon"
      label="书籍封面"
      align="center"
      width="150">
      <template slot-scope="scope">
        <img :src="scope.row.icon" style="width: 100px;height: 140px;margin:auto">
      </template>
    </el-table-column>
    <el-table-column
      prop="bookTags"
      label="标签"
      align="center"
      width="150">
      <template slot-scope="scope">
        <el-tag v-for="(item,index) in scope.row.bookTags" :type="index%2 ? 'danger' : 'success'" :key="index">
            {{item}}

        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="recommend"
      label="梗概"
      >
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="上次更新时间"
      sortable
      align="center"
      width="200">
      <template slot-scope="scope">
        <span>
            {{scope.row.updateTime}}
        </span>
      </template>
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row,1)" type="text" size="small">编辑</el-button>
        <el-button @click="handleClick(scope.row,0)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="300"
    @current-change="currentChangeHandler"
    >
</el-pagination>
  </div>
</template>
<script>
import moment from "moment";
// let moment = require("moment");
import {booksListApi} from "@api";
import {Table,Button,Tag} from "element-ui";
import Modal from "@components/modal"
export default {
    name:"BooksList",
    data() {
        return {
            flag:true,
            apiInfo:{
                page:"1",
                pageSize: "10",
                free: "0",
                group: "1",
                finish: "0",
                sortId: ""
            },
            booksList:[],
            
            // 选择器
            freeSelect: [{
                value: '0',
                label: '价格'
                }, {
                value: '1',
                label: '免费'
                }, {
                value: '2',
                label: '付费'
                }],
                // freeVal: '0',
                // 
            groupSelect: [{
                value: '1',
                label: '男频'
                }, {
                value: '2',
                label: '女频'
                }, {
                value: '3',
                label: '出版'
                }],
                // groupVal: '1',
                // 
            finishSelect: [{
                value: '0',
                label: '全部'
                }, {
                value: '1',
                label: '完结'
                }, {
                value: '2',
                label: '连载'
                }],
                // finishVal: '0',
                // 
            sortIdSelect: [
                {
                    value:"",
                    label:"全部"
                },
                {
                value: '1000010',
                label: '现代都市'
                }, {
                value: '1000012',
                label: '仙侠武侠'
                }, {
                value: '1000011',
                label: '奇幻修真'
                }, {
                value: '1000013',
                label: '科幻游戏'
                }, {
                value: '1000014',
                label: '悬疑推理'
                }, {
                value: '1000015',
                label: '军事战争'
                }
                ],
                // sortIdVal: '',
                // 
                
        }
    },
    created() {
        this.getBookList();
    },
    watch:{
        apiInfo:{
            handler(){
                this.getBookList();
            },
            deep:true
        }
    },
    methods:{
        async getBookList() {
            let data = await booksListApi(this.apiInfo);
            console.log(data.bookList)
            data.bookList.forEach(item=>{
                item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
            })
            this.booksList = data.bookList;
        },
        // 分页回调
        currentChangeHandler(page) {
            this.apiInfo.page = page;
        },
        handleClick(item,flag) {
            if(flag) {
                // 编辑
                this.$alert( <Modal info={item} />, {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton:false,
                });

            }else {
                //  删除
                this.$confirm('将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // 此处进行ajax请求进行删除操作
                        // console.log(item.id);

                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });

            }
        }
    }
}
</script>

<style>
.books-list {
    height: 100%;
    width: 100%;
}





</style>