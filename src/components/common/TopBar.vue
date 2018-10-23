<!-- 顶部 -->
<template>
<div class="topbar-wrap">
    <div class="topbar">
        <div class="topbar-left">
           <img src="/static/logo.png" style="width:211px;height:48px;"/>
        </div>
        <div class="topbar-nav" v-if="!islogin">
          <a v-for="nav in navs" @click="navclick(nav)" :style="{color:nav.href==currentnav?'#000':'#fff'}">{{nav.value}}</a>
        </div>
        <!-- <a   style="color:#fff;display:inline-block;vertical-align:top;margin:18px 0 0 30px;">
          <img src="/static/service-phone.png"/>
        </a> -->
        <a   style="color:#fff;display:inline-block;vertical-align:top;margin:26px 0 0 30px;">
          <img src="/static/service-user.png"/>
        </a>

        <div class="topbar-loginregister" v-if="!islogin">
          <!-- <Button size="large" @click="gologinpage">登录</Button> -->
          <a style="color:#fff;" href="http://ssadmin.xyaini.com/">登录</a>
          <a style="color:#fff;">注册</a>
        </div>
        
    </div>
</div>
</template>
<script>
  export default {
    name: 'TopBar',
    created(){ 
       this.routerPath=this.$route.path;
       //设定当前路径显示
       this.currentnav=this.routerPath;
       
      if(this.routerPath.indexOf("/main")>-1||this.routerPath.indexOf("/login")>-1||this.routerPath.indexOf("/register")>-1){
        //是否登陆
        this.getIslogin();
       }
       if(this.business.getAccount()){
         this.pathParams={
           currentPage:1,//当前页
          accountId:this.business.getAccount().accountId 
        }
       }
    },
    watch: {
  //   //监听父组件的变量
  //  'isLogin': function (n, o) {
  //    console.log(n)
  //   this.islogin=n;
  //  },
  //   //监听自身的变量
  //  'islogin': function (n, o) {
  //    console.log(n)
  //   this.islogin=n;
  //  }
  },
    data () {
      return {
        routerPath:this.$route.path,
        islogin:false,
        account:{},
        config:{},
        finance:{},
        noticeCount:0,
        //广告主显示充值，媒体主为提现
        moneytext:'充值',
        //跳转链接
        moneyLink:'',
        //导航栏
        navs:[
          {
            href:'/index',value:'首页',
          },
          {
            href:'/weixinspread',value:'产品介绍',
          },
          {
            href:'/subscriptionfuns',value:'招商加盟',
          },
          {
            href:'/channelorder',value:'广告合作',
          },
          {
            href:'/help',value:'关于我们',
          }
        ],
        //当前导航
        currentnav:'/index',
      }
    },
    methods: {
      //导航点击
      navclick(nav){
        //location.href=nav.href;
        this.$router.push(nav.href);
      },
      //跳转到登陆页面
      gologinpage(){
        this.$router.push("/login");
      },
      //退出登陆
     loginout(){
      this.$Modal.confirm({
              title: '退出登陆？',
              content: '<p>确定退出登陆吗？</p>',
              onOk: () => {
                this.axios({
                method:"post",
                url:'/account/loginout?accountId='+this.business.getAccount().accountId,
                withCredentials: true
              }).
              then(res => {
                console.log(res)
                if (res.data.code == 200) {
                  this.islogin=true;
                  sessionStorage.clear();
                  this.$emit("islogin",this.islogin);
                  this.$Message.success('退出成功！');
                  this.$router.push('/login')
                } else {
                  this.$emit("islogin",this.islogin);
                  this.$Message.error('失败')
                }
              }).catch(res => {
                this.$Message.error('系统异常')
              })
              },
              onCancel: () => {
                  this.$Message.success('取消成功！');
              }
          });
     },
      //验证是否登陆
      getIslogin(){
        if(!sessionStorage.getItem("account")){
          sessionStorage.clear()
          this.$emit("islogin",this.islogin);
          if(this.routerPath.indexOf("/main")>-1||this.routerPath.indexOf("/login")>-1){
             this.$nextTick(()=>{
            this.$router.push('/login')
             });
          }else if(this.routerPath.indexOf("/register")>-1){
             this.$nextTick(()=>{
            this.$router.push('/register')
              });
          }
          return;
        }
        this.axios({
               method:"post",
               url:'/account/islogin',
               withCredentials: true
            }).
            then(res => {
              console.log(res)
              if (res.data.code == 200) {
                this.islogin=true;
                //设置本地account
                this.account=res.data.data[0];
                this.$emit("islogin",this.islogin);
                //this.$router.push('/main')
              } else {
                sessionStorage.clear()
                this.$emit("islogin",this.islogin);
                this.$router.push('/login')
                this.$Message.info('请登录')
              }
            }).catch(res => {
              this.$Message.error('系统异常')
            })
      }
    }
  }
</script>
<style lang="less">
@import "TopBar.less";
</style>
