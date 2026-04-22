# 学术个人主页 — 完整使用与修改指南

本指南面向**完全没有前端基础**的同学，用最通俗的语言教你如何修改和维护这个网站。你只需要会用文本编辑器（如 VS Code、记事本）打开文件，找到对应位置，替换文字即可。

---

## 目录

1. [项目概述](#1-项目概述)
2. [如何预览网站](#2-如何预览网站)
3. [GitHub Pages 部署指南](#3-github-pages-部署指南)
4. [如何修改个人信息](#4-如何修改个人信息)
5. [如何添加/修改科研经历](#5-如何添加修改科研经历)
6. [如何添加/修改论文](#6-如何添加修改论文)
7. [如何添加/修改项目](#7-如何添加修改项目)
8. [如何添加/修改新闻](#8-如何添加修改新闻)
9. [如何添加/修改荣誉奖项](#9-如何添加修改荣誉奖项)
10. [如何修改技术栈 Skills](#10-如何修改技术栈-skills)
11. [如何管理 CV 简历页面](#11-如何管理-cv-简历页面)
12. [如何管理 Algorithms 算法页面](#12-如何管理-algorithms-算法页面)
13. [如何管理 Social 社交页面](#13-如何管理-social-社交页面)
14. [如何管理访客地图 ClustrMaps](#14-如何管理访客地图-clustrmaps)
15. [如何替换头像和图片](#15-如何替换头像和图片)
16. [如何修改配色](#16-如何修改配色)
17. [导航栏与中英文切换系统](#17-导航栏与中英文切换系统)
18. [常见问题 FAQ](#18-常见问题-faq)
- [附录 A：友链添加详细教程](#附录-a友链添加详细教程)
- [附录 B：代码上传模板（Git 命令）](#附录-b代码上传模板git-命令)

---

## 1. 项目概述

这是一个**纯静态学术个人主页**，不需要服务器、不需要数据库。网站由 4 个页面组成，共享同一套样式和脚本。

### 页面列表

| 页面 | 文件 | 说明 |
|------|------|------|
| 主页 | `index.html` | 个人信息、科研经历、论文、项目、荣誉、技能、相册、联系方式、访客地图 |
| CV 简历 | `cv.html` | 简历和成绩单的在线预览与下载 |
| 算法竞技场 | `algorithms.html` | OJ 平台链接、竞赛经历（待完善） |
| 社交页面 | `social.html` | 社交平台链接、学术主页、友链、联系表单 |

### 文件结构

```
academic-homepage/
├── index.html          # 主页面
├── cv.html             # CV 简历页面
├── algorithms.html     # 算法学习页面
├── social.html         # 社交页面
├── css/                # 样式文件夹（一般不需要修改）
│   ├── style.css       # 主样式入口（导入其他CSS）
│   ├── theme.css       # 配色主题（想改颜色改这里）
│   ├── layout.css      # 布局样式
│   ├── components.css  # 组件样式（导航栏、卡片、技能等）
│   ├── typography.css  # 字体与排版
│   └── animations.css  # 动画效果
├── js/                 # 脚本文件夹
│   ├── main.js         # 主脚本（主题切换、语言切换、导航、翻译等）
│   ├── gallery.js      # 图片画廊功能
│   ├── publications.js # 论文筛选功能
│   └── animations.js   # 滚动入场动画
└── assets/             # 资源文件夹
    ├── images/         # 图片资源
    │   ├── profile.jpg           # 头像
    │   ├── publications/         # 论文缩略图
    │   ├── projects/             # 项目截图
    │   ├── gallery/              # 画廊照片
    │   ├── logos/                # 学校/机构 logo
    │   └── wechat-qr.jpg         # 微信二维码
    └── files/           # 文档资源
        ├── resume.pdf            # 简历 PDF
        └── transcript.pdf        # 成绩单 PDF
```

### 主页包含的板块

| 板块 | 说明 |
|------|------|
| Hero（头像+名字+标语） | 页面最顶部的个人信息展示 |
| About（关于我） | 个人简介，支持中英文 |
| Education（教育背景） | 学历信息 |
| Research（科研经历） | 以项目为模块的科研经历 |
| News（新闻动态） | 最新动态，支持折叠 |
| Publications（学术论文） | 论文列表，支持分类筛选 |
| Projects（研究项目） | 项目卡片展示 |
| Honors（荣誉奖项） | 获奖列表 |
| Skills（技术栈） | 技能分类展示 |
| Gallery（相册） | 照片墙 |
| Contact（联系方式） | 邮箱、地址 |
| Visitor Map（访客地图） | ClustrMaps 3D 地球仪访客分布 |

---

## 2. 如何预览网站

**最简单的方法**：双击 `index.html` 文件，它会自动在浏览器中打开。

**推荐方法**：用 VS Code 打开项目，安装 "Live Server" 插件，右键 `index.html` 选择 "Open with Live Server"，修改后浏览器会自动刷新。

**注意**：双击打开时，某些浏览器可能会阻止本地文件加载 CSS/JS。如果页面样式异常，请使用 Live Server 方法。

---

## 3. GitHub Pages 部署指南

GitHub Pages 是**免费的静态网站托管服务**，可以把你的网站发布到 `你的用户名.github.io` 这个地址。

### 3.1 正确的部署步骤

#### 步骤一：创建 GitHub 仓库（⚠️ 关键步骤）

1. 注册/登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. **仓库名必须设为 `你的GitHub用户名.github.io`**
   - 例如你的用户名是 `zephyr-chan`，仓库名就是 `zephyr-chan.github.io`
   - ⚠️ **不要**用其他名字（如 `zefengchen.github.io`），否则会导致页面空白！
4. 选择 `Public`（公开）
5. 勾选 `Add a README file`
6. 点击 `Create repository`

#### 步骤二：上传文件

**方法 A：网页上传（最简单，适合新手）**

1. 进入刚创建的仓库页面
2. 点击 `Add file` → `Upload files`
3. 把以下文件和文件夹**全部**拖进去（注意要在根目录，不要嵌套）：
   - `index.html`、`cv.html`、`algorithms.html`、`social.html`
   - `css/` 文件夹
   - `js/` 文件夹
   - `assets/` 文件夹
4. 点击 `Commit changes`

**方法 B：用 Git 命令行（推荐，方便后续更新）**

```bash
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io
# 把网站文件复制进来
git add .
git commit -m "Update academic homepage"
git push origin main
```

#### 步骤三：开启 GitHub Pages

1. 进入仓库页面，点击 `Settings`
2. 左侧菜单找到 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. `Branch` 选择 `main`，文件夹选 `/ (root)`
5. 点击 `Save`

#### 步骤四：等待部署

等待 1-3 分钟，访问 `https://你的用户名.github.io` 即可看到你的网站。

### 3.2 ⚠️ 页面空白问题排查

| 症状 | 原因 | 解决方法 |
|------|------|---------|
| URL 是 `xxx.github.io/yyy.github.io/` | 仓库名 ≠ 用户名 | 在 Settings 里把仓库名改为 `你的用户名.github.io` |
| 页面空白但 URL 正确 | CSS/JS 路径错误 | 确保文件在仓库根目录，不在子文件夹里 |
| 404 Not Found | 仓库是 Private | 把仓库改为 Public |
| 修改后没更新 | 需要等待 | 等 1-3 分钟再刷新 |

**最重要的规则**：仓库名 = `你的GitHub用户名.github.io`

### 3.3 后续更新网站

修改了文件后，重新上传或用 `git push` 推送，GitHub Pages 会自动更新（通常 1-2 分钟内生效）。

---

## 4. 如何修改个人信息

以下列出所有需要修改的位置，用**搜索关键词**帮你快速定位。**注意：所有页面中出现的个人信息都要同步修改。**

### 4.1 网页标题和搜索信息

| 搜索关键词 | 替换为 | 涉及文件 |
|---|---|---|
| `Zefeng Chen — Academic Homepage` | 你的名字 + Academic Homepage | index.html |
| `CV — Zefeng Chen` | CV — 你的名字 | cv.html |
| `Social — Zefeng Chen` | Social — 你的名字 | social.html |

### 4.2 顶部个人信息（Hero 区域）

搜索 `hero-name`，找到名字标题并替换。

搜索 `hero-tagline`，找到标签行（学校、专业、研究方向）并替换。

### 4.3 社交链接（所有页面都要改）

| 搜索关键词 | 替换为 |
|---|---|
| `https://github.com/Zephyr-Chan` | 你的 GitHub 链接 |
| `mailto:820043928@qq.com` | 你的邮箱 |
| `linkedin.com/in/zefengchen` | 你的 LinkedIn 链接 |

### 4.4 关于我（About 区域）

搜索 `about-en`，找到英文简介段落，直接替换文字。

搜索 `about-cn`，找到中文简介段落，直接替换文字。

### 4.5 教育背景（Education 区域）

搜索 `edu-grid`，找到教育经历。每个 `edu-item` 是一条教育经历，修改学校名、专业、GPA、时间等。

### 4.6 联系方式

搜索 `contact-info`，找到邮箱和地址并替换。

### 4.7 页脚（所有页面都要改）

搜索 `&copy; 2026 Zefeng Chen`，替换为你的名字和年份。

---

## 5. 如何添加/修改科研经历

搜索 `research-list`，找到科研经历区域。科研经历**以项目为模块**组织，每个 `research-item` 是一个项目：

```html
<div class="research-item">
  <div class="research-header">
    <div class="research-role" data-i18n="research_role1">Research Assistant</div>
    <div class="research-meta meta">2025.12 — Present</div>
  </div>
  <div class="research-org">
    <a href="https://www.wyu.edu.cn">五邑大学</a> · 电子与信息工程学院
  </div>
  <div class="research-supervisor">
    Supervisor: <a href="#">Prof. Zhenguo Wang</a>, <a href="#">Prof. Chenbin Liu</a>
  </div>
  <ul class="research-details">
    <li data-i18n="research_desc1_1">研究内容描述</li>
  </ul>
</div>
```

### 添加新项目

复制一个 `research-item` 块，修改内容。记得在 `js/main.js` 的 `translations` 中添加对应的翻译键值对（如 `research_role4`、`research_desc4_1`）。

---

## 6. 如何添加/修改论文

搜索 `pub-list`，找到论文列表区域。

### 论文条目模板

```html
<div class="pub-item" data-type="conference">
  <div class="pub-thumb">...</div>
  <div class="pub-info">
    <div class="pub-title"><a href="论文链接">论文标题</a></div>
    <div class="pub-authors">
      <span class="name-highlight">你的名字</span>, 合作者1, <a href="#">通讯作者*</a>
    </div>
    <div class="pub-venue">
      <span class="venue-tag">会议/期刊名 年份</span>
      状态说明
    </div>
    <div class="pub-buttons">
      <a href="PDF链接" class="pub-btn"><i class="fas fa-file-pdf"></i> PDF</a>
      <a href="代码链接" class="pub-btn"><i class="fab fa-github"></i> Code</a>
      <details><summary>BibTeX</summary>...</details>
    </div>
  </div>
</div>
```

### 论文状态说明

- `(Coming Soon)` — 论文已投稿，等待结果
- `(Accepted)` — 已接收
- `(Published)` — 已发表

---

## 7. 如何添加/修改项目

搜索 `grid grid-3`（在 Projects 区域），找到项目卡片列表。每个 `project-card` 是一个项目，包含图片、标题、描述、技术标签和链接。

---

## 8. 如何添加/修改新闻

搜索 `news-list`，找到新闻列表。

```html
<div class="news-item">
  <span class="news-date">2026.04</span>
  <span class="news-content">新闻内容，可以用 <strong>加粗</strong> 强调重点。</span>
</div>
```

- 新闻按时间倒序排列（最新的在最上面）
- 默认显示前若干条，多余的用 `class="news-item news-hidden" style="display:none;"` 隐藏

---

## 9. 如何添加/修改荣誉奖项

搜索 `honor-item`，找到奖项列表。

```html
<div class="honor-item">
  <span class="honor-year">2026</span>
  <span class="honor-info">竞赛名称 <strong>奖项等级</strong></span>
</div>
```

---

## 10. 如何修改技术栈 Skills

搜索 `skills-grid`，找到技能区域。

### 熟练度等级

| 等级 | 圆点颜色 | 含义 |
|------|---------|------|
| `data-level="4"` | 蓝色 | 精通 |
| `data-level="3"` | 青色 | 熟练 |
| `data-level="2"` | 琥珀色 | 了解/学习中 |

### 添加新技能

```html
<span class="skill-tag" data-level="3">新技能名</span>
```

---

## 11. 如何管理 CV 简历页面

CV 页面 (`cv.html`) 用于展示简历和成绩单，支持**在线预览**和**下载**。

### 11.1 替换简历 PDF

把你的简历文件重命名为 `resume.pdf`，放到 `assets/files/resume.pdf`，覆盖原文件。

### 11.2 替换成绩单 PDF

把成绩单文件重命名为 `transcript.pdf`，放到 `assets/files/transcript.pdf`，覆盖原文件。

### 11.3 添加更多文档

在 `cv.html` 中复制一个 `cv-card` 块，修改：
- 图标颜色（`style="color: var(--accent-amber);"` 等）
- 标题和描述
- PDF 文件路径
- 预览 iframe 的 ID

### 11.4 预览功能说明

预览使用 Google Docs Viewer，需要 PDF 文件在公网上可访问（即已部署到 GitHub Pages）。本地预览时可能无法加载。

---

## 12. 如何管理 Algorithms 算法页面

算法页面 (`algorithms.html`) 目前是**占位页面**，后续可以详细设计。

### 12.1 修改 OJ 平台链接

搜索 `oj-card`，找到各平台卡片。修改 `href` 为你的实际账号链接，修改 Rating 为你的实际分数。

### 12.2 添加竞赛经历

搜索 `competition-history`，在占位区域替换为实际的竞赛记录。

### 12.3 参考

推荐参考 [silencer76.com](https://silencer76.com) 的算法板块设计，包含 OJ Rating 展示、竞赛经历时间线、算法学习工具等。

---

## 13. 如何管理 Social 社交页面

### 13.1 修改社交平台卡片

搜索 `social-grid`，找到社交卡片区域。每个 `social-card` 是一个平台，修改图标、名称、描述和链接。

### 13.2 修改学术主页链接

搜索 `web-presence-list`，找到学术主页列表（Google Scholar、ORCID、ResearchGate、Semantic Scholar），把 `href="#"` 替换为你的实际链接。

### 13.3 联系表单

联系表单使用 **FormSubmit.co**，消息会发送到 `820043928@qq.com`。

**首次激活**：第一次有人通过表单发消息时，去邮箱点击确认链接。

**修改接收邮箱**：搜索 `formsubmit.co/820043928@qq.com`，把邮箱替换为你的。

**附件功能**：表单支持附件上传（PDF/DOC/JPG/PNG/ZIP），但 FormSubmit 免费版可能不支持附件。如需附件功能，建议改用 [Web3Forms](https://web3forms.com/)（250次/月免费，支持附件）。

### 13.4 友链管理

搜索 `friend-links-grid`，找到友链区域。

**添加友链**：复制一个 `friend-link-card` 块，修改头像、名称、描述和链接。

```html
<a href="https://friend-site.com" target="_blank" rel="noopener" class="friend-link-card">
  <div class="friend-link-avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">F</div>
  <div class="friend-link-info">
    <div class="friend-link-name">Friend Name</div>
    <div class="friend-link-desc">一句话描述</div>
  </div>
</a>
```

---

## 14. 如何管理访客地图 ClustrMaps

### 14.1 当前配置

你的 ClustrMaps 站点 ID 是 `1c9te`，已嵌入在 `index.html` 的访客地图板块中。

查看数据面板：`https://clustrmaps.com/site/1c9te`

### 14.2 嵌入代码位置

在 `index.html` 中搜索 `clustrmaps`，找到嵌入代码：

```html
<script id="clustrmaps" src="//clustrmaps.com/globe.js?d=1c9te" type="text/javascript"></script>
```

### 14.3 如果访客数据为 0

1. 确认网站已部署到 GitHub Pages（本地预览不计入访客）
2. 确认嵌入代码中的 ID 正确（`d=1c9te`）
3. 访问一次你的网站，等几分钟后再查看 ClustrMaps 面板
4. 如果仍为 0，去 ClustrMaps 设置页面检查追踪状态

### 14.4 切换地图样式

- **3D 地球仪**（当前）：`globe.js?d=1c9te`
- **2D 平面地图**：`map_v2.js?d=1c9te&cl=ffffff&w=a&t=n&z=1`

### 14.5 修改地图高度

搜索 `clustrmaps-widget`，修改 `style="height: 300px;"` 中的数值。

---

## 15. 如何替换头像和图片

### 图片要求

| 图片类型 | 建议尺寸 | 存放位置 |
|---------|---------|---------|
| 头像 | 400×400（正方形） | `assets/images/profile.jpg` |
| 论文缩略图 | 320×200 | `assets/images/publications/` |
| 项目封面 | 600×400 | `assets/images/projects/` |
| 画廊照片 | 800×600 | `assets/images/gallery/` |
| 学校 Logo | 200×200（PNG透明） | `assets/images/logos/` |
| 微信二维码 | 正方形 | `assets/images/wechat-qr.jpg` |
| 简历 PDF | — | `assets/files/resume.pdf` |
| 成绩单 PDF | — | `assets/files/transcript.pdf` |

### 不放图片也行

网站内置了图片加载失败的兜底方案：头像显示名字缩写、论文显示文件图标、项目显示 emoji。

---

## 16. 如何修改配色

打开 `css/theme.css`，搜索 `:root`，找到颜色变量。

### 快速换色方案

```css
--accent: #1a56db;       /* 当前：深蓝 */
--accent: #16a34a;       /* 绿色学术风 */
--accent: #7c3aed;       /* 紫色学术风 */
--accent: #dc2626;       /* 红色学术风 */
```

暗色模式颜色在 `css/theme.css` 中搜索 `[data-theme="dark"]`。

---

## 17. 导航栏与中英文切换系统

### 17.1 导航栏结构

所有 4 个页面共享相同的导航栏：

```
About | Education | Research | News | Publications | Projects | Honors | Skills | Gallery | Contact | CV | Algorithms | Social
```

- 主页板块链接用 `#板块id`（如 `#about`）
- 独立页面链接：`cv.html`、`algorithms.html`、`social.html`
- 其他页面的板块链接加 `index.html` 前缀（如 `index.html#about`）

### 17.2 修改导航栏

搜索 `navbar-links`，添加/删除 `<a>` 标签。**所有 4 个页面的导航栏都要同步修改。**

### 17.3 中英文切换

点击导航栏右侧的 🌐 按钮切换。切换内容包括：板块标题、Hero 标语、About 介绍、科研经历、论文筛选标签、技能分类、Social 页面文本、CV 页面文本等。

### 17.4 修改翻译内容

打开 `js/main.js`，搜索 `translations`：

```javascript
const translations = {
  nav_about: { en: 'About', zh: '关于' },
  // ...
};
```

- 修改翻译：直接改 `en` 或 `zh` 后面的字符串
- 添加翻译：添加 `key: { en: 'English', zh: '中文' }`
- Hero 标语：搜索 `heroTagline.innerHTML`
- 高亮框（未来计划）：搜索 `highlightBox.innerHTML`

### 17.5 Future Plan（未来计划）

在 `js/main.js` 中搜索 `highlightBox`，修改中英文版本的"未来计划"内容。

---

## 18. 常见问题 FAQ

### Q1: 修改后浏览器没有变化？

按 `Ctrl + F5`（Windows）或 `Cmd + Shift + R`（Mac）强制刷新。

### Q2: 中文显示乱码？

确保文件以 **UTF-8 编码**保存。

### Q3: GitHub Pages 页面空白？

仓库名必须等于 `你的用户名.github.io`。详见 [第 3.2 节](#32-页面空白问题排查)。

### Q4: ClustrMaps 访客数据为 0？

确认网站已部署到 GitHub Pages，本地预览不计入访客。部署后访问一次网站，等几分钟查看。详见 [第 14.3 节](#143-如果访客数据为-0)。

### Q5: 联系表单发送失败？

首次使用 FormSubmit 需要去邮箱确认激活。详见 [第 13.3 节](#133-联系表单)。

### Q6: CV 预览无法加载？

Google Docs Viewer 需要文件在公网可访问。本地预览时无法使用，部署到 GitHub Pages 后即可。

### Q7: 如何删除不需要的板块？

搜索对应 `id`（如 `id="gallery"`），把整个 `<section>` 到 `</section>` 删掉，同时删掉导航栏中对应的链接。

### Q8: 如何添加新的独立页面？

1. 复制任意一个页面（如 `algorithms.html`）作为模板
2. 修改标题、内容和导航栏的 `active` 类
3. 在所有其他页面的导航栏中添加新链接
4. 在 `js/main.js` 的 `translations` 中添加翻译

### Q9: 如何备份网站？

如果用 Git 管理，所有历史版本都在 GitHub 上。也可以定期压缩整个文件夹备份到网盘。

---

## 附录 A：友链添加详细教程

### A.1 什么是友链？

友链（Friendly Links）就是和其他网站主人互相在各自网站上放对方的链接。你的友链区域在 Social 页面底部。

### A.2 如何添加一条友链？

**第一步**：打开 `social.html`，搜索 `friend-links-grid`

**第二步**：在最后一个 `</a>` 和 `<!-- Add more -->` 之间，插入以下代码：

```html
<a href="https://朋友的网站地址" target="_blank" rel="noopener" class="friend-link-card">
  <div class="friend-link-avatar" style="background: linear-gradient(135deg, #颜色1, #颜色2);">首字母</div>
  <div class="friend-link-info">
    <div class="friend-link-name">朋友的名字/网站名</div>
    <div class="friend-link-desc">一句话描述</div>
  </div>
</a>
```

**第三步**：修改以下内容：
- `href`：朋友的网站地址
- `background`：头像背景渐变色（可以选两个颜色）
- `首字母`：显示在头像圆圈里的字母（1-2个字符）
- `friend-link-name`：朋友的名字或网站名
- `friend-link-desc`：一句话描述（中英文都行）

### A.3 头像颜色推荐

| 风格 | 渐变色代码 |
|------|-----------|
| 蓝紫 | `linear-gradient(135deg, #667eea, #764ba2)` |
| 青蓝 | `linear-gradient(135deg, #0093E9, #80D0C7)` |
| 橙红 | `linear-gradient(135deg, #f093fb, #f5576c)` |
| 绿色 | `linear-gradient(135deg, #43e97b, #38f9d7)` |
| 暗金 | `linear-gradient(135deg, #f7971e, #ffd200)` |

### A.4 如果朋友有头像图片

把 `friend-link-avatar` 的内容改为：

```html
<div class="friend-link-avatar" style="background-image: url('assets/images/friends/xxx.jpg'); background-size: cover; background-position: center;"></div>
```

然后把朋友的头像图片放到 `assets/images/friends/` 文件夹。

### A.5 如何请求别人加你的友链？

给对方发消息时提供以下信息：

```
名称：Zefeng Chen
地址：https://zephyr-chan.github.io/
描述：AI Agent & BCI Research | Undergraduate at Wuyi University
头像：https://zephyr-chan.github.io/assets/images/profile.jpg
```

---

## 附录 B：代码上传模板（Git 命令）

### B.1 首次部署

```bash
# 1. 在 GitHub 上创建仓库 zephyr-chan.github.io（Public）

# 2. 在本地打开终端，进入网站文件夹
cd /path/to/academic-homepage

# 3. 初始化 Git
git init
git branch -M main

# 4. 关联远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/Zephyr-Chan/zephyr-chan.github.io.git

# 5. 添加所有文件
git add .

# 6. 提交
git commit -m "Initial commit: academic homepage"

# 7. 推送到 GitHub
git push -u origin main
```

### B.2 日常更新（修改了文件后）

```bash
# 1. 查看修改了哪些文件
git status

# 2. 添加所有修改
git add .

# 3. 提交（写清楚改了什么）
git commit -m "更新：添加新论文 / 修改个人信息 / 添加友链"

# 4. 推送
git push
```

### B.3 常用 Git 命令速查

| 命令 | 作用 |
|------|------|
| `git status` | 查看当前修改状态 |
| `git diff` | 查看具体改了什么内容 |
| `git add .` | 添加所有修改到暂存区 |
| `git add 文件名` | 只添加指定文件 |
| `git commit -m "说明"` | 提交修改 |
| `git push` | 推送到 GitHub |
| `git pull` | 从 GitHub 拉取最新版本 |
| `git log --oneline -5` | 查看最近 5 次提交记录 |
| `git restore 文件名` | 撤销对某个文件的修改（未提交时） |

### B.4 提交信息规范建议

```
feat: 添加新功能（如新页面、新模块）
fix: 修复问题（如链接错误、样式问题）
update: 更新内容（如修改个人信息、添加论文）
docs: 更新文档（如修改 GUIDE.md）
style: 调整样式（不影响功能）
```

示例：
```bash
git commit -m "feat: 添加算法学习页面"
git commit -m "update: 添加新论文和更新科研经历"
git commit -m "fix: 修复导航栏在移动端的显示问题"
```

### B.5 如果推送到 GitHub 失败

```bash
# 如果提示远程有更新，先拉取再推送
git pull --rebase origin main
git push

# 如果提示认证失败，使用 Personal Access Token
# 1. 去 GitHub → Settings → Developer settings → Personal access tokens → Generate new token
# 2. 勾选 repo 权限
# 3. 推送时用 token 作为密码：
git push
# Username: Zephyr-Chan
# Password: ghp_你的token（注意 token 只显示一次，记得保存）
```
