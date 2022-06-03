<template>
  <el-container class="cart">
    <el-header class="header">购物车</el-header>
    <el-main class="cartLists">
      <el-table ref="multipleTable" :data="goodsList" @selection-change="handleSelectionChange" tooltip-effect="dark">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column label="全选" width="120">
        </el-table-column>
        <el-table-column label="商品信息" width="120">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="url + scope.row.thumbnail"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="" width="180">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <el-input-number size="small" v-model="scope.row.num" @change="handleChange" :min="1" :max="9999">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="180">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, goodsList)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="footer">
      <div class="caculate">
        <a class="sum" :model="sum"> 总价：{{ sum }}</a>
        <el-button type="primary" @click="generateOrder()" round>结算</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
import { mapState } from 'vuex';
import { cartAPI } from '@/api/cart'
import { deleteGoodsAPI } from '@/api/deleteGoods'
import { generateOrderAPI } from '@/api/generateOrder'
Vue.use(Plugin);

export default {
  data() {
    return {
      goodsList: [],
      selectGoodsList: [],
      url: 'http://202.193.53.235:8080/',
      sum: 0,
      multipleTable: []
    }
  },
  computed: {
    ...mapState("login", ["user"])
  },
  // mounted:function(){
  //   this.timer = setInterval(this.autoPrintBtnClicked, 10000);//60秒后运行 autoPrintBtnClicked方法
  // },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      cartAPI(this.user.userid).then(response => {
        //console.log(response);
        this.goodsList = response;
      })
    },
    handleChange(value) {
      //console.log(value);
    },
    deleteRow(index, rows) {
      //console.log(rows[index].cardid);
      deleteGoodsAPI(this.user.userid, rows[index].cardid).then(response => {
      })
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleTable = val;               //  this.multipleTable 选中的值
      this.sum = 0;
      this.selectGoodsList = [];
      //选中的商品列表的价格计算和记录商品ID
      for (var i = 0; i < this.multipleTable.length; i++) {
        this.selectGoodsList[i] = this.multipleTable[i].goodsId;
        this.sum += this.multipleTable[i].num * this.multipleTable[i].price;
      }
      //console.log(this.selectGoodsList);
    },
    generateOrder() {
      var tempcartList = "";
      var selectGoodsList = this.selectGoodsList;
      for (var i = 0; i < selectGoodsList.length; i++) {
        if (i === this.selectGoodsList.length - 1) {
          tempcartList = tempcartList + selectGoodsList[i];
        }
        else {
          tempcartList = tempcartList + selectGoodsList[i] + ",";
        }
      }
      //console.log(tempcartList);
      generateOrderAPI(this.user.userid, tempcartList).then(response => {
        console.log(response);
      })
    }
    // autoPrintBtnClicked() {
    //   console.log("定时器进来了......")
    //   return this.getGoodsList()
    // }
  },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  // },    

}
</script>

<style scoped lang="less">
.cart {
  width: 1200px;
  margin: 0 auto;

  .cartLists {
    margin-left: 100px;
    margin-right: 100px;
    border: 1px solid rgb(204, 196, 196);
    border-radius: 40px;

    .goods {
      width: 800px;
      height: 100px;
      margin-top: 50px;
      margin-bottom: 50px;
      margin-left: 100px;
      margin-right: 100px;
      border: 1px solid rgb(0, 0, 0);
      border-radius: 20px;

      .img {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 24px;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 10px;
        width: 80px;
        height: 80px;
      }

      .goodsname {
        margin-left: 24px;
        margin-right: 24px;
      }

      .price {
        margin-left: 46px;
        margin-right: 80px;
      }

      .del {
        margin-left: 20px;
        width: 20px;
      }
    }
  }

  .header {
    margin-top: 50px;
  }

  .footer {
    margin-top: 20px;
  }

  .caculate {
    float: right;
    margin-right: 160px;
  }

  .sum {
    margin: 110px;
  }
}
</style>