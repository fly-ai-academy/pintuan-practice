# 拼团实战项目

独立的教学项目起点，使用 npm 发布的 deliveryguard@0.5.0。

关联的实战项目：[拼团](https://flyger.xyz/collaboration/ce6bed38-0ebf-4450-8b54-2ad17c38755d)。公开项目关联信息见 `.book/project.json`，不包含凭证。

## 开始

使用 Node 22.19+（22.x）或 Node 24+，运行：

```sh
npm ci
npm run check
npm run harness:status
npm run guild:connect
```

首次连接时，本人登录网站核对终端指纹并确认；只有返回 online:true 才算连接成功。凭证保存在用户私有目录，不进入仓库。

## 当前边界

已初始化 Git main 分支和 Harness 工具，尚无业务实现、版本验收或生产交付记录。check 通过仅代表初始化结构有效。

远程仓库：https://github.com/wzf1997/pintuan-practice（私有），默认分支 main。需要在平台登记准确的 GitHub 仓库，并登记真实版本与需求，才可执行 guild:sync。不要将 Book 平台仓库设置为本项目 origin。

该目录作为教师模板起点。学员使用独立仓库/项目与自己的进度；复制模板后应替换 `.book/project.json` 和 guild:connect 中的项目编号，不共用教师设备凭证。
