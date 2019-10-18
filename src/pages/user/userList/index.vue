<template>
<div class="user-list">
    <div style="margin-top: 20px">
        <el-button 
            @click="toggleSelection(true)">选中所有黑名单人员</el-button>
        <el-button 
            @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="blacklist"
            label="黑名单"
            width="120">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.blacklist"
                    active-color="#ff4949"
                    inactive-color="#ccc">
                </el-switch>
            
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="level"
            label="等级"
            width="120">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level > 3" type="danger">{{scope.row.level}}级</el-tag>
                <el-tag v-else>{{scope.row.level}}级</el-tag>
            
            </template>
        </el-table-column>
        <el-table-column
            prop="icon"
            label="头像"
            width="120">
            <template slot-scope="scope">
                <img :src="scope.row.icon" style="border-radius: 50%"/>
            
            </template>
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="120">
            <template slot-scope="scope">
                {{scope.row.sex ? "男" : "女"}}
            </template>
        </el-table-column>
        
        <el-table-column
            label="出生日期"
            width="120">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
        </el-table-column>
        
        <el-table-column
            prop="address"
            label="出生地"
            show-overflow-tooltip>
        </el-table-column>
  </el-table>
  
</div>
</template>
<script>
import {Table,Button,Switch,Tag} from "element-ui"
import {getUserList} from "@api"
export default {
    name:"UserList",
    async created() {
        let data = await getUserList();
        console.log(data.data.data);

        this.tableData = data.data.data;
        this.tableData.forEach(item=>{
            if(item.blacklist) {
                 this.blackList.push(item)
            }
           
        })
    },
    data() {
      return {
        tableData: [],
        blackList:[],
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          this.blackList.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>
<style scoped>
    .user-list {
        height: 100%;
    }


</style>