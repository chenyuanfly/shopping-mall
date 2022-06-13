<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商城</span>
            </div>
            <el-tabs v-model="currentIndex" @tab-click="handleTabsClick" stretch>
                <el-tab-pane label="登陆" name="login">
                    <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
                        <el-form-item label="账号" label-width="80px" prop="username">
                            <el-input type="text" v-model="loginForm.username" />
                        </el-form-item>
                        <el-form-item label="密码" label-width="80px" prop="passwrod">
                            <el-input type="password" v-model="loginForm.passwrod" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册" name="register">
                    <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm">
                        <el-form-item label="账号" label-width="80px" prop="username">
                            <el-input type="text" v-model="registerForm.username" />
                        </el-form-item>
                        <el-form-item label="密码" label-width="80px" prop="passwrod">
                            <el-input type="password" v-model="registerForm.passwrod" />
                        </el-form-item>
                        <el-form-item label="确认密码" label-width="80px" prop="againpasswrod">
                            <el-input type="password" v-model="registerForm.againpasswrod" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
//import {request} from "../api/user"
import { loginAPI } from "../api/login"
import { registerAPI } from "../api/register"
import { mapMutations } from "vuex"

export default {
    data() {
        var validateusername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error("输入不能为空"))
            }
            else {
                callback();
            }
        }

        var validatePassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error("输入不能为空"))
            }
            else {
                callback();
            }
        }

        var validateAgainPassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error("输入不能为空"))
            }
            else if (value !== this.registerForm.passwrod) {
                callback(new Error("两次密码不一致"))
            }
            else {
                callback();
            }
        }

        return {
            currentIndex: "login",
            loginForm: {
                username: "",
                passwrod: "",
            },
            registerForm: {
                username: "",
                passwrod: "",
                againpassword: ""
            },
            activeTab: "login",
            rules: {
                username: [
                    {
                        validator: validateusername,
                        trigger: "blur"
                    }
                ],
                passwrod: [
                    {
                        validator: validatePassWord,
                        trigger: "blur"
                    }
                ],
                againpasswrod: [
                    {
                        validator: validateAgainPassWord,
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        ...mapMutations("login", ["setUser"]),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.activeTab === "login") {
                        //console.log(this.loginForm.username + " " + this.loginForm.passwrod)
                        loginAPI(this.loginForm.username,
                            this.loginForm.passwrod
                        ).then(response => {
                            //console.log(response);
                            if (response !== "invalid") {
                                this.loginSuccess();
                                this.setUser(response);
                                localStorage.setItem(
                                    "cyf",
                                    JSON.stringify(response)
                                );
                                this.$router.push('/')
                            } else {
                                this.loginFial();
                            }
                        })
                    }

                    if (this.activeTab === "register") {
                        registerAPI(this.registerForm.username,
                            this.registerForm.againpasswrod
                        ).then(response => {
                            //console.log(response);
                            if (response === "OK") {
                                this.registerSuccess();
                            }
                            else if (response === "isexist") {
                                this.registerExist();
                            }
                            else {
                                this.registerFial();
                            }
                        })
                    }

                } else {
                    return;
                }
            });
        },

        handleTabsClick(tab) {
            this.activeTab = tab.name;
        },

        loginSuccess() {
            this.$notify({
                title: '登录成功',
            });
        },
        loginFial() {
            this.$notify({
                title: '登录失败',
            });
        },
        registerSuccess() {
            this.$notify({
                title: '注册成功，请返回登录界面',
            });
        },
        registerFial() {
            this.$notify({
                title: '注册失败',
            });
        },
        registerExist() {
            this.$notify({
                title: '用户以存在',
            });
        },
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 1200px;
    margin: 0 auto;

    .box-card {
        width: 600px;
        margin: 100px auto;
    }
}
</style>