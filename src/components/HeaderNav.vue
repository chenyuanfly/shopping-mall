<template>
    <el-menu :default-active="active" mode="horizontal" text-color="#000000" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/product">商品管理</el-menu-item>
        <el-menu-item index="/params">规格参数</el-menu-item>
        <el-menu-item index="/cart">购物车</el-menu-item>
        <el-menu-item index="/order">我的订单</el-menu-item>
        <el-menu-item class="user">
            <img class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <!-- <span class="user-name">{{user.username}}</span> -->
            <el-button @click="logoutHandle">退出</el-button>
        </el-menu-item>
    </el-menu>
</template>
import {mapSate} from "vuex"

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            active: "/"
        }
    },
    computed: {
        ...mapState("login", ["user"])
    },
    methods: {
        ...mapMutations("login", ["setUser"]),
        logoutHandle() {
            this.setUser({})
            localStorage.removeItem("cyf");
            this.$router.push("/login")
        }
    }
};
</script>

<style scoped lang="less">
.user {
    float: right !important;
    margin-right: 20px !important;
    line-height: 60px;

    .user-name {
        color: rgb(17, 14, 14);
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid rgb(17, 14, 14);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }

    .avatar {
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid rgb(17, 14, 14);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }
}
</style>