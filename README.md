## 简单概述
这是带登录和设置功能的mui模板项目，主要为了演示登录流程及设置界面div窗口切换效果；

## 核心功能
1. 启动App后校验登录状态，若已登录，直接跳转应用首页；否则，显示登录页面；
2. 支持本地注册；
3. 支持设置手势密码，登录时可使用手势密码代替账号、密码；
4. 支持评分、分享、拨打客服电话

### UI组件库文档页面

**https://mint-ui.github.io/docs/#/zh-cn2/tabbar**

### 调试方法

本项目采用webpack打包，开发阶段使用webpack-dev-server进行开发

```
npm run dev2
```

生产阶段使用build打包静态资源，打包的路径为/dist/

```
npm run build
```

### GIT双人开发流程

打开电脑准备开发前，先使用`git pull origin dev`拉取最新版本。

每开发一小段，请经常使用`git add .` -> `git commit -m "开发的内容"` -> `git push origin dev`（推送）