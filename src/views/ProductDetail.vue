<template>
  <div class="product-detail">
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item
            v-for="(item, index) in detail.goodsCarouselList"
            :key="index"
          >
            <img :src="prefix(item)" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.goodsName }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice }}</span>
          <!-- <span>库存203</span> -->
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        :info="!count ? '' : count"
        @click="goTo()"
        text="购物车"
      />
      <van-goods-action-button
        type="warning"
        @click="addCart"
        text="加入购物车"
      />
      <van-goods-action-button
        type="danger"
        @click="goToCart"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { getDetail } from "../service/good";
import { addCart } from "../service/cart";
import sHeader from "@/components/SimpleHeader";
import { Toast } from "vant";
export default {
  data() {
    return {
      detail: {
        goodsCarouselList: [],
      }
     
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await getDetail(id);
    this.detail = data;
    this.$store.dispatch("updateCart");
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goTo() {
      this.$router.push({ path: "/cart" });
    },
    async addCart() {
      const { data, resultCode } = await addCart({
        goodsCount: 1,
        goodsId: this.detail.goodsId,
      });
      if (resultCode == 200) Toast.success("添加成功");
      this.$store.dispatch("updateCart");
    },
    async goToCart() {
      const { data, resultCode } = await addCart({
        goodsCount: 1,
        goodsId: this.detail.goodsId,
      });
      this.$store.dispatch("updateCart");
      this.$router.push({ path: "/cart" });
    },
  },
  components: {
    sHeader,
  },
  computed: {
    count() {
      return this.$store.state.cartCount
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(this);
    next();
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.product-detail {
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>
