# Decap CMS 集成技术文档

> 本文档详细介绍 Decap CMS 在学术个人主页中的集成方案，涵盖架构设计、安装配置、使用指南及进阶功能。

---

## 目录

1. [概述](#1-概述)
2. [架构设计](#2-架构设计)
3. [安装步骤](#3-安装步骤)
4. [配置说明](#4-配置说明)
5. [使用指南](#5-使用指南)
6. [内容类型详解](#6-内容类型详解)
7. [前端集成](#7-前端集成)
8. [GitHub OAuth 配置](#8-github-oauth-配置)
9. [常见问题](#9-常见问题)
10. [进阶功能](#10-进阶功能)

---

## 1. 概述

### 1.1 什么是 Decap CMS

Decap CMS（前身为 Netlify CMS）是一个开源的、基于 Git 的内容管理系统（CMS）。它提供了一个直观的 Web 界面，让非技术人员也能轻松管理网站内容，而所有内容变更都以 Git commit 的形式保存到仓库中。

**核心特性：**

| 特性 | 说明 |
|------|------|
| Git-based | 所有内容变更以 Git commit 形式保存，天然具备版本控制 |
| 可视化编辑 | 提供 Web 界面，支持 Markdown 编辑、图片上传、字段表单 |
| 无需后端 | 纯静态前端应用，无需数据库或服务器端代码 |
| OAuth 认证 | 通过 GitHub OAuth 登录，安全可靠 |
| 多语言支持 | 界面支持中文等多种语言 |
| 实时预览 | 编辑时可实时预览内容效果 |

### 1.2 为什么选择 Decap CMS

对于本学术个人主页项目，选择 Decap CMS 有以下理由：

1. **无需修改 HTML 即可更新内容**：算法模板、VP 记录、相册照片等动态内容无需手动编辑 HTML 文件
2. **Git 版本控制**：每次内容修改都有完整的 Git 历史，可以随时回滚
3. **零成本**：完全免费，利用 GitHub Pages 托管，无需额外服务器
4. **适合静态网站**：本站是纯静态网站，Decap CMS 是最契合的 CMS 方案
5. **中文友好**：支持中文界面，降低使用门槛

### 1.3 工作原理

```
┌──────────────┐     OAuth 认证      ┌──────────────┐
│              │ ◄──────────────────► │              │
│   浏览器     │                      │   GitHub     │
│  (CMS 界面)  │                      │   OAuth App  │
│              │                      │              │
└──────┬───────┘                      └──────┬───────┘
       │                                     │
       │  读写内容文件                        │  Git 操作
       │                                     │
       ▼                                     ▼
┌──────────────┐     Git Push/Pull    ┌──────────────┐
│              │ ◄──────────────────► │              │
│  GitHub API  │                      │   GitHub     │
│              │                      │  Repository  │
└──────────────┘                      │              │
                                      └──────┬───────┘
                                             │
                                             │  自动部署
                                             ▼
                                      ┌──────────────┐
                                      │              │
                                      │ GitHub Pages │
                                      │  (静态网站)   │
                                      │              │
                                      └──────────────┘
```

**数据流说明：**

1. 用户通过浏览器访问 `https://你的域名/admin/`
2. CMS 界面通过 GitHub OAuth 进行身份认证
3. 用户在 CMS 界面中编辑内容（填写表单、上传图片等）
4. CMS 通过 GitHub API 将内容保存为 Markdown 文件，提交到仓库
5. GitHub Pages 检测到仓库更新，自动重新构建和部署网站
6. 前端页面通过 `cms-loader.js` 从 GitHub Raw Content 读取内容并渲染

---

## 2. 架构设计

### 2.1 整体架构图

```
academic-homepage/
│
├── admin/                          # CMS 管理后台
│   ├── index.html                  # CMS 入口页面（加载 Decap CMS）
│   └── config.yml                  # CMS 配置文件（定义内容类型和字段）
│
├── content/                        # CMS 管理的内容目录
│   ├── algo-templates/             # 算法模板
│   │   └── *.md                    # 每个模板一个 Markdown 文件
│   ├── vp-notes/                   # VP 记录
│   │   └── *.md
│   ├── gallery/                    # 相册照片
│   │   └── *.md
│   ├── resources/                  # 学习资料
│   │   └── *.md
│   └── friends/                    # 友链
│       └── *.md
│
├── assets/images/uploads/          # CMS 上传的图片存放目录
│   └── .gitkeep
│
├── js/
│   └── cms-loader.js               # 前端内容加载脚本
│
├── docs/
│   └── CMS-INTEGRATION.md          # 本技术文档
│
├── index.html                      # 主页（静态内容）
├── algorithms.html                 # 算法页面（静态 + CMS 动态内容）
├── resources.html                  # 资源页面（静态 + CMS 动态内容）
├── social.html                     # 社交页面（静态 + CMS 动态内容）
└── ...
```

### 2.2 数据流详解

```
编辑流程：

  用户 ──► CMS 界面 ──► GitHub API ──► content/*.md
                                        │
                                        ▼
                                   Git Commit
                                        │
                                        ▼
                                   GitHub Pages 重新部署
                                        │
                                        ▼
                                   访客看到更新后的内容


读取流程：

  访客浏览器 ──► cms-loader.js ──► GitHub Raw API ──► content/*.md
                                                    │
                                                    ▼
                                              解析 Frontmatter
                                                    │
                                                    ▼
                                              渲染到页面
```

### 2.3 文件命名规则

所有 CMS 管理的内容文件使用 URL 友好的 slug 命名：

```
content/algo-templates/dp-knapsack.md       # 算法模板
content/vp-notes/codeforces-round-950.md    # VP 记录
content/gallery/lab-meeting-2026.md         # 相册照片
content/resources/deep-learning-courses.md  # 学习资料
content/friends/silencer76.md               # 友链
```

Slug 生成规则（在 `config.yml` 中配置）：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `encoding` | `ascii` | 仅使用 ASCII 字符 |
| `clean_accents` | `true` | 去除重音符号 |
| `sanitize_replacement` | `_` | 特殊字符替换为下划线 |

---

## 3. 安装步骤

### 3.1 前置条件

| 条件 | 要求 |
|------|------|
| GitHub 账号 | 已注册 |
| 仓库 | 已创建 `username.github.io` 公开仓库 |
| GitHub Pages | 已启用并正常工作 |
| GitHub OAuth App | 已创建（详见第 8 节） |

### 3.2 步骤一：创建 admin 目录

在项目根目录下创建 `admin/` 文件夹：

```bash
mkdir admin
```

### 3.3 步骤二：创建 CMS 入口页面

在 `admin/` 目录下创建 `index.html`：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager — Zefeng Chen</title>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</head>
<body>
</body>
</html>
```

**关键说明：**

- `<meta name="robots" content="noindex" />`：防止搜索引擎索引 CMS 管理页面
- `decap-cms.js`：从 unpkg CDN 加载 Decap CMS 的最新 3.x 版本
- 页面 body 为空，Decap CMS 会自动注入完整的编辑界面

### 3.4 步骤三：创建 CMS 配置文件

在 `admin/` 目录下创建 `config.yml`（详见第 4 节）。

### 3.5 步骤四：创建内容目录结构

```bash
mkdir -p content/algo-templates
mkdir -p content/vp-notes
mkdir -p content/gallery
mkdir -p content/resources
mkdir -p content/friends
mkdir -p assets/images/uploads
```

### 3.6 步骤五：创建示例内容文件

在各内容目录下创建示例 Markdown 文件（详见第 6 节）。

### 3.7 步骤六：部署到 GitHub

```bash
git add admin/ content/ assets/images/uploads/ js/cms-loader.js docs/
git commit -m "feat: 集成 Decap CMS 内容管理系统"
git push
```

### 3.8 步骤七：验证安装

1. 等待 GitHub Pages 部署完成（1-3 分钟）
2. 访问 `https://你的用户名.github.io/admin/`
3. 如果看到登录界面，说明安装成功

---

## 4. 配置说明

`admin/config.yml` 是 Decap CMS 的核心配置文件，定义了后端连接、媒体存储、内容类型等所有行为。

### 4.1 后端配置

```yaml
backend:
  name: github                    # 后端类型，使用 GitHub
  repo: Zephyr-Chan/zephyr-chan.github.io  # 仓库地址（格式：用户名/仓库名）
  branch: main                    # 内容保存的分支
  auth_endpoint: auth             # OAuth 认证端点
  app_id: ""                      # GitHub OAuth App ID（留空则使用默认）
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 后端类型。可选值：`github`、`git-gateway`、`test-repo` |
| `repo` | 是 | GitHub 仓库，格式为 `owner/repo` |
| `branch` | 否 | 目标分支，默认为 `main` |
| `auth_endpoint` | 否 | 自定义 OAuth 认证端点路径 |
| `app_id` | 否 | GitHub OAuth App 的 Client ID |

### 4.2 媒体文件配置

```yaml
media_folder: "assets/images/uploads"    # 媒体文件在仓库中的存储路径
public_folder: "/assets/images/uploads"  # 媒体文件在网站中的公开访问路径
```

| 字段 | 说明 |
|------|------|
| `media_folder` | 相对于仓库根目录的存储路径。CMS 上传的图片会保存到这个目录 |
| `public_folder` | 网站中引用图片时使用的前缀路径。在 Markdown 中插入图片时会自动添加此前缀 |

### 4.3 界面配置

```yaml
locale: "zh"    # CMS 界面语言设为中文
```

### 4.4 Slug 配置

```yaml
slug:
  encoding: "ascii"            # URL 编码方式
  clean_accents: true          # 去除重音符号
  sanitize_replacement: "_"    # 非法字符的替换符
```

### 4.5 集合（Collections）配置

集合定义了 CMS 管理的内容类型。每个集合对应一个文件夹，文件夹中的每个 Markdown 文件就是一条内容记录。

#### 集合通用配置

```yaml
collections:
  - name: "collection_name"    # 内部标识符（英文，用于 API 和代码引用）
    label: "显示名称"           # CMS 界面中显示的名称（支持中文）
    label_singular: "单条名称"  # 单条记录的名称
    folder: "content/path"     # 内容文件存储的文件夹路径
    create: true               # 是否允许创建新内容
    delete: true               # 是否允许删除内容
    slug: "{{slug}}"           # 文件名生成模板
    summary: "{{title}}"       # 列表页中每条记录的摘要模板
    fields: [...]              # 字段定义列表
```

| 字段 | 说明 |
|------|------|
| `name` | 集合的唯一标识符，英文，用于代码引用 |
| `label` | CMS 界面中显示的名称 |
| `folder` | 内容文件存储的目录路径（相对于仓库根目录） |
| `create` | 设为 `true` 允许在 CMS 中创建新文件 |
| `delete` | 设为 `true` 允许在 CMS 中删除文件 |
| `slug` | 文件名模板。支持变量：`{{slug}}`（标题的 URL 编码）、`{{year}}`、`{{month}}`、`{{day}}` |
| `summary` | 列表视图中显示的摘要模板 |
| `fields` | 字段定义数组，定义每条内容的结构和编辑界面 |

#### 支持的字段类型（Widget）

| Widget | 说明 | 示例 |
|--------|------|------|
| `string` | 单行文本输入 | 标题、名称 |
| `text` | 多行文本输入 | 长描述 |
| `markdown` | Markdown 编辑器（带预览） | 文章正文 |
| `code` | 代码编辑器（带语法高亮） | 算法代码 |
| `number` | 数字输入 | 排序权重 |
| `select` | 下拉选择 | 分类、平台 |
| `list` | 列表（可动态添加/删除） | 标签列表 |
| `image` | 图片上传 | 照片、头像 |
| `datetime` | 日期时间选择器 | 发布日期 |
| `boolean` | 开关 | 是否显示 |

---

## 5. 使用指南

### 5.1 登录 CMS

1. 在浏览器中访问 `https://你的用户名.github.io/admin/`
2. 点击 **"Login with GitHub"** 按钮
3. 授权后会跳转到 CMS 管理界面

### 5.2 界面布局

```
┌─────────────────────────────────────────────────────┐
│  Content Manager                          [用户头像] │
├────────────┬────────────────────────────────────────┤
│            │                                        │
│  侧边栏    │           内容区域                      │
│            │                                        │
│  ▸ 算法模板 │   列表视图 / 编辑视图                   │
│  ▸ VP记录   │                                        │
│  ▸ 相册照片 │   ┌──────────────────────────────┐     │
│  ▸ 学习资料 │   │  标题           2026-01-15   │     │
│  ▸ 友链    │   │  分类: DP 动态规划             │     │
│            │   │  难度: 中等                    │     │
│            │   └──────────────────────────────┘     │
│            │                                        │
│            │   ┌──────────────────────────────┐     │
│            │   │  标题           2026-02-20   │     │
│            │   │  分类: 图论                   │     │
│            │   │  难度: 困难                    │     │
│            │   └──────────────────────────────┘     │
│            │                                        │
└────────────┴────────────────────────────────────────┘
```

### 5.3 添加新内容

1. 在左侧边栏点击要添加内容的集合（如"算法模板"）
2. 点击右上角的 **"New 算法模板"** 按钮
3. 填写表单中的各个字段
4. 点击 **"Save"** 保存草稿
5. 确认无误后点击 **"Publish"** 发布

### 5.4 编辑现有内容

1. 在左侧边栏选择对应的集合
2. 在内容列表中找到要编辑的条目，点击进入
3. 修改字段内容
4. 点击 **"Save"** 保存，再点击 **"Publish"** 发布

### 5.5 删除内容

1. 进入要删除的内容条目
2. 点击右上角的 **"Delete"** 按钮
3. 确认删除

> **注意**：删除操作会直接从仓库中删除对应的 Markdown 文件，请谨慎操作。

### 5.6 上传图片

在任何包含 `image` 字段的内容类型中：

1. 点击图片上传区域
2. 拖拽图片到上传区域，或点击选择文件
3. 图片会自动上传到 `assets/images/uploads/` 目录
4. 在 Markdown 编辑器中也可以通过工具栏的图片按钮上传

---

## 6. 内容类型详解

### 6.1 算法模板（algo_templates）

**用途**：管理算法竞赛的模板代码和解题思路。

**文件位置**：`content/algo-templates/*.md`

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 模板标题，如"01背包与完全背包" |
| `category` | select | 是 | 算法分类，可选：DP 动态规划、图论、字符串、数学、数据结构、贪心、搜索、其他 |
| `difficulty` | select | 否 | 难度等级，可选：入门、中等、困难、省选、NOI |
| `source` | string | 否 | 题目来源，如"Luogu P1048" |
| `code` | code (cpp) | 否 | 模板代码，默认显示 `// 在此粘贴代码` |
| `body` | markdown | 否 | 思路说明（Markdown 格式） |
| `tags` | list | 否 | 自定义标签列表 |
| `date` | datetime | 否 | 发布日期，默认为当前日期 |

**示例文件**：

```markdown
---
title: "01背包与完全背包"
category: "DP 动态规划"
difficulty: "中等"
source: "Luogu P1048"
date: "2026-01-15"
tags:
  - DP
  - 背包
  - 入门
---

## 思路

经典背包问题，状态转移方程...

## 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
// 模板代码
```
```

### 6.2 VP 记录（vp_notes）

**用途**：记录 Virtual Participation（虚拟参赛）的比赛笔记。

**文件位置**：`content/vp-notes/*.md`

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `contest` | string | 是 | 比赛名称，如"Codeforces Round 950 (Div. 3)" |
| `platform` | select | 是 | 比赛平台，可选：Codeforces、AtCoder、Luogu、Nowcoder、LeetCode、GDCPC、ICPC、CCPC、蓝桥杯、其他 |
| `date` | datetime | 是 | 比赛日期 |
| `rating_change` | string | 否 | Rating 变化，如"+45"或"-12" |
| `rank` | string | 否 | 排名 |
| `body` | markdown | 是 | VP 内容（题解、思路等） |
| `tags` | list | 否 | 自定义标签列表 |

**示例文件**：

```markdown
---
contest: "Codeforces Round 950 (Div. 3)"
platform: "Codeforces"
date: "2026-03-15"
rating_change: "+45"
rank: "312"
tags:
  - CF
  - Div3
---

## A. Task Name

题意：...

做法：...

## B. Task Name

题意：...

做法：...
```

### 6.3 相册照片（gallery_photos）

**用途**：管理相册中的照片及其元数据。

**文件位置**：`content/gallery/*.md`

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 照片标题 |
| `image` | image | 是 | 照片文件（通过 CMS 上传） |
| `description` | string | 否 | 照片描述 |
| `tag` | select | 是 | 分类标签，可选：会议、实验室、旅行、获奖、日常、竞赛、其他 |
| `date` | datetime | 否 | 拍摄日期 |
| `weight` | number | 否 | 排序权重（0-100），数字越大越靠前，默认 50 |

**示例文件**：

```markdown
---
title: "Lab Meeting 2026"
image: "/assets/images/uploads/lab-meeting.jpg"
description: "课题组例会讨论"
tag: "实验室"
date: "2026-03-20"
weight: 80
---
```

### 6.4 学习资料（learning_resources）

**用途**：管理学习资料和推荐链接。

**文件位置**：`content/resources/*.md`

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 资料名称 |
| `url` | string | 是 | 资料链接 |
| `description` | string | 否 | 简短描述 |
| `category` | select | 是 | 分类，可选：深度学习、论文阅读、编程语言、算法竞赛、科研工具、效率工具、其他 |
| `icon` | select | 否 | FontAwesome 图标类名 |
| `color` | select | 否 | 卡片颜色（十六进制色值） |

**示例文件**：

```markdown
---
title: "深度学习经典课程"
url: "https://www.deeplearning.ai/courses/"
description: "Andrew Ng 的深度学习系列课程"
category: "深度学习"
icon: "fa-brain"
color: "#9b59b6"
---
```

### 6.5 友链（friend_links）

**用途**：管理友情链接。

**文件位置**：`content/friends/*.md`

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 友链名称 |
| `url` | string | 是 | 网站地址 |
| `description` | string | 否 | 一句话描述 |
| `avatar` | image | 否 | 头像图片（留空则显示首字母） |
| `avatar_color` | select | 否 | 头像背景渐变色 |

**示例文件**：

```markdown
---
name: "Silencer76"
url: "https://silencer76.com"
description: "代码构建世界，算法改变未来"
avatar_color: "linear-gradient(135deg, #667eea, #764ba2)"
---
```

---

## 7. 前端集成

### 7.1 cms-loader.js 概述

`js/cms-loader.js` 是一个轻量级的内容加载脚本，用于从 GitHub 仓库的 `content/` 目录读取 Markdown 文件，解析 YAML frontmatter，并将内容渲染到页面中。

### 7.2 核心方法

#### `CMSLoader.parseFrontmatter(markdown)`

解析 Markdown 文件的 YAML frontmatter。

```javascript
const result = CMSLoader.parseFrontmatter(markdownString);
// result.data   → { title: "01背包", category: "DP 动态规划", ... }
// result.content → "## 思路\n\n经典背包问题..."
```

#### `CMSLoader.loadCollection(folder)`

加载指定文件夹下的所有内容文件。

```javascript
const templates = await CMSLoader.loadCollection('algo-templates');
// templates → [{ title: "01背包", category: "DP 动态规划", content: "...", filename: "dp-knapsack.md" }, ...]
```

#### `CMSLoader.loadFile(path)`

加载单个文件。

```javascript
const post = await CMSLoader.loadFile('algo-templates/dp-knapsack.md');
// post.data → { title: "01背包", ... }
// post.content → "## 思路..."
```

### 7.3 使用示例

#### 在算法页面加载模板列表

```javascript
// 在 algorithms.html 的 <script> 中使用
async function loadAlgoTemplates() {
  const templates = await CMSLoader.loadCollection('algo-templates');
  const container = document.getElementById('algo-templates-list');

  templates.forEach(item => {
    const card = document.createElement('div');
    card.className = 'algo-item';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <span class="algo-category">${item.category}</span>
      <span class="algo-difficulty">${item.difficulty || ''}</span>
    `;
    container.appendChild(card);
  });
}

loadAlgoTemplates();
```

#### 在相册区域加载照片

```javascript
async function loadGallery() {
  const photos = await CMSLoader.loadCollection('gallery');

  // 按 weight 排序（大的在前）
  photos.sort((a, b) => (parseInt(b.weight) || 50) - (parseInt(a.weight) || 50));

  const container = document.getElementById('gallery-grid');
  photos.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="gallery-caption">${item.title}</div>
    `;
    container.appendChild(card);
  });
}

loadGallery();
```

#### 在社交页面加载友链

```javascript
async function loadFriendLinks() {
  const friends = await CMSLoader.loadCollection('friends');
  const container = document.getElementById('friend-links-grid');

  friends.forEach(item => {
    const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';
    const avatarStyle = item.avatar
      ? `background-image: url('${item.avatar}'); background-size: cover;`
      : `background: ${item.avatar_color || 'linear-gradient(135deg, #667eea, #764ba2)'};`;

    const card = document.createElement('a');
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'friend-link-card';
    card.innerHTML = `
      <div class="friend-link-avatar" style="${avatarStyle}">${item.avatar ? '' : initial}</div>
      <div class="friend-link-info">
        <div class="friend-link-name">${item.name}</div>
        <div class="friend-link-desc">${item.description || ''}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

loadFriendLinks();
```

### 7.4 在页面中引入脚本

在需要加载 CMS 内容的 HTML 页面中，在 `</body>` 前添加：

```html
<script src="js/cms-loader.js"></script>
<script>
  // 在 DOMContentLoaded 后加载内容
  document.addEventListener('DOMContentLoaded', async () => {
    // 调用加载函数...
  });
</script>
```

### 7.5 注意事项

1. **跨域限制**：`cms-loader.js` 通过 `fetch` 从 GitHub Raw Content 读取文件，GitHub Raw 默认支持 CORS，无需额外配置
2. **缓存**：GitHub Raw 可能有缓存，内容更新后可能需要几分钟才能生效
3. **错误处理**：如果加载失败，`loadCollection` 返回空数组，`loadFile` 返回 `null`，不会导致页面崩溃
4. **性能**：大量文件时建议分批加载或使用 `index.json` 索引文件

---

## 8. GitHub OAuth 配置

### 8.1 为什么需要 OAuth

Decap CMS 通过 GitHub OAuth App 进行身份认证，确保只有授权用户才能管理内容。

### 8.2 创建 GitHub OAuth App

#### 步骤一：进入 GitHub 设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最下方 → **Developer settings**
4. 选择 **OAuth Apps** → **New OAuth App**

#### 步骤二：填写应用信息

| 字段 | 值 | 说明 |
|------|-----|------|
| Application name | `Academic Homepage CMS` | 应用名称（可自定义） |
| Homepage URL | `https://你的用户名.github.io` | 网站首页地址 |
| Authorization callback URL | `https://你的用户名.github.io/admin/` | CMS 管理页面地址 |

#### 步骤三：获取凭据

创建完成后，你会看到：

- **Client ID**：类似 `Ov23li...` 的字符串
- **Client secrets**：点击 "Generate a new client secret" 生成

#### 步骤四：配置 CMS

将 Client ID 填入 `admin/config.yml`：

```yaml
backend:
  name: github
  repo: Zephyr-Chan/zephyr-chan.github.io
  branch: main
  auth_endpoint: auth
  app_id: "Ov23li..."    # 填入你的 Client ID
```

### 8.3 使用 OAuth Proxy（可选）

如果不想创建自己的 OAuth App，可以使用第三方 OAuth 代理服务：

```yaml
backend:
  name: github
  repo: Zephyr-Chan/zephyr-chan.github.io
  branch: main
  auth_endpoint: auth
  app_id: ""    # 留空，使用 Decap CMS 默认的 OAuth 服务
```

> **注意**：使用第三方 OAuth 代理时，每次登录可能会看到 "This app is not verified" 的警告，这是正常的，点击 "Continue" 即可。

### 8.4 限制访问权限

如果只想让特定用户管理内容，可以在 GitHub 仓库设置中配置：

1. 进入仓库 → **Settings** → **Collaborators**
2. 只添加需要管理权限的用户作为协作者
3. OAuth 登录时，只有仓库协作者才能通过认证

---

## 9. 常见问题

### Q1: 访问 /admin/ 显示空白页面

**可能原因和解决方案：**

| 原因 | 解决方案 |
|------|---------|
| Decap CMS JS 加载失败 | 检查网络连接，确认 `unpkg.com` 可访问 |
| config.yml 格式错误 | 使用 [YAML Lint](https://www.yamllint.com/) 检查配置文件格式 |
| 浏览器控制台报错 | 按 F12 打开开发者工具，查看 Console 中的错误信息 |

### Q2: 登录后看不到任何内容

**可能原因：**

- `content/` 目录下没有对应的文件夹或文件
- `config.yml` 中的 `folder` 路径与实际目录不匹配
- 仓库分支名不是 `main`（检查 `branch` 配置）

### Q3: 图片上传失败

**可能原因和解决方案：**

| 原因 | 解决方案 |
|------|---------|
| `assets/images/uploads/` 目录不存在 | 在仓库中创建该目录并添加 `.gitkeep` 文件 |
| 仓库为 Private | 将仓库改为 Public，或使用 Git Gateway 后端 |
| 图片文件过大 | GitHub 单文件限制 100MB，建议图片不超过 5MB |

### Q4: 发布后网站没有更新

**解决方案：**

1. 等待 1-3 分钟（GitHub Pages 部署需要时间）
2. 按 `Ctrl + F5` 强制刷新浏览器
3. 检查 GitHub 仓库的 commit 记录，确认内容已提交
4. 检查 GitHub Pages 的部署状态（仓库 → Actions 标签页）

### Q5: cms-loader.js 加载内容为空

**可能原因：**

- GitHub Raw Content API 有缓存，等待几分钟重试
- `content/` 目录下没有 `index.json` 文件（`loadCollection` 需要）
- 网络问题导致 `fetch` 请求失败

### Q6: 中文文件名或标题导致问题

**解决方案：**

`config.yml` 中已配置 `slug.encoding: "ascii"` 和 `clean_accents: true`，中文标题会自动转换为 ASCII slug。如果仍有问题，确保文件名只包含 ASCII 字符。

### Q7: 如何修改 CMS 界面语言

在 `config.yml` 中修改 `locale` 字段：

```yaml
locale: "zh"    # 中文
locale: "en"    # 英文
locale: "ja"    # 日文
```

### Q8: 如何添加新的内容类型

在 `config.yml` 的 `collections` 数组中添加新的集合定义，同时创建对应的 `content/` 子目录。

---

## 10. 进阶功能

### 10.1 自定义预览模板

Decap CMS 支持自定义内容预览，可以注册自定义的 React 组件来预览内容。

在 `admin/index.html` 中添加：

```html
<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
<script>
  // 注册自定义预览组件
  const AlgoTemplatePreview = ({ entry, widgetFor, getAsset }) => {
    const data = entry.get('data').toJS();
    return h('div', { className: 'preview' },
      h('h2', {}, data.title),
      h('span', { className: 'category' }, data.category),
      h('span', { className: 'difficulty' }, data.difficulty),
      h('div', {}, widgetFor('body'))
    );
  };

  CMS.registerPreviewTemplate('algo_templates', AlgoTemplatePreview);
</script>
```

### 10.2 编辑工作流（Editorial Workflow）

启用编辑工作流后，内容会先保存为草稿（Draft），经过审核后再发布。

```yaml
# 在 config.yml 顶层添加
publish_mode: editorial_workflow
```

**工作流程：**

```
草稿 (Draft) → 待审核 (In Review) → 已发布 (Published)
```

> **注意**：使用编辑工作流时，`backend` 必须使用 `git-gateway`（Netlify Identity）或配置自定义后端。GitHub 后端不原生支持编辑工作流。

### 10.3 自定义 Widget

可以注册自定义的 Widget 来扩展 CMS 的编辑能力：

```javascript
// 自定义颜色选择器 Widget
const ColorWidget = ({ value, onChange }) => {
  return h('input', {
    type: 'color',
    value: value || '#000000',
    onChange: (e) => onChange(e.target.value)
  });
};

CMS.registerWidget('color', ColorWidget);
```

### 10.4 搜索功能

Decap CMS 内置了搜索功能，可以在 CMS 界面中搜索内容。搜索基于文件内容，支持全文搜索。

### 10.5 多用户协作

通过 GitHub 的仓库权限系统，可以支持多用户协作：

1. 将协作者添加为仓库的 Collaborator
2. 每个协作者通过自己的 GitHub 账号登录 CMS
3. 所有修改通过 Git commit 记录，可以追踪谁做了什么修改

### 10.6 自动部署钩子

如果使用 Netlify 或 Vercel 部署，可以配置自动部署：

```yaml
# Netlify 配置示例（netlify.toml）
[build]
  publish = "."

# Vercel 配置示例（vercel.json）
{
  "builds": [{ "src": "**", "use": "@vercel/static" }]
}
```

### 10.7 备份与恢复

由于所有内容都存储在 Git 仓库中：

- **备份**：定期 `git clone` 仓库到本地即可
- **恢复**：使用 `git checkout` 回退到任意历史版本
- **灾难恢复**：GitHub 仓库本身就有完整的提交历史

```bash
# 查看内容修改历史
git log --oneline content/

# 回退某个文件到指定版本
git checkout abc1234 -- content/algo-templates/dp-knapsack.md
```

---

## 附录

### A. 文件结构总览

```
academic-homepage/
├── admin/
│   ├── index.html                  # CMS 入口
│   └── config.yml                  # CMS 配置
├── content/
│   ├── algo-templates/             # 算法模板
│   │   └── dp-knapsack.md
│   ├── vp-notes/                   # VP 记录
│   │   └── codeforces-round-950.md
│   ├── gallery/                    # 相册照片
│   │   └── lab-meeting-2026.md
│   ├── resources/                  # 学习资料
│   │   └── deep-learning-courses.md
│   └── friends/                    # 友链
│       └── silencer76.md
├── assets/images/uploads/          # 上传图片
│   └── .gitkeep
├── js/
│   └── cms-loader.js               # 内容加载脚本
├── docs/
│   └── CMS-INTEGRATION.md          # 本文档
└── ...（其他项目文件）
```

### B. 相关链接

| 资源 | 链接 |
|------|------|
| Decap CMS 官方文档 | https://decapcms.org/docs/ |
| Decap CMS GitHub 仓库 | https://github.com/decaporg/decap-cms |
| Widget 列表 | https://decapcms.org/docs/widgets/ |
| Backend 配置 | https://decapcms.org/docs/backends-overview/ |
| YAML 语法参考 | https://yaml.org/spec/1.2.2/ |

### C. 更新日志

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-04-23 | v1.0 | 初始集成，包含 5 种内容类型 |
