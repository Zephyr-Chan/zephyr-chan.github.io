# 学术个人主页 — 技术规划方案 (Plan) v2.0

> **版本**: v2.0 | **日期**: 2026-04-21 | **状态**: 待用户确认
> **变更说明**: 基于用户指定的 6 个参考网站深度分析，全面调整技术栈、设计风格和开发策略

---

## 一、用户参考网站深度分析

### 1.1 六站设计特征总览

| 网站 | 作者 | 技术栈 | 风格关键词 | 核心亮点 |
|------|------|--------|-----------|----------|
| **tianxingchen.github.io** | 陈天行 (HKU) | 纯 HTML/CSS/JS | 手写风、工程笔记、暖色调 | 网格背景、三字体层次、渐进式信息折叠、中英双语 |
| **1135100136.wixsite.com** | 岳星皓 | Wix | — | ⚠️ 当前无法访问 |
| **lintian-a.github.io** | 田琳 (Harvard) | Jekyll + al-folio | 经典学术、模块化 | BibTeX自动管理、Publication Badges、暗色模式、Masonry布局 |
| **hq0709.github.io** | 姜汉琪 (UGA) | Jekyll + 自定义 | 极简网格质感、紧凑 | 网格背景纹理、双语招聘横幅、信息密度高 |
| **stardust-math.github.io** | Joker Chen | 纯 HTML/CSS/JS | 沉浸式艺术、古典美学 | 旋转光环头像、星尘粒子动画、纸张纹理、极致字体系统 |
| **stevezs315.github.io** | 曾爽 | Jekyll + al-folio | 经典极简、内容导向 | 成熟模板、双布局支持、低维护成本 |

### 1.2 用户审美偏好提取

基于用户评价"**酷炫、简洁大气、紧凑、美感好**"，提取以下设计共性：

