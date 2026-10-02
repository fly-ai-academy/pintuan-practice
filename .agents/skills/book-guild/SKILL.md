---
name: book-guild
description: 在 book 实战项目中以学员本人身份连接 Codex、接手管理员分配的任务，并提交实现、验证和交付证据。
---

# 学员实战协作

## 本人上号

1. 在实战仓库核对适用 AGENTS.md、origin、当前分支和工作区；保留所有无关改动。使用仓库提供的 `scripts/book-collaboration/cli.mjs`，Node 22+。
2. 从本站项目页“连接 Codex”取得站点和项目编号。运行 `node scripts/book-collaboration/cli.mjs up --site <本站 HTTPS origin> --project <项目编号>`。不得使用 Wayi、公用账号或他人的凭证。
3. 初次上号会输出网站链接和指纹。请学员本人登录本站、核对终端和页面指纹并确认连接。Agent 不替本人点击确认，不读取或转发凭证。
4. 等待真实心跳结果。`online: true` 才表示已上号；网页确认本身不是成功。后台心跳每 15 秒发送一次，休眠/断网后可能离线。重复 up 不自动切分支。用 `status` 核对，用 `down` 下号。
5. 凭证仅保存在 `~/.book-collaboration/` 的私有目录中，按站点、项目和 worktree 隔离；不要读取、打印或写入仓库。

用户要求“同步项目”时，在已上号的实战仓库运行 `node scripts/book-collaboration/cli.mjs sync-sources`。只读取受 Git 跟踪的 version-manifest.json、登记文档、Repair 与未归档 OpenSpec；manifest.project 必须等于项目编号。冲突保留云端现状，不能用源状态冒充审核/验收。

## 接手与实现

1. `show <CHG-ID>` 阅读真实任务、范围、验收条件和负责人，再 `bind <CHG-ID>`。无权限、课程权益撤销、项目停用或分支不符时停止依赖操作。
2. 只在返回的版本开发分支或探索分支工作；不自动覆盖、stash、rebase 或切走脏工作区。探索不能用于发布；由项目管理员在网站转为正式交付。
3. 使用 `progress IMPLEMENTING --note "真实进展"`、`progress VERIFYING --note "验证情况"` 上报阶段。`task --file <JSON>` 仅在用户授权登记/更新任务时使用稳定 taskKey，更新时保留当前 revision。
4. PRD 使用站内文档地址和真实数字 revision。`readback --file <JSON>` 只提交实现事实、差异及建议；产品本人在网页逐条判定和确认，Agent 不代批。

## 提交与验证

- 先完成范围内本地实现与检查。提交/推送仍分别需要用户授权。
- `prepare-commit` 上传精确暂存区方案和完整文本差异；`prepare-commit --commit <SHA>` 对已提交代码申请审核。网站人工批准后才能走相应门禁。
- `install-hooks` 只在用户要求接入门禁时运行，不覆盖既有 Hook。已有 Hook 按接入文档整合。不得使用 `--no-verify` 绕过；CI 还会复核真实提交、任务和回执。
- `artifacts --base <完整 SHA>` 从干净工作区登记真实提交；`run-check -- <命令> <参数>` 执行检查并上报本地证据，失败不得改成成功。
- GitHub CI 使用独立 CI 连接。`evidence-ci` 由服务端回查登记的必需检查；不能通过本地 JSON 伪造可信 CI 成功。
- `version-sync` 会查询 GitHub 默认分支并可能封版，只有用户授权登记/收口时运行。
- 通用 `request <action> --file <JSON>` 仍受服务端身份、任务、版本、revision 和审核约束，不能用于绕过网页人工审批。

## 交接

区分本地实现、提交、推送、检查、审核、合入、预览和生产发布。缺少平台配置、迁移或真实证据时如实报告，不填演示数据。站内待办由业务事务创建，本 Skill 不授权发送邮件或其他站外消息。
