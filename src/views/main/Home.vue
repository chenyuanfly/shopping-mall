<template>
  <div class="home">
    Home
    <el-row>
      <el-col :span="5" v-for="(items, index) in goodsList" :key="index">
        <el-card class="card" :body-style="{ padding: '0px' }">
          <img :src="url + items.pthumbnail" class="image">
          <div style="padding: 24px;">
            <span>{{ items.name }}</span>
            <div class="bottom">
              <span class="price">¥ {{ items.price1 }}</span>
              <span class="button" @click="insert">添加</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { homeAPI } from '@/api/home'

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      currentDate: new Date(),
      goodsList: [],
      url: 'http://202.193.53.235:8080/',
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      homeAPI().then(response => {
        console.log(response);
        this.goodsList = response;
      })
    },
    insert() {
      console.log("添加购物车")
    }
  }
}
</script>

<style>
.home {
  width: 1200px;
  margin: 0 auto;
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
