# xiangyahs

> A Mpvue project

## Build Setup

```bash
# 项目目录
authentication  待审页面
forgetPassword   忘记密码页面
index            主页
login            登录页
noAuthentication 待审核未通过页面
oderForm         订单页
preliminary       审核页
resetPassword    重置密码页
otherExpenses     其他费用页面
userOtherExpenses 用户确认其他费用页面
gathering         收款页面
callPolice        报警
mine              我的
designate         指派界面
addressBook       通讯页面
MaintenanceEvaluation     维护评估记录
evaluate           评论
addressServer     地址服务
#公共组件
frames.vue       页面头部
orderFormData.vue   订单数据列表
appoint          待指派

# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
