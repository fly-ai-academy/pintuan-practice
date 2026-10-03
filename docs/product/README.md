# 拼团哇产品文档

本目录只登记产品总文档和 v1.0.0 的「团长创建与发布拼团」需求。线上飞书文档为规则依据；本仓库不复制一套正文，避免两份规则不同步。

| 文档 | 作用 |
| --- | --- |
| [拼团哇｜产品总文档](https://my.feishu.cn/docx/QKjbdlKe7o5j53xNQ6jc00ClnEf) | 主需求 |
| [团长创建与发布拼团](https://my.feishu.cn/docx/QveDdQzFCotJ30xrivIcPhGvnoh) | v1.0.0 需求 |

v1.0.0 只包含团长创建与编辑草稿、预览、确认发布和已发布详情。总文档提供整体背景与适用的共同规则，不代表其全部功能均纳入本版本；PRD-02～06 和独立交互稿不单独登记。

## 配套资料

- [教学交付与验收手册](https://my.feishu.cn/docx/Z2oPd5Ye5ovKBwxLBYeccVp7nPd)：作业及交付要求，不计作产品需求。
- [本地 HTML 原型](../design/拼团哇-可点击原型-375x812.html)：375 × 812，24 个页面，下载或克隆仓库后用浏览器打开；使用说明见 [设计目录](../design/README.md)。飞书总文档末尾也保留原型附件。

## 登记状态

版本记录：`.deliveryguard/versions/v1.0.0.json`。OpenSpec：`openspec/changes/pintuanwa-v1/`，状态为 proposed。本次没有登记业务实现、验收通过或发布事实，也未向协作平台同步。后续需求变化应先核对飞书原文，再更新本仓库的规格与验收范围。

## 学员通过飞书 CLI 读取 PRD

文档正文以飞书原文为准。每位学员先按 [飞书 CLI 接入指南](../feishu-cli-setup.md) 安装工具、创建自己的应用机器人并授权本人账号，再运行：

```bash
node scripts/book-collaboration/cli.mjs read-prds --file .deliveryguard/versions/v1.0.0.json --profile <本人飞书配置>
```

平台当前版本登记为飞书原文链接后，可省略 `--file`，从平台取得主 PRD 与关联需求。`show` 和 `bind` 同样传入 `--profile`，接任务时自动读取原文与真实 revision。平台仍显示站内副本时，先用上面的本地版本记录读取，不把站内副本当作飞书原文。读取失败时先解决本人授权或文档访问权限，不使用老师的凭证。读取成功只证明取得原文，不代表审核、验收或发布通过。
