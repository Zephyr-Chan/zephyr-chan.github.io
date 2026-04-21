# 学术个人主页 — 完整使用与修改指南

本指南面向**完全没有前端基础**的同学，用最通俗的语言教你如何修改和维护这个网站。你只需要会用文本编辑器（如 VS Code、记事本）打开文件，找到对应位置，替换文字即可。

---

## 目录

1. [项目概述](#1-项目概述)
2. [如何预览网站](#2-如何预览网站)
3. [GitHub Pages 部署指南（含常见问题排查）](#3-github-pages-部署指南)
4. [如何修改个人信息](#4-如何修改个人信息)
5. [如何添加/修改科研经历](#5-如何添加修改科研经历)
6. [如何添加/修改论文](#6-如何添加修改论文)
7. [如何添加/修改项目](#7-如何添加修改项目)
8. [如何添加/修改新闻](#8-如何添加修改新闻)
9. [如何添加/修改荣誉奖项](#9-如何添加修改荣誉奖项)
10. [如何修改技术栈 Skills](#10-如何修改技术栈-skills)
11. [如何管理 Social 社交页面](#11-如何管理-social-社交页面)
12. [如何替换头像和图片](#12-如何替换头像和图片)
13. [如何修改配色](#13-如何修改配色)
14. [导航栏与中英文切换系统](#14-导航栏与中英文切换系统)
15. [常见问题 FAQ](#15-常见问题-faq)

---

## 1. 项目概述

这是一个**纯静态学术个人主页**，不需要服务器、不需要数据库。网站由主页 (`index.html`) 和社交页 (`social.html`) 两个页面组成，共享同一套样式和脚本。

### 文件结构

```
academic-homepage/
├── index.html          # 主页面（个人信息、论文、项目等）
├── social.html         # 社交页面（各平台链接、学术主页）
├── css/                # 样式文件夹（一般不需要修改）
│   ├── style.css       # 主样式入口（导入其他CSS）
│   ├── theme.css       # 配色主题（想改颜色改这里）
│   ├── layout.css      # 布局样式
│   ├── components.css  # 组件样式（导航栏、卡片、技能等）
│   ├── typography.css  # 字体与排版
│   └── animations.css  # 动画效果
├── js/                 # 脚本文件夹
│   ├── main.js         # 主脚本（主题切换、语言切换、导航等）
│   ├── gallery.js      # 图片画廊功能
│   ├── publications.js # 论文筛选功能
│   └── animations.js   # 滚动入场动画
└── assets/             # 图片资源文件夹
    └── images/
        ├── profile.jpg           # 你的头像
        ├── publications/         # 论文缩略图
        ├── projects/             # 项目截图
        ├── gallery/              # 画廊照片
        └── logos/                # 学校/机构 logo
```

### 网站包含的板块

| 板块 | 所在页面 | 说明 |
|------|---------|------|
| Hero（头像+名字+标语） | index.html | 页面最顶部的个人信息展示 |
| About（关于我） | index.html | 个人简介，支持中英文 |
| Education（教育背景） | index.html | 学历信息 |
| Research（科研经历） | index.html | 科研助理/实习经历 |
| News（新闻动态） | index.html | 最新动态，支持折叠 |
| Publications（学术论文） | index.html | 论文列表，支持分类筛选 |
| Projects（研究项目） | index.html | 项目卡片展示 |
| Honors（荣誉奖项） | index.html | 获奖列表 |
| Skills（技术栈） | index.html | 技能分类展示 |
| Gallery（相册） | index.html | 照片墙 |
| Contact（联系方式） | index.html | 邮箱、地址 |
| Social（社交链接） | social.html | 各平台账号、学术主页 |

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
   - `index.html`
   - `social.html`
   - `css/` 文件夹
   - `js/` 文件夹
   - `assets/` 文件夹
4. 点击 `Commit changes`

**方法 B：用 Git 命令行（推荐，方便后续更新）**

```bash
# 1. 克隆仓库
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io

# 2. 把网站文件复制进来
# （把 index.html, social.html, css/, js/, assets/ 都复制到这个目录）

# 3. 提交并推送
git add .
git commit -m "Initial commit: academic homepage"
git push origin main
```

#### 步骤三：开启 GitHub Pages

1. 进入仓库页面，点击 `Settings`
2. 左侧菜单找到 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. `Branch` 选择 `main`，文件夹选 `/ (root)`
5. 点击 `Save`

#### 步骤四：等待部署

- 等待 1-3 分钟
- 访问 `https://你的用户名.github.io` 即可看到你的网站

### 3.2 ⚠️ 页面空白问题排查

如果部署后页面是空白的，**99% 的原因是仓库名不对**。

| 症状 | 原因 | 解决方法 |
|------|------|---------|
| URL 是 `xxx.github.io/yyy.github.io/` | 仓库名 ≠ 用户名 | 在 Settings 里把仓库名改为 `你的用户名.github.io` |
| 页面空白但 URL 正确 | CSS/JS 路径错误 | 确保文件在仓库根目录，不在子文件夹里 |
| 404 Not Found | 仓库是 Private | 把仓库改为 Public |
| 修改后没更新 | 需要等待 | 等 1-3 分钟再刷新 |

**最重要的规则**：仓库名 = `你的GitHub用户名.github.io`，这样 URL 才是 `https://你的用户名.github.io/`，所有路径才能正常工作。

### 3.3 后续更新网站

修改了文件后，重新上传或用 `git push` 推送，GitHub Pages 会自动更新（通常 1-2 分钟内生效）。

---

## 4. 如何修改个人信息

以下列出所有需要修改的位置，用**搜索关键词**帮你快速定位。

### 4.1 网页标题和搜索信息

打开 `index.html`，在文件最开头搜索以下关键词并替换：

| 搜索关键词 | 替换为 | 说明 |
|---|---|---|
| `Zefeng Chen — Academic Homepage` | 你的名字 + Academic Homepage | 浏览器标签页标题 |
| `Personal academic homepage of Zefeng Chen` | 你的个人简介 | 搜索引擎描述 |
| `Zefeng Chen, AI Agent, LLM, BCI` | 你的名字 + 关键词 | 搜索引擎关键词 |

**同时修改 `social.html` 中的**：搜索 `Zefeng Chen` 替换为你的名字。

### 4.2 顶部个人信息（Hero 区域）

搜索 `hero-name`，找到名字标题并替换。

搜索 `hero-tagline`，找到标签行（学校、专业、研究方向）并替换。

搜索 `hero-avatar-fallback`，找到头像加载失败时显示的字母缩写（如 `ZC`）并替换。

### 4.3 社交链接

| 搜索关键词 | 替换为 |
|---|---|
| `mailto:820043928@qq.com` | 你的邮箱 |
| `https://github.com/zefengchen` | 你的 GitHub 链接 |
| `linkedin.com/in/zefengchen` | 你的 LinkedIn 链接 |

**注意**：以上链接在 `index.html` 和 `social.html` 中都有出现，**两个文件都要改**。

### 4.4 关于我（About 区域）

搜索 `about-en`，找到英文简介段落，直接替换文字。

搜索 `about-cn`，找到中文简介段落，直接替换文字。

搜索 `research-interests`，找到研究兴趣标签，每个 `<span class="tag">...</span>` 就是一个标签，按格式增删即可。

搜索 `highlight-box`，找到高亮框内容（未来计划）并替换。

### 4.5 教育背景（Education 区域）

搜索 `edu-grid`，找到教育经历。每个 `edu-item` 是一条教育经历：

```html
<div class="edu-item">
  <img class="edu-logo" src="assets/images/logos/university.png" alt="学校名" onerror="this.style.display='none'">
  <div class="edu-info">
    <strong>学位名称</strong>
    <div style="font-size:var(--fs-small); color:var(--text-secondary);">
      <a href="学校网址">学校名</a> · 学院名
    </div>
    <div style="font-size:var(--fs-small); color:var(--text-tertiary); margin-top:2px;">
      GPA 3.96/5.00 | 均分 87.5 | 专业排名 2/40
    </div>
  </div>
  <div class="edu-meta meta">2024 — Present</div>
</div>
```

### 4.6 联系方式

搜索 `contact-info`，找到邮箱和地址。

搜索 `五邑大学 电子与信息工程学院`，替换为你的地址。

### 4.7 页脚

搜索 `&copy; 2026 Zefeng Chen`，替换为你的名字和年份。**`index.html` 和 `social.html` 都要改**。

---

## 5. 如何添加/修改科研经历

搜索 `research-list`，找到科研经历区域。每个 `research-item` 是一条科研经历：

```html
<div class="research-item">
  <div class="research-header">
    <div class="research-role" data-i18n="research_role1">Research Assistant</div>
    <div class="research-meta meta">2025.06 — Present</div>
  </div>
  <div class="research-org">
    <a href="https://www.wyu.edu.cn">五邑大学</a> · 电子与信息工程学院
  </div>
  <div class="research-supervisor">
    Supervisor: <a href="#">Prof. Zhen Wang</a>, <a href="#">Prof. Chang Liu</a>
  </div>
  <ul class="research-details">
    <li data-i18n="research_desc1_1">研究内容描述1</li>
    <li data-i18n="research_desc1_2">研究内容描述2</li>
  </ul>
</div>
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `research-role` | 职位名称（如 Research Assistant），用 `data-i18n` 支持中英文 |
| `research-meta` | 时间段 |
| `research-org` | 机构名称，可包含链接 |
| `research-supervisor` | 导师信息 |
| `research-details` | 研究内容列表，每条用 `<li>` 包裹 |

### 添加新经历

复制一个 `research-item` 块，修改内容即可。如果需要中英文切换，记得在 `js/main.js` 的 `translations` 中添加对应的翻译键值对。

---

## 6. 如何添加/修改论文

搜索 `pub-list`，找到论文列表区域。

### 论文条目 HTML 模板

```html
<div class="pub-item" data-type="conference">
  <div class="pub-thumb">
    <img src="assets/images/publications/paper1.jpg" alt="论文缩略图"
         onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--text-tertiary)\'>📄</div>';">
  </div>
  <div class="pub-info">
    <div class="pub-title">
      <a href="论文链接">论文标题</a>
    </div>
    <div class="pub-authors">
      <span class="name-highlight">你的名字</span>,
      合作者1,
      <a href="通讯作者主页">通讯作者*</a>
    </div>
    <div class="pub-venue">
      <span class="venue-tag">会议/期刊名 年份</span>
      状态说明（如 Accepted / Under Review）
    </div>
    <div class="pub-buttons">
      <a href="PDF链接" class="pub-btn"><i class="fas fa-file-pdf"></i> PDF</a>
      <a href="代码链接" class="pub-btn"><i class="fab fa-github"></i> Code</a>
      <details>
        <summary>BibTeX</summary>
        <div class="details-content">
          <div class="bibtex-block">
            <button class="copy-btn" onclick="copyBibtex(this)">Copy</button>
@inproceedings{你的名字2026key,
  title={论文标题},
  author={作者全名1 and 作者全名2},
  booktitle={会议缩写},
  year={2026}
}</div>
        </div>
      </details>
    </div>
  </div>
</div>
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `data-type` | 论文类型：`conference`（会议）、`journal`（期刊）、`preprint`（预印本） |
| `name-highlight` | 用 `<span class="name-highlight">` 包裹你自己的名字，会**加粗蓝色**显示 |
| `venue-tag` | 发表会议/期刊名称，会显示为蓝色标签 |

### 按年份分组

用 `<div class="pub-year-header">2026</div>` 创建年份标题，把同年的论文放在它下面。

---

## 7. 如何添加/修改项目

搜索 `grid grid-3`（在 Projects 区域），找到项目卡片列表。

### 项目卡片 HTML 模板

```html
<div class="project-card">
  <div class="card-image">
    <img src="assets/images/projects/project1.jpg" alt="项目名"
         onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--text-tertiary);background:var(--bg-tag)\'>🔬</div>';">
  </div>
  <div class="card-body">
    <div class="card-title">项目名称</div>
    <div class="card-desc">项目描述，一两句话说明。</div>
    <div class="card-tags">
      <span class="tag">技术标签1</span>
      <span class="tag">技术标签2</span>
    </div>
    <div class="card-links">
      <a href="GitHub链接" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>
      <a href="论文链接"><i class="fas fa-file-alt"></i> Paper</a>
    </div>
  </div>
</div>
```

---

## 8. 如何添加/修改新闻

搜索 `news-list`，找到新闻列表。

### 新闻条目 HTML 模板

```html
<div class="news-item">
  <span class="news-date">2026.04</span>
  <span class="news-content">新闻内容，可以用 <strong>加粗</strong> 强调重点。</span>
</div>
```

### 隐藏新闻（点击"展开更多"才显示）

```html
<div class="news-item news-hidden" style="display:none;">
  <span class="news-date">2025.03</span>
  <span class="news-content">这条新闻默认隐藏。</span>
</div>
```

### 带动态圆点的新闻（表示最新/重要）

在内容开头加 `<span class="pulse-dot"></span>`：

```html
<span class="news-content"><span class="pulse-dot"></span> 论文被 <strong>CVPR 2026</strong> 接收！</span>
```

### 注意事项

- 新闻按时间倒序排列（最新的在最上面）
- 默认显示前 8 条，多余的用 `news-hidden` 类隐藏
- 日期格式建议用 `YYYY.MM`

---

## 9. 如何添加/修改荣誉奖项

搜索 `honor-item`，找到奖项列表。

```html
<div class="honor-item">
  <span class="honor-year">2026</span>
  <span class="honor-info">竞赛名称 <strong>奖项等级</strong></span>
</div>
```

- 奖项按年份倒序排列，同年的放一起

---

## 10. 如何修改技术栈 Skills

搜索 `skills-grid`，找到技能区域。每个 `skill-category` 是一个技能分类：

```html
<div class="skill-category">
  <div class="skill-category-title" data-i18n="skill_lang">Languages</div>
  <div class="skill-tags">
    <span class="skill-tag" data-level="4">Python</span>
    <span class="skill-tag" data-level="3">C++</span>
  </div>
</div>
```

### 熟练度等级

| 等级 | 圆点颜色 | 含义 |
|------|---------|------|
| `data-level="4"` | 蓝色 | 精通 |
| `data-level="3"` | 青色 | 熟练 |
| `data-level="2"` | 琥珀色 | 了解/学习中 |

### 添加新技能

在对应的 `skill-tags` 容器中添加：`<span class="skill-tag" data-level="3">新技能名</span>`

### 添加新分类

复制一个 `skill-category` 块，修改标题和技能列表。记得在 `js/main.js` 的 `translations` 中添加新分类的中英文翻译。

---

## 11. 如何管理 Social 社交页面

Social 页面是一个**独立的 HTML 文件** (`social.html`)，不在主页上显示，通过导航栏的 "Social" 链接访问。

### 11.1 修改社交平台卡片

打开 `social.html`，搜索 `social-grid`，找到社交卡片区域。每个 `social-card` 是一个平台：

```html
<div class="social-card">
  <div class="social-card-icon github">
    <i class="fab fa-github"></i>
  </div>
  <div class="social-card-name">GitHub</div>
  <div class="social-card-desc" data-i18n="social_github_desc">Code repositories and open source projects</div>
  <div class="social-card-actions">
    <a href="https://github.com/zefengchen" target="_blank" rel="noopener" class="social-card-btn">
      <i class="fas fa-external-link-alt"></i> <span data-i18n="social_visit">Visit</span>
    </a>
  </div>
</div>
```

### 11.2 修改平台链接

搜索对应的平台名称（如 `GitHub`、`Email`、`LinkedIn`），把 `href="#"` 替换为你的实际链接。

### 11.3 添加/删除社交平台

**添加**：复制一个 `social-card` 块，修改图标、名称、描述和链接。

**删除**：直接删掉对应的 `social-card` 块。

### 11.4 修改学术主页链接

搜索 `web-presence-list`，找到学术主页列表（Google Scholar、ORCID、ResearchGate、Semantic Scholar），把 `href="#"` 替换为你的实际链接。

### 11.5 Social 页面的图标颜色

在 `social.html` 的 `<style>` 块中，每个平台的图标颜色由 CSS 类控制：

```css
.social-card-icon.github { background: #24292e; }
.social-card-icon.email { background: var(--accent); }
.social-card-icon.linkedin { background: #0a66c2; }
.social-card-icon.zhihu { background: #0066ff; }
.social-card-icon.bilibili { background: #fb7299; }
.social-card-icon.wechat { background: #07c160; }
.social-card-icon.csdn { background: #fc5531; }
.social-card-icon.scholar { background: #4285f4; }
```

### 11.6 Social 页面的中英文切换

Social 页面和主页共享 `js/main.js`，所以中英文切换自动生效。所有带 `data-i18n` 属性的元素都会被翻译。如需修改翻译文字，在 `js/main.js` 的 `translations` 对象中搜索 `social_` 开头的键。

---

## 12. 如何替换头像和图片

### 图片要求

| 图片类型 | 建议尺寸 | 格式 | 存放位置 |
|---------|---------|------|---------|
| 头像 | 400×400（正方形） | JPG/PNG | `assets/images/profile.jpg` |
| 论文缩略图 | 320×200（16:10） | JPG/PNG | `assets/images/publications/` |
| 项目封面 | 600×400（3:2） | JPG/PNG | `assets/images/projects/` |
| 画廊照片 | 800×600（4:3） | JPG/PNG | `assets/images/gallery/` |
| 学校 Logo | 200×200（正方形） | PNG（透明背景） | `assets/images/logos/` |

### 替换方法

1. 准备好图片
2. 重命名为对应的文件名
3. 复制到对应的文件夹，覆盖原文件
4. 刷新浏览器

### 不放图片也行

网站内置了图片加载失败的兜底方案：头像显示名字缩写、论文显示文件图标、项目显示 emoji。所以不放图片网站也能正常显示。

---

## 13. 如何修改配色

打开 `css/theme.css`，搜索 `:root`，找到颜色变量定义。

### 主要颜色变量

```css
:root {
  /* 背景色 */
  --bg-primary: #fafafa;       /* 页面主背景 */
  --bg-secondary: #ffffff;     /* 卡片背景 */

  /* 文字色 */
  --text-primary: #1a1a1a;     /* 主文字 */
  --text-secondary: #555555;   /* 次要文字 */
  --text-tertiary: #999999;    /* 辅助文字 */

  /* 强调色（最重要！） */
  --accent: #1a56db;           /* 主强调色（深蓝） */
  --accent-teal: #0d9488;      /* 青色辅助 */
  --accent-amber: #d97706;     /* 琥珀色辅助 */
}
```

### 快速换色方案

**绿色学术风**：`--accent: #16a34a;` `--accent-hover: #15803d;`

**紫色学术风**：`--accent: #7c3aed;` `--accent-hover: #6d28d9;`

**红色学术风**：`--accent: #dc2626;` `--accent-hover: #b91c1c;`

### 暗色模式

暗色模式的颜色在 `css/theme.css` 中搜索 `[data-theme="dark"]` 即可找到并修改。

---

## 14. 导航栏与中英文切换系统

### 14.1 固定导航栏

网站顶部有一个**固定导航栏**，滚动时始终可见：

- 左侧：你的名字（点击回到主页顶部）
- 中间：各板块快速跳转链接
- 右侧：中英文切换按钮 🌐

导航栏在桌面端（>768px）水平显示所有链接，手机端自动收起为汉堡菜单 ☰。

### 14.2 修改导航栏

在 `index.html` 中搜索 `navbar-links`：

```html
<div class="navbar-links" id="navbar-links">
  <a href="#about" class="nav-link" data-i18n="nav_about">About</a>
  <a href="#education" class="nav-link" data-i18n="nav_education">Education</a>
  ...
  <a href="social.html" class="nav-link" data-i18n="nav_social">Social</a>
</div>
```

- **主页板块链接**用 `#板块id`（如 `#about`、`#publications`）
- **Social 链接**指向 `social.html`（独立页面）
- **添加导航项**：复制一行，修改 `href` 和文字
- **删除导航项**：直接删掉对应的 `<a>` 标签

**注意**：`index.html` 和 `social.html` 各有自己的导航栏，**两个文件都要同步修改**。`social.html` 中的板块链接需要加 `index.html` 前缀（如 `index.html#about`）。

### 14.3 中英文切换系统

点击导航栏右侧的 🌐 按钮（显示"中文"或"EN"）即可切换语言。

**切换的内容包括：**
- 所有板块标题（About/关于、Education/教育背景、Research/科研经历 等）
- Hero 区域标语
- About 区域介绍文字
- 高亮框内容
- 科研经历职位名称和研究描述
- 论文筛选标签（All/全部、Conferences/会议论文 等）
- 技能分类标题（Languages/编程语言 等）
- Social 页面所有文本
- "Show More/展开更多" 按钮

**语言偏好自动保存**到浏览器，下次打开会记住你的选择。

### 14.4 修改翻译内容

打开 `js/main.js`，搜索 `translations`：

```javascript
const translations = {
  nav_about: { en: 'About', zh: '关于' },
  nav_education: { en: 'Education', zh: '教育背景' },
  nav_research: { en: 'Research', zh: '科研经历' },
  // ... 更多
};
```

- **修改翻译**：直接改 `en` 或 `zh` 后面的字符串
- **添加翻译**：添加 `key: { en: 'English', zh: '中文' }`
- **About 中英文**：在 `index.html` 搜索 `about-en` 和 `about-cn`
- **Hero 标语**：在 `js/main.js` 搜索 `heroTagline.innerHTML`
- **高亮框**：在 `js/main.js` 搜索 `highlightBox.innerHTML`

### 14.5 名言卡片

Hero 区域底部随机显示一条学术名言。修改方法：在 `js/main.js` 中搜索 `quotes`：

```javascript
const quotes = [
  { text: '名言内容', author: '作者名' },
  // 添加或修改...
];
```

---

## 15. 常见问题 FAQ

### Q1: 修改后浏览器没有变化？

按 `Ctrl + F5`（Windows）或 `Cmd + Shift + R`（Mac）强制刷新浏览器缓存。

### Q2: 中文显示乱码？

确保文件以 **UTF-8 编码**保存。在 VS Code 中，点击右下角的编码选择器，选择 "Save with Encoding" → "UTF-8"。

### Q3: GitHub Pages 页面空白？

**最常见原因**：仓库名不等于你的 GitHub 用户名。仓库名必须是 `你的用户名.github.io`。详见 [第 3.2 节](#32-页面空白问题排查)。

### Q4: 如何删除不需要的板块？

搜索对应的 `id`（如 `id="gallery"`），把整个 `<section ...>` 到 `</section>` 之间的内容删掉，同时删掉上面和下面的 `<hr class="section-divider">`。记得也删掉导航栏中对应的链接。

### Q5: 如何添加新的板块？

在任意两个 `<hr class="section-divider">` 之间插入：

```html
<section class="section reveal" id="your-section-id">
  <h2 class="section-title" data-i18n="nav_xxx">板块标题</h2>
  <!-- 你的内容 -->
</section>
```

然后在导航栏添加对应链接，在 `js/main.js` 的 `translations` 中添加翻译。

### Q6: 如何修改字体？

打开 `css/theme.css`，修改字体变量：

```css
--font-heading: 'Inter', 'Noto Sans SC', sans-serif;
--font-body: 'Inter', 'Noto Sans SC', sans-serif;
```

字体通过 Google Fonts 加载，在 `css/typography.css` 的 `@import` 中可以替换字体 URL。

### Q7: 网站在手机上显示正常吗？

是的，已做响应式设计。导航栏在手机端自动变为汉堡菜单，卡片网格自动变为单列。

### Q8: 论文状态从 Under Review 变成 Accepted 了怎么改？

搜索 `Under Review`，替换为 `Accepted`。更新 `pub-title` 中的链接和 `pub-buttons` 中的 PDF 链接。

### Q9: 如何添加网站访问统计？

推荐 [Umami](https://umami.is/)（开源免费）或 Google Analytics。注册后在 `index.html` 和 `social.html` 的 `<head>` 标签内添加统计代码。

### Q10: 如何备份网站？

如果用 Git 管理（推荐），所有历史版本都在 GitHub 上。也可以定期把整个文件夹压缩备份到网盘。

### Q11: Social 页面和主页的样式/脚本不同步怎么办？

两个页面共享 `css/style.css` 和 `js/main.js`，所以样式和功能是同步的。Social 页面特有的样式写在 `social.html` 的 `<style>` 标签内。如果你修改了 `css/` 或 `js/` 中的文件，两个页面都会同时更新。

### Q12: 如何把 Social 页面的某个平台移到主页？

在 `social.html` 中找到对应的 `social-card` 块，复制到 `index.html` 中你想要的位置（比如 Contact 区域），然后调整样式即可。
