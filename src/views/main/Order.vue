<template>
    <el-container class="order">
        <el-header class="header">订单列表</el-header>
        <el-main>
            <el-table :data="orderList" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table ref="singleTable" class="orderDetail" :data="props.row.orderDetail"
                            highlight-current-row style="width: 100%">
                            <el-table-column type="index" width="50">
                            </el-table-column>
                            <el-table-column property="goodsName" label="商品名称" width="120">
                            </el-table-column>
                            <el-table-column property="nums" label="数量" width="120">
                            </el-table-column>
                            <el-table-column property="" label="价格">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>

                <el-table-column label="订单编号" prop="id">
                </el-table-column>
                <el-table-column label="下单时间" prop="orderTime">
                </el-table-column>
                <el-table-column label="总价格" prop="desc">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
import { orderAPI } from '@/api/order'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            //orderList 的结构
            // orderList: {
            //     id: [],
            //     orderDetail: [],
            //     orderTime: []
            // }
            orderList: []
        }
    },
    computed: {
        ...mapState("login", ["user"])
    },
    created() {
        this.getOrderList();
    },
    methods: {
        getOrderList() {
            orderAPI(this.user.userid).then(response => {
                this.orderList = response;
                //console.log(this.orderList);
            })
        }
    },
}
</script>

<style>
.order {
    width: 1200px;
    margin: 0 auto;
}

.header {
    margin-top: 50px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.orderDetail {
    margin-left: 40px;
}
</style>