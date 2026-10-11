# 拼团实战项目

独立的教学 monorepo：先用 Next.js 开发页面，后续接入 Nest.js 服务；共享类型放在独立包中。使用公开 npm 包 deliveryguard@0.5.0 管理交付记录。

从[课程实战路线](https://flyger.xyz/collaboration/routes)领取个人项目。平台生成个人仓库时会更新 `.book/project.json` 中的项目关联；该文件不包含凭证。

## 开始

每位学员都需要先完成 [飞书 CLI 接入](docs/feishu-cli-setup.md)：安装 CLI 和官方 Skills，在飞书开放平台创建自己的应用机器人，用本人账号授权，并实际读到产品总 PRD 和 v1.0.0 需求。完成后再接任务、开始开发。

使用 Node 22.19+（22.x）或 Node 24+；推荐按 `.nvmrc` 使用 Node 22.22.2。包管理器固定为 pnpm 10.34.6。已安装该版本时可跳过 Corepack 准备：

```sh
corepack enable
corepack prepare pnpm@10.34.6 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm harness:status
pnpm dev
```

打开 `http://localhost:3000`，可看到教学起点和原型入口；不启动 Nest.js 也能使用。开始业务任务前完成上述飞书接入，然后运行 `pnpm guild:connect`，本人登录网站核对终端指纹并确认；只有返回 online:true 才算连接成功。凭证保存在用户私有目录，不进入仓库。

## 项目结构与学习顺序

```text
packages/
  web/        Next.js 页面及 BFF（第一阶段）
  server/     Nest.js 服务（第二阶段）
  contracts/  前后端共享类型与纯函数
docs/
  product/    产品需求入口
  design/     HTML 原型与工程设计
```

第一阶段用 `pnpm dev` 单独运行 Next.js。第二阶段用 `pnpm dev:full` 同时运行 Next.js（3000）和 Nest.js（3001），通过 Next 的 `/api/server-health` 调用 Nest 的 `/api/health`，学习前后端联通。业务页面、权限、数据库和订单流程按后续任务实现。

构建与检查：`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm test:smoke`、`pnpm check`。更详细的启动、端口和包边界说明见 [monorepo 设计](docs/design/monorepo.md)。

## 个人项目的 GitHub CI

模板没有预先启用 GitHub Actions 工作流。工程底座任务要求学员建立 `harness-check`，运行真实构建、测试和 DeliveryGuard 检查；后续任务以当前合同和平台登记的必需检查为准。这些检查不需要 Book CI token。

学员在个人准备页连接本人 GitHub、授权课程 App 访问实战仓库并完成仓库绑定，按任务要求登记真实提交。Book 回查该提交的必需检查，再由指定教师验收。GitHub 仓库读取授权与 Book CI token 是不同的授权；本地检查通过不能代替 GitHub CI、教师验收或发布。

`scripts/book-collaboration/ci.mjs` 是可选的 Book 提交门禁工具。不要仅因模板包含此脚本就新增 `book-review` / `book-collaboration-gate`、安装 Book Hook 或要求学员配置 CI token。只有项目管理员明确启用额外门禁，或授权 CI 主动上报可信证据、部署记录时，才接入独立 CI 连接；Secret 名称以实际工作流引用为准，不能使用本地 Codex 连接凭证代替。

已有仓库若已启用 Book 门禁，应先核对任务要求、平台必需检查、本地 Hook 和 GitHub 分支保护，再由管理员明确决定是否停用。更新模板或工具不会自动移除这些配置，也不能以缺少 token 为由跳过门禁。

## 当前边界

已搭建 Next.js、Nest.js 和共享包的基础工程，已登记拼团哇 v1.0.0 产品需求，OpenSpec 为 proposed；尚无业务实现、版本验收或生产交付记录。首页和健康接口属于工程示例，HTML 属于模拟原型；check 通过仅代表登记结构有效。

公开教学模板：[fly-ai-academy/pintuan-practice](https://github.com/fly-ai-academy/pintuan-practice)，默认分支 main。无需 GitHub 仓库邀请即可查看模板与 `docs/design` 中的原型。模板内容公开，学员个人实战仓库仍为私有。

学员从[课程实战路线](https://flyger.xyz/collaboration/routes)创建个人项目，连接本人 GitHub 后领取独立私有仓库。平台会自动将 `.book/project.json`、`deliveryguard.config.json` 和 `guild:connect` 中的项目编号替换为个人项目；克隆准备页提供的个人仓库地址，再运行上述 pnpm 命令。不要直接在教学模板中连接教师项目，不共用教师设备凭证。

手动复制模板时，需要自行替换上述项目关联，并在平台登记准确的个人仓库、版本与需求后再执行 `guild:sync`。不要将 Book 平台仓库设置为本项目 origin。模板同步只影响之后创建的仓库，已有学员仓库保持各自的代码和进度。

## 产品需求

[拼团哇 PRD 与原型目录](docs/product/README.md)。仅登记总文档与 PRD-01「团长创建与发布拼团」；v1.0.0 只覆盖创建与发布，其他阶段暂不纳入。
