<template>
    <div>
        <div ref="editor" v-model="editorContent" style="text-align:left"></div>
        <el-button type="warning" plain @click="getContent()">获取内容</el-button>
        <el-button type="primary" plain @click="clearContent()">清空内容</el-button>
    </div>
</template>

<script>
import Editor from "wangeditor";
import {Button} from "element-ui";
export default {
    name:"Editor",
    data() {
        return {
            editorContent:""
        }
    },
    methods:{
        getContent() {
            alert(this.editorContent)
        },
        clearContent() {
            this.editorContent = "";
            this.editor.txt.clear();
        }
    },
    mounted() {
        // 插件实例化
        this.editor = new Editor(this.$refs.editor);
        // editor 配置
        this.editor.customConfig.onchange = html=>{
            this.editorContent = html
        }
        this.editor.create();
    }
}
</script>
<style>
    
</style>