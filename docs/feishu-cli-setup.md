# 学员接入飞书 CLI

每位学员开始拼团哇实战前，都要完成一次飞书接入。之后 Codex 可以直接读取老师登记的飞书 PRD，你不需要反复复制正文。

完成标准：本机装好官方 CLI 和 Skills，有自己的应用机器人，用本人飞书账号授权，并实际读到产品总文档和 v1.0.0 需求。所有命令都在自己的电脑上运行。

## 1. 安装工具

使用本项目要求的 Node 22.19+（22.x）或 Node 24+。按 [飞书官方 CLI 仓库](https://github.com/larksuite/cli#installation--quick-start) 的安装方式执行：

```bash
npx @larksuite/cli@latest install
npx skills add larksuite/cli -y -g
lark-cli --version
```

安装后重启 Codex，让它加载飞书 Skills。也可以把 [官方安装指南](https://open.feishu.cn/document/no_class/mcp-archive/feishu-cli-installation-guide.md) 发给 Codex，请它协助安装。能看到版本号才算 CLI 已装好。

## 2. 创建自己的应用机器人

打开 [飞书开放平台](https://open.feishu.cn/app?lang=zh-CN)，登录学员本人的飞书账号。

1. 创建企业自建应用，名称可用“拼团哇实战助手－你的昵称”。如果已有自己维护的实战应用，可以复用。
2. 在应用能力中添加“机器人”。它作为你的实战助手；本项目读取 PRD 使用本人用户身份。
3. 在权限管理中开通读取文档所需的用户身份权限，先申请 `docs:document.content:read`。如 CLI 提示还缺某项读取权限，按具体提示补充。
4. 按开放平台要求完成版本发布或管理员审批，并确保应用可用范围包含你本人。应用权限处于待审批状态时，还不能算接入完成。

然后在终端运行引导配置，示例 profile 名为 `pintuanwa-student`：

```bash
lark-cli config init --name pintuanwa-student --brand feishu --lang zh
```

选择配置已有应用，按引导在本机填写自己的应用信息。不要把 App Secret 发给老师、贴进聊天、写入代码或提交到仓库。已有其他飞书配置时，保留原配置，使用独立名称。

也可以让 CLI 引导创建应用：

```bash
lark-cli config init --new --name pintuanwa-student --brand feishu --lang zh
```

打开这次命令返回的链接，由本人完成页面操作；完成后到开放平台核对应用、机器人能力和权限。两种创建方式选一种即可。

## 3. 用本人账号授权

在终端运行：

```bash
lark-cli --profile pintuanwa-student auth login --scope "docs:document.content:read"
lark-cli --profile pintuanwa-student auth status --json --verify
```

打开授权页面时，核对是自己的飞书账号。状态中应能看到本人用户名、有效的用户登录态和 `verified: true`。只有应用配置成功、没有用户授权，还不能代表本人读取 PRD。

若由 Codex 协助操作，它应按官方 `lark-shared` 技能展示本次授权链接和二维码，由你本人确认，再完成登录验证。不要把临时授权链接或登录凭证提交到仓库。

## 4. 确认能查看项目原文

用刚才授权的飞书账号打开以下两份文档：

| 文档 | 用途 |
| --- | --- |
| [拼团哇｜产品总文档](https://my.feishu.cn/docx/QKjbdlKe7o5j53xNQ6jc00ClnEf) | 整体背景与共同规则 |
| [团长创建与发布拼团](https://my.feishu.cn/docx/QveDdQzFCotJ30xrivIcPhGvnoh) | v1.0.0 实现与验收范围 |

如果网页提示无权查看，联系老师给你的账号开通查看权限。创建机器人、授权 CLI 和拥有文档权限是三个不同步骤；机器人不会自动获得老师所有文档的访问权。

## 5. 让 Codex 读取当前版本

在实战仓库根目录运行：

```bash
lark-cli skills read lark-doc references/lark-doc-fetch.md
node scripts/book-collaboration/cli.mjs read-prds --file .deliveryguard/versions/v1.0.0.json --profile pintuanwa-student
```

这条命令读取版本记录登记的两份飞书原文，使用本人用户身份，并返回文档链接、真实 revision 和正文。两份都读取成功才算准备完成。revision 随文档更新变化，不要把示例版本号当作固定值。

可以直接对 Codex 说：

> 用我自己的 pintuanwa-student 飞书配置，读取当前版本登记的产品总 PRD 和 1.0 需求。告诉我两份文档的链接、修订号和本次实现范围，再开始接任务。

接入平台后，等平台当前版本登记为真实飞书链接，再省略 `--file`：

```bash
node scripts/book-collaboration/cli.mjs read-prds --profile pintuanwa-student
```

平台还显示站内副本时，继续从本地版本记录读取原文。后续版本换成对应的版本文件，不默认沿用 v1.0.0。读取原文不会自动更新开发阶段，也不代表老师已经审核、验收或允许发布。

## 遇到问题

| 现象 | 处理 |
| --- | --- |
| 找不到 `lark-cli` | 确认安装完成并重启终端、Codex，再检查版本号 |
| 找不到 profile，或用户名不对 | 核对命名配置，使用本人 profile 重新授权 |
| 用户 token 失效 | 用同一 profile 重新登录，再验证状态 |
| 提示缺少 scope | 区分应用权限未开通与用户未授权；按提示补充所需读取权限、完成审批，再授权，不默认申请全部权限 |
| 网页也打不开 PRD | 请老师为本人账号开通查看权限；不要借用老师的应用或登录凭证 |
| 网页能打开，CLI 仍拒绝 | 核对 profile 中登录账号是否相同、读取是否为 `--as user`、应用权限是否已生效 |

提交作业时可以说明两份文档的原始链接、修订号、读取时间及需求理解。不要提交 token、App Secret、临时授权码或整份私有正文导出。
