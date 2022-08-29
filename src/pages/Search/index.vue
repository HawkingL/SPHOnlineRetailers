<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
            <!-- 品牌信息展示 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">x</i></li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 综合排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changOrder('1')">
                  <a>综合<i v-show="isOne" class="iconfont" :class="{'icon-jiantou_yemian_xiangshang_o': isAsc, 'icon-jiantou_yemian_xiangxia_o': !isAsc}"></i></a>
                </li>
                <li :class="{active: !isOne}" @click="changOrder('2')">
                  <a>价格<i v-show="!isOne" class="iconfont" :class="{'icon-jiantou_yemian_xiangshang_o': isAsc, 'icon-jiantou_yemian_xiangxia_o': !isAsc}"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        //一级分类的ID
        "category1Id": "",
        //二级分类的ID
        "category2Id": "",
        //三级分类的ID
        "category3Id": "",
        //分类名字
        "categoryName": "",
        //关键字
        "keyword": "",
        //排序（1：代表综合，2：代表价格，desc代表降序，asc升序）
        "order": "1:asc", 
        //分页器用：代表当前是第几页
        "pageNo": 1,
        //代表的是每一页展示的数据
        "pageSize": 10,
        //平台售卖属性带的参数
        "props": [],
        //品牌
        "trademark": ""
      }
    }
  },
  computed: {
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    //计算样式的归属
    isOne() {
      return this.searchParams.order.indexOf('1') != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1;
    },
    //获取search模块的total数据
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  //挂载之前传参
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
  },
  methods: {
    //向服务器发送请求获取search模块数据
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除面包屑的分类,（清除三级联动传过来的query中的参数，重新发起请求更新页面，判断params中是否有参数如果有参数，携带参数进行路由跳转，跳转本路由，实现地址栏和data中searchList数据的更新）
    removeCategoryName() {
      //清除上一次的searchParams中的数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      //再次发起请求，更新页面
      this.getData();
      //跳转路由（在自己的路由组件中跳转自己的路由组件），修改自己的地址栏（只是删除query参数，不应该删除其他参数，因此在路由跳转的时候应该将params参数带过去）
      if (this.$route.params) {
        this.$router.push({name:'search',params:this.$route.params});
      }
    },
    //面包屑中的删除关键字
    removeKeyword() {
      //keyword置空
      this.searchParams.keyword = undefined;
      //再次发送请求，更新页面
      this.getData();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      //跳转路由（在自己的路由组件中跳转自己的路由组件），修改自己的地址栏（只是删除query参数，不应该删除其他参数，因此在路由跳转的时候应该将params参数带过去）
      if (this.$route.query) {
        this.$router.push({name:'search',query:this.$route.query});
      }
    },
    //自定义事件的回调
    trademarkInfo(trademarkInfo) {
      //整理参数
      this.searchParams.trademark = `${trademarkInfo.tmId}:${trademarkInfo.tmName}`;
      //再次发送请求，更新数据
      this.getData();
    },
    //面包屑中品牌信息的删除
    removeTrademark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      //再次发送请求，更新数据
      this.getData();
    },
    //收集平台属性的地方（自定义事件）
    attrInfo(attr, attrValue) {
      //将平台属性值拼接成固定样式的字符串
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重：将重复的元素剔除
      if (this.searchParams.props.indexOf(props) == -1) {
        //将新的元素添加到数组中
        this.searchParams.props.push(props);
      }
      //携带新添加的平台属性向服务器再次发送请求，更新搜索数据
      this.getData();
    },
    //面包屑中删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index,1);
      this.getData();
    },
    //排序的操作
    changOrder(flag) {
      //flag表示点击的是综合还是价格
      let originFlag = this.searchParams.order.split(':')[0];
      let originSort = this.searchParams.order.split(':')[1];
      let newOrder = '';
      if (originFlag == flag) {
        newOrder = `${originFlag}:${originSort=='desc'?'asc':'desc'}`;
      }else{
        newOrder = `${flag}:${'desc'}`
      }
      //将新的order赋给searchParams
      this.searchParams.order = newOrder;
      //再次发送请求
      this.getData();
    },
    //自定义事件获取当前页数
    getPageNo(pageNo) {
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      //再次发送请求
      this.getData();
    }
  },
  watch: {
    $route(newValue, oldValue) {
      //再次发请求之前整理给服务器的参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //再次发起请求
      this.getData();
      //清除上一次的searchParams中的一些数据，以接收下一次的参数
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>