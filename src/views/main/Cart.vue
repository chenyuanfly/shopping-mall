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
        <el-button type="primary" round>结算</el-button>
      </div>
    </el-footer>
  </el-container>

  <!-- <div class="cart">
    <el-button @click="look">goodsList</el-button>
    <ul class="cartLists">
      <div>购物车</div>>
      <li class="goods" v-for="(items, index) in goodsList" :key='index'>
        <input type="checkbox" :checkbox="checkboxON" @click="select(index)">
        <img class="img" :src="url + items.thumbnail" />
        <a class="goodsname">{{ items.name }}</a>
        <button class="minus" @click="minus">-</button>
        <span class="num">{{ items.num }}</span>
        <button class="add" @click="add">+</button>
        <a class="price">{{ items.price }}</a>
        <a class="del" @click="del">删除</a>
      </li>
    </ul>
  </div> -->
</template>

<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
Vue.use(Plugin);

import { cartAPI } from '@/api/cart'
export default {
  data() {
    return {
      goodsList: [],
      url: 'http://202.193.53.235:8080/',
      sum: 0,
      multipleTable: []
    }
  },
  // mounted:function(){
  //   this.timer = setInterval(this.autoPrintBtnClicked, 10000);//60秒后运行 autoPrintBtnClicked方法
  // },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      cartAPI().then(response => {
        console.log(response);
        this.goodsList = response;
      })
    },
    look() {
      console.log(this.goodsList);
    },
    handleChange(value) {
      console.log(value);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleTable = val;               //  this.multipleTable 选中的值
      this.sum = 0;
      for (var i = 0; i < this.multipleTable.length; i++) {
        this.sum += this.multipleTable[i].num * this.multipleTable[i].price;
      }
    },
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

      .checkbox {}

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