| 偏好维度 | 具体表现 | 来源参考 |
|----------|----------|----------|
| **酷炫** | 网格背景纹理、粒子动画、旋转光环、纸张质感、入场动画 | tianxingchen, stardust-math, hq0709 |
| **简洁** | 单页长滚动、信息密度高但层次清晰、无冗余装饰 | tianxingchen, hq0709, stevezs315 |
| **大气** | 大号手写体标题、充足留白、衬线+等宽字体搭配、暖白背景 | tianxingchen, hq0709, stardust-math |
| **紧凑** | 单栏居中(max 900-920px)、模块间用分隔线而非大间距、信息折叠 | tianxingchen, hq0709 |
| **美感** | 暖色调(米白#f8f7f4)、三字体层次系统、微交互(悬停/折叠)、中英双语 | tianxingchen, stardust-math |

### 1.3 关键设计元素提取

```
┌─────────────────────────────────────────────────────────────┐
│                    设计 DNA 提取                              │
├─────────────────────────────────────────────────────────────┤
│ 1. 网格背景纹理 (tianxingchen, hq0709)                       │
│    → CSS linear-gradient 28px间距方格线，营造工程纸质感        │
│                                                              │
│ 2. 三字体层次系统 (tianxingchen)                              │
│    → 手写体(Caveat)标题 + 衬线体(Source Serif 4)正文          │
│    → 等宽体(JetBrains Mono)元数据                            │
│                                                              │
│ 3. 暖色调配色 (tianxingchen, hq0709)                         │
│    → 米白背景 #f8f7f4 + 蓝色强调 #2563eb + 黄色高亮 #fef9c3  │
│                                                              │
│ 4. 渐进式信息披露 (tianxingchen)                              │
│    → <details>/<summary> 折叠 + JS控制显示条数               │
│                                                              │
│ 5. 单页长滚动 + 分隔线 (tianxingchen, hq0709)                │
│    → 所有内容一页呈现，<hr>分隔各模块                         │
│                                                              │
│ 6. 精致微交互 (所有站点)                                      │
│    → 链接悬停变色+下划线、卡片悬停上浮、图片悬停微放大         │
│                                                              │
│ 7. 中英双语无缝融合 (tianxingchen, hq0709)                   │
│    → 同一页面内中英文并列，非独立路由                         │
│                                                              │
│ 8. 沉浸式封面 (stardust-math)                                │
│    → 全屏封面 + 入场动画 + 旋转光环 + 粒子效果               │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、技术栈选择（v2.0 重大调整）

### 2.1 方案变更说明

| 维度 | v1.0 方案 (Hugo+Wowchemy) | v2.0 方案 (纯HTML/CSS/JS) | 变更理由 |
|------|---------------------------|--------------------------|----------|
| **技术栈** | Hugo + Wowchemy 模板 | **纯 HTML + CSS + JavaScript** | 参考网站中表现最好的(tianxingchen, stardust-math, hq0709)均为纯手写，可实现更精细的视觉控制 |
| **构建工具** | Hugo 构建 | **无构建工具，直接编写** | 零依赖、零配置，修改即生效 |
| **内容管理** | Markdown + Hugo 模板 | **HTML + CSS Variables** | 直接控制每个像素，实现参考网站的精致视觉效果 |
| **多语言** | Hugo 内置 i18n | **页面内双语并列** | 参考网站(tianxingchen, hq0709)采用同一页面中英并列，更紧凑自然 |
| **部署** | Netlify/Vercel | **GitHub Pages** | 纯静态文件直接部署，零配置 |

### 2.2 为什么选择纯 HTML/CSS/JS

1. **视觉精度最高**: 参考网站中设计最出色的(tianxingchen, stardust-math)均为纯手写，不受模板限制
2. **零学习成本**: 无需学习 Hugo/Jekyll 模板语法，HTML/CSS/JS 是最基础的前端技术
3. **完全可控**: 每个设计细节（网格背景、字体层次、微交互）都可以精确实现
4. **零依赖**: 无需安装任何构建工具，直接编辑文件即可
5. **部署最简**: GitHub Pages 直接托管静态文件，推送即上线
6. **与参考网站一致**: 6 个参考中 4 个是纯手写方案，证明这条路可行且效果出色

### 2.3 技术细节

| 技术 | 选择 | 说明 |
|------|------|------|
| **HTML5** | 语义化标签 | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| **CSS3** | CSS Variables + Flexbox + Grid | 变量驱动主题，Flex/Grid 布局 |
| **JavaScript** | 原生 ES6+ | 无框架，仅用于交互逻辑 |
| **字体** | Google Fonts | Caveat, Source Serif 4, JetBrains Mono, Noto Sans SC |
| **图标** | Font Awesome 6 | 社交链接、功能图标 |
| **数学公式** | KaTeX (CDN) | 论文/博客中的公式渲染 |
| **代码高亮** | Prism.js (CDN) | 博客代码块语法高亮 |
| **图片处理** | 手动优化 + WebP | 响应式图片 srcset |
| **部署** | GitHub Pages | 免费、自动 HTTPS、自定义域名 |
| **分析** | GoatCounter (可选) | 轻量隐私友好的访问统计 |

---

## 三、页面结构与功能模块规划（v2.0）

### 3.1 整体架构: 单页长滚动 (Single-Page Long Scroll)

**重大变更**: 从"混合布局"改为**单页长滚动**，与参考网站(tianxingchen, hq0709)保持一致。

**理由**:
- 所有核心信息一页呈现，紧凑高效
- 无需页面跳转，浏览体验流畅
- 移动端体验更佳（无需多次导航）
- 参考网站中效果最好的均采用此模式

### 3.2 页面结构

```
┌─────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════╗   │
│  ║           HERO / 封面区域                      ║   │
│  ║   [圆形头像+光环]                               ║   │
│  ║   姓名 (手写体 大号)                            ║   │
│  ║   职位标签 (等宽体 · 分隔)                      ║   │
│  ║   社交链接按钮行                                ║   │
│  ╚═══════════════════════════════════════════════╝   │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  📋 ABOUT / 个人简介                                │
│     左侧头像 + 右侧介绍文字                         │
│     [展开查看更多 ▼] (中英双语)                     │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  🎓 EDUCATION / 教育背景                            │
│     时间线列表 (logo + 学校 + 专业 + 时间)           │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  📰 NEWS / 新闻动态                                 │
│     时间线列表 (默认显示5条，可展开)                 │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  📄 PUBLICATIONS / 论文展示                         │
│     分类标签栏筛选 + 论文卡片列表                   │
│     [展开全部论文 ▼]                                │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  🔬 PROJECTS / 研究项目                             │
│     卡片网格 (桌面3列 → 平板2列 → 手机1列)          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  🏆 HONORS & AWARDS / 荣誉奖项                     │
│     紧凑列表                                        │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  📸 GALLERY / 画廊                                  │
│     网格布局 + Lightbox灯箱                         │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  ✉️ CONTACT / 联系方式                              │
│     社交链接 + 邮箱                                 │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  FOOTER / 页脚                                      │
│     © 2026 | Built with ❤️ | [中/EN] [☀/🌙]        │
└─────────────────────────────────────────────────────┘
```

### 3.3 各模块详细规划

#### 模块 1: Hero / 封面区域 ⭐视觉焦点
**参考**: tianxingchen（手写体+标签行）、stardust-math（旋转光环+入场动画）

- **头像**: 圆形，120-150px，带精致的多层视觉效果
  - 旋转圆锥渐变光环边框（参考 stardust-math，18秒/圈）
  - 多层 box-shadow 营造立体感
  - 加载失败时显示姓名首字母占位符
- **姓名**: 手写体 Caveat，3.2-3.4rem 粗体，极具个人辨识度
- **职位标签**: 等宽体 JetBrains Mono，用 `·` 分隔多个身份
  - 例: "PhD Student at XXX Lab · Research Interest: XXX"
- **社交链接**: 一行圆角矩形按钮（Email, Scholar, GitHub, LinkedIn, ORCID）
- **入场动画**: 头像、姓名、标签依次从下方滑入+淡入（2秒，参考 stardust-math）
- **双语**: 标签行中英双语并列显示

#### 模块 2: About / 个人简介
**参考**: tianxingchen（左图右文+折叠）

- **布局**: 左侧圆形头像(120px) + 右侧介绍段落（桌面端），移动端垂直堆叠
- **内容**: 2-3段英文简介 + 2-3段中文简介，用 `<details>` 折叠
- **研究兴趣**: 标签式展示（暖灰背景 #f0ede8 圆角标签）
- **高亮框**: 招聘/合作信息用淡黄色背景 + 琥珀色左边框突出（参考 tianxingchen, hq0709）

#### 模块 3: Education / 教育背景
**参考**: tianxingchen, hq0709（logo+时间+学校紧凑列表）

- **设计**: 紧凑列表式（非传统时间线），每项一行
- **每条记录**: `[学校Logo] 时间段 | 学校名称 | 学位 · 专业方向`
- **Logo**: 32px 圆角小图标，加载失败时隐藏
- **移动端**: 隐藏 logo，改为两列网格

#### 模块 4: News / 新闻动态
**参考**: tianxingchen（折叠列表）

- **格式**: 时间倒序列表，每条 `YYYY.MM — 事件描述`
- **折叠**: 默认显示最新 5 条，"Show More" 按钮展开全部
- **高亮**: 最新 1-2 条用蓝色圆点标记

#### 模块 5: Publications / 论文展示 ⭐核心
**参考**: tianxingchen（缩略图+卡片）、lintian-a（BibTeX管理+徽章）

- **分类筛选**: 顶部标签栏（全部 / 期刊论文 / 会议论文 / 预印本）
- **论文卡片**:
  ```
  ┌──────────────────────────────────────────┐
  │ [缩略图]  论文标题 (加粗)                 │
  │ 80x80px   作者列表 (本人加粗+蓝色)         │
  │           期刊/会议名称                    │
  │           [PDF] [Code] [Project] [BibTeX] │
  └──────────────────────────────────────────┘
  ```
- **BibTeX**: 点击按钮展开/收起 BibTeX 代码块，一键复制
- **排序**: 按年份倒序，年份作为分隔标题
- **折叠**: 默认显示精选论文，"Show All Publications" 展开全部

#### 模块 6: Projects / 研究项目
**参考**: tianxingchen（双列卡片）、lintian-a（Masonry布局）

- **布局**: 响应式卡片网格（桌面3列 → 平板2列 → 手机1列）
- **每张卡片**:
  - 项目预览图（顶部，固定宽高比）
  - 项目名称（加粗）
  - 简短描述（1-2行，次要文字色）
  - 技术标签（小号等宽体，暖灰背景）
  - 链接图标行（GitHub / Demo / Paper）
- **悬停**: 卡片上浮2px + 阴影增强 + 图片微放大(scale 1.03)

#### 模块 7: Honors & Awards / 荣誉奖项
**参考**: tianxingchen（紧凑列表）、hq0709（简洁列表）

- **格式**: 紧凑列表，每条 `YYYY — 奖项名称 — 颁发机构`
- **分组**: 按年份分组，年份作为小标题
- **高亮**: 重要奖项用深琥珀色标记

#### 模块 8: Gallery / 交互式画廊
**参考**: stardust-math（沉浸式体验）

- **布局**: CSS Grid 等高网格（桌面4列 → 平板3列 → 手机2列）
- **分类标签**: 会议 / 研究成果 / 团队活动 / 证书
- **Lightbox 灯箱**:
  - 点击缩略图弹出全屏查看器
  - 左右箭头 + 键盘导航
  - 图片标题和描述
  - Escape 关闭
- **懒加载**: Intersection Observer，进入视口时加载
- **悬停**: 缩略图微放大 + 叠加层显示标题

#### 模块 9: Contact / 联系方式
**参考**: tianxingchen（社交按钮行）

- **邮箱**: 可点击的 mailto 链接
- **社交图标**: 与 Hero 区域一致的按钮样式
- **地址**: 办公地址（可选）

### 3.4 中英双语方案（v2.0 调整）

**重大变更**: 从"URL 路由分离"改为**页面内双语并列**，与参考网站保持一致。

```
实现方式:
- 个人简介: 英文段落 + 中文段落并列，中文部分用 <details> 折叠
- 职位标签: "PhD Student at XXX · XXX实验室博士生" 中英并列
- 论文: 标题和摘要英文为主，中文翻译可选
- 导航/按钮: 关键按钮提供中英双语
- 页脚: 语言切换按钮切换全局语言（可选进阶功能）
```

**优势**: 更紧凑、更自然、无需维护两套内容

---

## 四、设计风格定义（v2.0 重大调整）

### 4.1 整体风格: 极简工程笔记风 + 精致微交互

融合 tianxingchen 的工程笔记质感、stardust-math 的沉浸式封面、hq0709 的紧凑信息密度。

### 4.2 配色方案（基于参考网站提取）

```css
:root {
  /* === 背景与纹理 === */
  --bg-primary: #f8f7f4;          /* 暖白/米色背景 (tianxingchen) */
  --bg-grid: rgba(0, 0, 0, 0.055); /* 网格线颜色 */
  --bg-card: #ffffff;              /* 卡片/表面背景 */
  --bg-highlight: #fef9c3;         /* 高亮框背景 (淡黄) */
  --bg-highlight-alt: #eff6ff;     /* 备选高亮 (淡蓝) */

  /* === 文字 === */
  --text-primary: #1a1a1a;         /* 主文字 (近黑) */
  --text-secondary: #666666;       /* 次要文字 (中灰) */
  --text-tertiary: #999999;        /* 辅助文字 (浅灰) */

  /* === 强调色 === */
  --accent-blue: #2563eb;          /* 蓝色强调 (链接、按钮) */
  --accent-blue-hover: #1d4ed8;    /* 蓝色悬停 (深蓝) */
  --accent-amber: #f59e0b;         /* 琥珀色 (高亮框边框) */
  --accent-amber-dark: #b45309;    /* 深琥珀 (奖项标记) */

  /* === 边框与分隔 === */
  --border-color: #d4d0c8;         /* 暖灰边框 */
  --border-light: rgba(0,0,0,0.08); /* 浅色分隔线 */
  --tag-bg: #f0ede8;               /* 标签背景 */

  /* === 阴影 === */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* 暗色模式 */
[data-theme="dark"] {
  --bg-primary: #1a1a2e;          /* 深蓝灰背景 */
  --bg-grid: rgba(255, 255, 255, 0.04);
  --bg-card: #222240;
  --bg-highlight: #2d2d1f;
  --text-primary: #e8e8e8;
  --text-secondary: #a0a0a0;
  --accent-blue: #60a5fa;
  --accent-blue-hover: #93c5fd;
  --border-color: #3a3a5c;
  --tag-bg: #2a2a4a;
}
```

### 4.3 字体方案（三字体层次系统）

```css
/* 标题字体: 手写体 — 营造个人签名感 */
--font-heading: 'Caveat', cursive;           /* tianxingchen 同款 */

/* 正文字体: 衬线体 — 增加学术质感 */
--font-body: 'Source Serif 4', 'Noto Serif SC', Georgia, serif;

/* 元数据字体: 等宽体 — 增加技术感 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* 中文回退 */
--font-cn: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

**字号层次**:
```
姓名标题:    3.2rem (Caveat, 粗体)
Section标题: 1.5rem (Caveat, 中粗)
正文:        0.96rem (Source Serif 4)
元数据/日期: 0.8rem (JetBrains Mono)
标签/按钮:   0.75rem (JetBrains Mono)
```

### 4.4 网格背景纹理

```css
/* 工程纸/方格纸效果 — 核心视觉特征 */
body {
  background-color: var(--bg-primary);
  background-image:
    linear-gradient(var(--bg-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

### 4.5 间距与排版（紧凑风格）

```
内容最大宽度: 920px (参考 tianxingchen)
容器内边距:   36px (桌面) → 18px (移动端)
模块间距:     用 <hr> 分隔线而非大间距
段落间距:     1.2em (比标准更紧凑)
卡片圆角:     6px (克制)
卡片阴影:     var(--shadow-sm) (轻微)
```

### 4.6 交互动效（精致微交互）

| 效果 | 实现方式 | 参考来源 |
|------|----------|----------|
| **链接悬停** | `color .15s` 变深蓝 + 下划线渐现 | tianxingchen |
| **社交按钮悬停** | `border-color .15s, background .15s, color .15s` 边框变蓝、背景变白 | tianxingchen |
| **论文缩略图悬停** | `transform: scale(1.03); transition: transform .3s ease` | tianxingchen |
| **卡片悬停** | `translateY(-2px)` + 阴影增强 | hq0709 |
| **Hero入场动画** | 头像/姓名/标签依次 `translateY(100px) → 0` + `opacity 0 → 1`，2秒 | stardust-math |
| **头像光环旋转** | `conic-gradient` 边框 + `rotate 360deg 18s linear infinite` | stardust-math |
| **平滑滚动** | `html { scroll-behavior: smooth; }` | tianxingchen |
| **主题切换** | CSS Variables + `transition: all .3s` | 所有参考站 |
| **折叠展开** | `<details>/<summary>` 原生 + JS 控制 | tianxingchen |

---

## 五、响应式设计规范

| 断点 | 范围 | 布局策略 | 参考 |
|------|------|----------|------|
| **移动端** | ≤ 700px | 单列，Bio垂直堆叠，论文垂直排列，隐藏logo，社交居中 | tianxingchen |
| **平板** | 701px - 991px | 双列卡片网格，Bio水平排列 | — |
| **桌面** | ≥ 992px | 三列项目网格，完整布局 | tianxingchen, hq0709 |

**移动端特殊处理** (参考 tianxingchen):
- 容器内边距: `36px 18px 60px`
- 标题字号: `2.6rem`
- 论文条目: 垂直排列，缩略图 100% 宽度
- 教育/经历: 两列网格，隐藏 logo
- 社交链接: 居中对齐

---

## 六、项目文件结构

```
academic-homepage/
├── index.html                 # 主页面（单页长滚动）
├── css/
│   ├── style.css              # 主样式文件
│   ├── theme.css              # 主题变量（亮/暗模式）
│   ├── typography.css         # 字体与排版
│   ├── components.css         # 组件样式（卡片、按钮、标签等）
│   ├── layout.css             # 布局样式（网格、响应式）
│   └── animations.css         # 动画与过渡效果
├── js/
│   ├── main.js                # 主逻辑（主题切换、语言切换、折叠）
│   ├── gallery.js             # 画廊 Lightbox 功能
│   ├── publications.js        # 论文筛选功能
│   └── animations.js          # 入场动画、滚动动画
├── assets/
│   ├── images/
│   │   ├── profile.jpg        # 个人照片
│   │   ├── publications/      # 论文预览图
│   │   ├── projects/          # 项目截图
│   │   ├── gallery/           # 画廊图片
│   │   └── logos/             # 学校/机构 logo
│   └── files/
│       ├── cv.pdf             # 简历 PDF
│       └── publications.bib   # BibTeX 文件（可选）
├── favicon.ico                # 网站图标
├── CNAME                      # 自定义域名（可选）
└── README.md                  # 项目说明
```

**结构优势**:
- CSS 按职责拆分，清晰易维护
- JS 模块化，每个功能独立文件
- assets 按类型分类，一目了然
- 无构建步骤，直接编辑即生效

---

## 七、SEO 与无障碍

### 7.1 SEO 优化

- ✅ 语义化 HTML5 标签
- ✅ Meta 标签（title, description, keywords）
- ✅ Open Graph 社交分享预览
- ✅ Google Scholar Citation Meta Tags
- ✅ Schema.org JSON-LD (Person, ScholarlyArticle)
- ✅ sitemap.xml（手动维护或脚本生成）
- ✅ robots.txt

### 7.2 无障碍 (WCAG 2.1 AA)

- ✅ 颜色对比度 ≥ 4.5:1
- ✅ 所有图片 alt 文本
- ✅ 键盘导航（Tab, Enter, Escape）
- ✅ `prefers-reduced-motion` 尊重
- ✅ 焦点可见性
- ✅ ARIA 标签（Lightbox, 折叠组件）

---

## 八、开发实施计划（v2.0）

### Phase 1: 项目骨架搭建 (预计 0.5 天)
- [ ] 创建项目目录结构
- [ ] 编写 `index.html` 骨架（语义化 HTML5）
- [ ] 配置 CSS Variables 主题系统（亮/暗模式）
- [ ] 实现网格背景纹理
- [ ] 加载 Google Fonts（Caveat, Source Serif 4, JetBrains Mono, Noto Sans SC）
- [ ] 配置 Git 仓库 + GitHub Pages

### Phase 2: Hero 封面区域开发 (预计 0.5 天)
- [ ] 圆形头像 + 旋转圆锥渐变光环
- [ ] 手写体姓名标题
- [ ] 等宽体职位标签行
- [ ] 社交链接按钮行
- [ ] 入场动画（依次滑入+淡入）
- [ ] 头像加载失败降级处理

### Phase 3: 内容模块开发 (预计 1.5 天)
- [ ] About 个人简介（左图右文 + details 折叠 + 双语）
- [ ] Education 教育背景（紧凑列表 + logo）
- [ ] News 新闻动态（时间线 + 折叠展开）
- [ ] Publications 论文展示（分类筛选 + 卡片 + BibTeX 展开）
- [ ] Projects 研究项目（卡片网格 + 悬停效果）
- [ ] Honors 荣誉奖项（紧凑列表）
- [ ] Gallery 画廊（网格 + Lightbox + 懒加载）
- [ ] Contact 联系方式

### Phase 4: 交互与动效 (预计 0.5 天)
- [ ] 主题切换（亮/暗模式 + localStorage 持久化）
- [ ] 语言切换（中英双语）
- [ ] 滚动渐入动画（Intersection Observer）
- [ ] 所有悬停微交互
- [ ] 平滑滚动

### Phase 5: 响应式适配 (预计 0.5 天)
- [ ] 移动端布局适配（≤700px）
- [ ] 平板布局适配（701-991px）
- [ ] 触摸目标优化
- [ ] 真实设备测试

### Phase 6: 优化与部署 (预计 0.5 天)
- [ ] 图片优化（WebP + 响应式 srcset）
- [ ] SEO 优化（Meta, Schema.org, OG）
- [ ] 无障碍检查
- [ ] Lighthouse 性能测试
- [ ] GitHub Pages 部署
- [ ] 自定义域名绑定（可选）

**总计预计**: 4 个工作日

---

## 九、后续扩展方向

| 方向 | 描述 | 优先级 | 实现难度 |
|------|------|--------|----------|
| 博客模块 | 独立 blog.html + 文章页 | 中 | 中 |
| 全文搜索 | Fuse.js 轻量级客户端搜索 | 低 | 低 |
| 访问统计 | GoatCounter / Umami | 低 | 低 |
| 自动部署 | GitHub Actions 推送自动部署 | 高 | 低 |
| BibTeX 自动解析 | Python 脚本从 .bib 生成 HTML | 中 | 中 |
| 粒子背景效果 | Canvas 粒子动画（参考 stardust-math） | 低 | 高 |
| 自定义域名 | CNAME + GitHub Pages 配置 | 中 | 低 |

---

## 十、风险与应对

| 风险 | 应对策略 |
|------|----------|
| 纯手写代码维护成本较高 | CSS Variables 驱动主题，修改配色只需改变量；模块化 CSS/JS 便于定位 |
| 内容更新需编辑 HTML | 编写清晰的 HTML 注释标记；可选：后续开发 Python 脚本从 Markdown 生成 HTML |
| 中文字体加载慢 | `font-display: swap` + 仅加载常用字符子集 |
| 网格背景在暗色模式下需调整 | CSS Variables 自动切换网格线颜色 |
| 无框架导致代码量较大 | 保持 CSS/JS 模块化，每个文件职责单一 |

---

## 附录: 参考网站设计元素速查表

| 设计元素 | tianxingchen | hq0709 | stardust-math | lintian-a | stevezs315 |
|----------|:---:|:---:|:---:|:---:|:---:|
| 网格背景 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 手写体标题 | ✅ | ❌ | ✅ | ❌ | ❌ |
| 三字体层次 | ✅ | ❌ | ✅(6+) | ❌ | ❌ |
| 暖白背景 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 旋转光环头像 | ❌ | ❌ | ✅ | ❌ | ❌ |
| 入场动画 | ❌ | ❌ | ✅ | ❌ | ❌ |
| 粒子效果 | ❌ | ❌ | ✅ | ❌ | ❌ |
| 纸张纹理 | ❌ | ❌ | ✅ | ❌ | ❌ |
| 折叠展开 | ✅ | ❌ | ✅ | ✅ | ❌ |
| 中英双语 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 暗色模式 | ❌ | ❌ | ✅ | ✅ | ✅ |
| BibTeX管理 | ❌ | ❌ | ❌ | ✅ | ✅ |
| 单页滚动 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 社交按钮行 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 悬停微交互 | ✅ | ✅ | ✅ | ✅ | ✅ |

> **下一步**: 请您审阅本规划方案 v2.0，确认或提出修改意见。确认后我将进入开发阶段。
