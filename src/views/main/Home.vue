<template>
  <el-container class="home">
    <el-header class="header">首页</el-header>
    <el-main class="homeLists">
      <el-row>
        <el-col :span="8" v-for="(items, index) in goodsList" :key="index">
          <el-card class="card" :body-style="{ padding: '0px' }">
            <img :src="url + items.pthumbnail" class="image">
            <div style="padding: 24px;">
              <span>{{ items.name }}</span>
              <div class="bottom">
                <span class="price">¥ {{ items.price1 }}</span>
                <span class="button" @click="insert(user.userid, items.id, 1, items.price1)">添加</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { homeAPI } from '@/api/home'
import { mapState } from 'vuex';
import { insertGoodsAPI } from '@/api/insertGoods';

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      goodsList: [],
      url: 'http://202.193.53.235:8080/',
    };
  },
  computed: {
    ...mapState("login", ["user"])
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      homeAPI().then(response => {
        //console.log(response);
        this.goodsList = response;
      })
    },
    insert(userid, goodsid, num, price) {
      console.log("添加购物车" + userid + " " + goodsid + " " + num + " " + price);
      insertGoodsAPI(userid, goodsid, num, price).then(response => {
        //console.log("response" + response);
      })
    }
  }
}
</script>

<style>
.home {
  width: 1200px;
  margin: 0 auto;
}

.header {
  margin-top: 50px;
}

.homeLists {
  margin-left: 20px;
}

.price {
  font-size: 18px;
  margin: auto;
  color: rgb(206, 50, 11);
  float: left;
}

.bottom {
  margin: 20px;
}

.card {
  margin: 10px;
  height: 220px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100px;
  margin: auto;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
