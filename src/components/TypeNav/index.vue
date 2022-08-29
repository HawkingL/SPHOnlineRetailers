<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <!-- 事件的委派 -->
        <div @mouseleave="leaveIndex" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <!-- 过渡动画 -->
          <transition name="sort">
            <!-- 三级联动 -->
            <div class="sort" v-show="show">
              <!-- 利用事件委派 + 编程式路由导航可以更加高效的处理三级联动的路由跳转 -->
              <div class="all-sort-list2" @click="goSearch">
                <div 
                  class="item" 
                  v-for="(c1,index) in categoryList" 
                  :key="c1.categoryId" 
                  :class="{cur:currentIndex == index}"
                >
                  <h3 @mouseenter="changeIndex(index)">
                    <!-- 给标签添加自定义属性在路由传参时确定传递的参数来自于谁 -->
                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                  </h3>
                  <!-- 二级、三级分类 -->
                  <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dl class="fore">
                        <dt>
                          <a :data-categoryName="c2.categoryName" :data-category2Id="c1.categoryId">{{c2.categoryName}}</a>
                        </dt>
                        <dd>
                          <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                            <a :data-categoryName="c3.categoryName" :data-category3Id="c1.categoryId">{{c3.categoryName}}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
//按需引入lodash中的throttle函数实现节流
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标上哪一个一级分类
      currentIndex: -1,
      show: true
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  mounted() {
    //组件挂载完毕：向store索要数据，获取商品的分类信息
    // this.$store.dispatch('categoryList');（转移到App组件中进行派发）
    //当组件挂载完，如果表示Home组件让show属性变为false
    if (this.$route.name != 'home') {
      this.show = false
    }
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性（加了函数节流）
    //throttle的回调函数别用箭头函数
    changeIndex: throttle(function (index) {
      //index:鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index;
    },50),
    //鼠标移出修改响应式数据currentIndex为-1
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.name == 'search' || this.$route.name == 'detail') {
        this.show = false;
      } 
    },
    //进行路由跳转的方法
    goSearch(event) {
      //获取点击事件的节点信息
      let element = event.target;
      //获取节点所对应的自定义属性
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      //确定该标签是否需要跳转
      if (categoryname) {
        //整理路由需要传递的参数
        let loction = {name: "search"};
        let query = {categoryName: categoryname};
        //判断该标签是否为一级标签
        if (category1id) {
          query.category1Id = category1id;
        //判断该标签是否为二级标签
        }else if (category2id) {
          query.category2Id = category2id;
        //判断该标签是否为三级标签 
        }else {
          query.category3Id = category3id;
        }
        if (this.$route.params) {
          loction.params = this.$route.params;
          //整理完参数
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
    //当鼠标移入时，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: #FCDE7E;
        }
      }
    }

    //过渡动画的样式
    //过渡动画开始的状态
    .sort-enter {
      height: 0;
    }

    //过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }

    //定义动画的时间、速率
    .sort-enter-active {
      transition: all .1s linear;
    }
  }
}
</style>