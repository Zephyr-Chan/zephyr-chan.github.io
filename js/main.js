/* ============================================
   Main v3 — 核心逻辑
   滚动进度条、鼠标光效、主题切换、新闻折叠
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Active nav link highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --- Random Quote ---
  const quotes = [
    { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { text: 'Research is to see what everybody else has seen, and to think what nobody else has thought.', author: 'Albert Szent-Györgyi' },
    { text: 'Stay hungry, stay foolish.', author: 'Stewart Brand' },
    { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
    { text: 'Science is organized knowledge. Wisdom is organized life.', author: 'Immanuel Kant' },
    { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteText = document.getElementById('hero-quote-text');
  const quoteAuthor = document.getElementById('hero-quote-author');
  if (quoteText) quoteText.textContent = randomQuote.text;
  if (quoteAuthor) quoteAuthor.textContent = '— ' + randomQuote.author;

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  // --- Cursor Glow Effect ---
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  // Smooth cursor follow with requestAnimationFrame
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // --- Back to Top ---
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Floating Particles ---
  createParticles();

});

// --- Floating Particles ---
function createParticles() {
  const colors = ['var(--accent)', 'var(--accent-teal)', 'var(--accent-amber)'];
  const count = 8;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
    particle.style.animationDelay = (Math.random() * 15) + 's';
    particle.style.opacity = (Math.random() * 0.1 + 0.05).toString();
    document.body.appendChild(particle);
  }
}

// --- News Toggle ---
function toggleNews() {
  const hiddenItems = document.querySelectorAll('.news-hidden');
  const btn = document.getElementById('news-toggle');
  const isHidden = hiddenItems[0] && hiddenItems[0].style.display === 'none';

  hiddenItems.forEach(item => {
    item.style.display = isHidden ? 'flex' : 'none';
  });

  btn.textContent = isHidden
    ? (currentLang === 'en' ? 'Show Less ▲' : '收起 ▲')
    : (currentLang === 'en' ? 'Show More ▼' : '展开更多 ▼');
}

// --- Mobile Menu Toggle ---
function toggleMobileMenu() {
  const links = document.getElementById('navbar-links');
  links.classList.toggle('open');
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navbar-links').classList.remove('open');
    });
  });
});

// --- Language Toggle ---
let currentLang = localStorage.getItem('lang') || 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('lang', currentLang);
  applyLanguage();
}

function applyLanguage() {
  const label = document.getElementById('lang-label');
  const aboutEn = document.getElementById('about-en');
  const aboutCn = document.getElementById('about-cn');
  const heroTagline = document.getElementById('hero-tagline');
  const highlightBox = document.getElementById('highlight-box');

  // Update language toggle button label
  if (label) {
    label.textContent = currentLang === 'en' ? '中文' : 'EN';
  }

  // Toggle About content
  if (aboutEn && aboutCn) {
    if (currentLang === 'zh') {
      aboutEn.style.display = 'none';
      aboutCn.style.display = 'block';
    } else {
      aboutEn.style.display = 'block';
      aboutCn.style.display = 'none';
    }
  }

  // Update hero tagline
  if (heroTagline) {
    if (currentLang === 'zh') {
      heroTagline.innerHTML = '<span class="tagline-item">五邑大学 本科生</span><span class="tagline-sep">|</span><span class="tagline-item">软件工程</span><span class="tagline-sep">|</span><span class="tagline-item tagline-accent">研究方向：AI Agent、LLM、BCI & Diffusion Model</span>';
    } else {
      heroTagline.innerHTML = '<span class="tagline-item">Undergraduate at <a href="https://www.wyu.edu.cn">Wuyi University</a></span><span class="tagline-sep">|</span><span class="tagline-item">Software Engineering</span><span class="tagline-sep">|</span><span class="tagline-item tagline-accent">Research: AI Agent, LLM, BCI & Diffusion Model</span>';
    }
  }

  // Update highlight box
  if (highlightBox) {
    if (currentLang === 'zh') {
      highlightBox.innerHTML = '<strong>🎯 未来计划：</strong>保持对计算机科学和人工智能的纯粹好奇心，深入探索感兴趣的研究方向。希望能在科研中找到真正热爱的问题，与志同道合的伙伴一起做出有意义的贡献。同时也期待在算法竞赛中继续挑战自我，享受解题的乐趣。';
    } else {
      highlightBox.innerHTML = '<strong>🎯 Future Plan:</strong> Maintain a genuine curiosity for computer science and AI, and dive deep into research directions I am truly passionate about. I look forward to finding problems I genuinely love and making meaningful contributions alongside like-minded peers. I also look forward to continuing to challenge myself in competitive programming and enjoying the thrill of problem-solving.';
    }
  }

  // Update nav titles with data-i18n
  const translations = {
    nav_about: { en: 'About', zh: '关于' },
    nav_education: { en: 'Education', zh: '教育背景' },
    nav_research: { en: 'Research', zh: '科研经历' },
    nav_news: { en: 'News', zh: '新闻动态' },
    nav_publications: { en: 'Publications', zh: '学术论文' },
    nav_projects: { en: 'Projects', zh: '研究项目' },
    nav_honors: { en: 'Honors & Awards', zh: '荣誉奖项' },
    nav_gallery: { en: 'Gallery', zh: '相册' },
    nav_contact: { en: 'Contact', zh: '联系方式' },
    nav_social: { en: 'Social', zh: '社交' },
    nav_skills: { en: 'Skills', zh: '技术栈' },
    skill_lang: { en: 'Languages', zh: '编程语言' },
    skill_fw: { en: 'Frameworks', zh: '框架工具' },
    skill_ml: { en: 'ML / DL', zh: '机器学习' },
    skill_tools: { en: 'Tools', zh: '工具' },
    filter_all: { en: 'All', zh: '全部' },
    filter_conf: { en: 'Conferences', zh: '会议论文' },
    filter_journal: { en: 'Journals', zh: '期刊论文' },
    filter_preprint: { en: 'Preprints', zh: '预印本' },
    show_more: { en: 'Show More ▼', zh: '展开更多 ▼' },
    research_role1: { en: 'Research Assistant', zh: '科研助理' },
    research_role2: { en: 'Research Assistant', zh: '科研助理' },
    research_org1: { en: '<a href="https://www.wyu.edu.cn">Wuyi University</a> · School of Electronic and Information Engineering', zh: '<a href="https://www.wyu.edu.cn">五邑大学</a> · 电子与信息工程学院' },
    research_org2: { en: '<a href="https://www.wyu.edu.cn">Wuyi University</a> · School of Electronic and Information Engineering', zh: '<a href="https://www.wyu.edu.cn">五邑大学</a> · 电子与信息工程学院' },
    edu_org: { en: '<a href="https://www.wyu.edu.cn">Wuyi University</a> · School of Electronic and Information Engineering', zh: '<a href="https://www.wyu.edu.cn">五邑大学</a> · 电子与信息工程学院' },
    contact_location: { en: 'Wuyi University, School of Electronic and Information Engineering', zh: '五邑大学 电子与信息工程学院' },
    research_desc1_1: { en: 'Developing a multimodal data-driven automatic treatment planning Agent for radiotherapy, integrating multi-source clinical data (CT, dose, contours, protocols) to automate plan generation with clinical decision-support capabilities.', zh: '开发多模态数据驱动的放疗自动计划设计Agent，整合CT影像、剂量分布、OAR勾画及临床方案等多源数据，实现放疗计划的自动生成与临床决策支持' },
    research_desc2_1: { en: 'Developing a topology-aware and mask-pretrained EEG foundation model to improve decoding accuracy and cross-subject generalization in brain-computer interface systems.', zh: '开发基于拓扑感知与掩码预训练的脑电基础模型，提升脑电解码精度与跨被试泛化能力' },
    project1_title: { en: 'Multimodal Data-Driven Radiotherapy Auto-Planning Agent', zh: '多模态数据驱动的放疗自动计划设计Agent' },
    project1_badge: { en: 'Provincial Innovation Project', zh: '省级大创项目立项' },
    project1_desc: { en: 'A multimodal data-driven Agent that integrates multi-source clinical data (CT, dose, OAR contours, protocols) to automate radiotherapy plan generation, featuring intelligent clinical decision-support.', zh: '多模态数据驱动的Agent，整合CT影像、剂量分布、OAR勾画及临床方案等多源数据，实现放疗计划的自动生成与智能临床决策支持。' },
    project2_title: { en: 'Topology-Aware & Mask-Pretrained EEG Foundation Model', zh: '基于拓扑感知与掩码预训练的脑电基础模型' },
    project2_badge: { en: 'National Innovation Project', zh: '国家级大创项目立项' },
    project2_desc: { en: 'A topology-aware and mask-pretrained EEG foundation model that leverages brain network topology and self-supervised mask pretraining to improve decoding accuracy and cross-subject generalization.', zh: '基于拓扑感知与掩码预训练的脑电基础模型，利用脑网络拓扑结构与自监督掩码预训练，提升解码精度与跨被试泛化能力。' },
    project3_title: { en: 'WYU Feiyue Handbook', zh: '邑大飞跃手册' },
    project3_badge: { en: 'Building', zh: '构建中' },
    project3_desc: { en: 'A comprehensive freshman guide for Wuyi University, covering campus life, academic planning, and course selection strategies.', zh: '五邑大学新生入学指南，涵盖校园生活、学业规划、选课攻略等实用信息。' },
    project4_title: { en: 'AI Frontier Exploration', zh: 'AI 前沿探索' },
    project4_desc: { en: 'Reproducing MedGPT, exploring Diffusion image generation and VLM multimodal understanding, tracking cutting-edge AI directions.', zh: '复现 MedGPT，探索 Diffusion 图像生成与 VLM 多模态理解，跟踪 AI 前沿方向。' },
    social_title: { en: 'Connect With Me', zh: '与我联系' },
    social_subtitle: { en: 'Find me across the web', zh: '在互联网上找到我' },
    social_github_desc: { en: 'Code repositories and open source projects', zh: '代码仓库与开源项目' },
    social_linkedin_desc: { en: 'Professional profile and network', zh: '职业档案与人脉网络' },
    social_zhihu_name: { en: 'Zhihu', zh: '知乎' },
    social_zhihu_desc: { en: 'Knowledge sharing and Q&A', zh: '知识分享与问答社区' },
    social_bilibili_name: { en: 'Bilibili', zh: '哔哩哔哩' },
    social_bilibili_desc: { en: 'Video content and tutorials', zh: '视频内容与教程' },
    social_wechat_name: { en: 'WeChat', zh: '微信' },
    social_wechat_desc: { en: 'Scan QR code to add', zh: '扫描二维码添加' },
    social_csdn_desc: { en: 'Technical blog posts', zh: '技术博客文章' },
    social_scholar_desc: { en: 'Academic publications and citations', zh: '学术论文与引用' },
    social_visit: { en: 'Visit', zh: '访问' },
    social_send: { en: 'Send', zh: '发送' },
    social_qr: { en: 'QR Code', zh: '二维码' },
    web_presence_title: { en: 'Find Me Online', zh: '学术主页' },
    nav_visitor_map: { en: 'Visitor Map', zh: '访客地图' },
    nav_visitor_stats: { en: 'Visitor Stats', zh: '访客统计' },
    visitor_map_note: { en: 'Real-time visitor locations tracked by ClustrMaps', zh: '由 ClustrMaps 追踪的实时访客地理位置' },
    nav_algorithms: { en: 'Algorithms', zh: '算法' },
    nav_resources: { en: 'Resources', zh: '资源' },
    nav_cv: { en: 'CV', zh: '简历' },
    nav_friend_links: { en: 'Friend Links', zh: '友链' },
    friend_silencer76: { en: 'Code builds the world, algorithms change the future', zh: '代码构建世界，算法改变未来' },
    friend_add_link: { en: 'Add Your Link', zh: '交换友链' },
    friend_add_desc: { en: 'Want to exchange links? Contact me!', zh: '想要交换友链？联系我！' },
    nav_contact_form: { en: 'Send Me a Message', zh: '给我留言' },
    form_name: { en: 'Name', zh: '姓名' },
    form_email: { en: 'Email', zh: '邮箱' },
    form_subject: { en: 'Subject', zh: '主题' },
    form_message: { en: 'Message', zh: '留言内容' },
    form_send_btn: { en: 'Send Message', zh: '发送留言' },
    algorithms_title: { en: 'Algorithm Arena', zh: '算法竞技场' },
    algorithms_subtitle: { en: 'Sharpening problem-solving skills through competitive programming', zh: '通过竞赛编程磨砺问题解决能力' },
    algorithms_coming_soon: { en: 'Detailed algorithm learning content is coming soon. Stay tuned!', zh: '详细的算法学习内容即将上线，敬请期待！' },
    algorithms_competition_title: { en: 'Competition History', zh: '竞赛历程' },
    algorithms_competition_placeholder: { en: 'Competition records will be displayed here...', zh: '竞赛记录将在此展示...' },
    cv_title: { en: 'Curriculum Vitae', zh: '个人简历' },
    cv_subtitle: { en: 'Academic and professional documents', zh: '学术与职业文档' },
    cv_resume_title: { en: 'Resume / CV', zh: '个人简历' },
    cv_resume_desc: { en: 'My academic resume including education, research experience, and publications', zh: '包含教育背景、科研经历和论文发表的学术简历' },
    cv_transcript_title: { en: 'Academic Transcript', zh: '成绩单' },
    cv_transcript_desc: { en: 'Official academic transcript from Wuyi University', zh: '五邑大学官方成绩单' },
    cv_preview: { en: 'Preview', zh: '预览' },
    cv_download: { en: 'Download', zh: '下载' },
    cv_views: { en: 'views', zh: '次浏览' },
    cv_intro: { en: 'Welcome to my document center. Here you can preview and download my academic resume and official transcript. Feel free to reach out if you need any additional information.', zh: '欢迎来到我的文档中心。在这里你可以预览和下载我的学术简历和官方成绩单。如需更多信息，请随时联系我。' },
    cv_updated: { en: 'Updated', zh: '更新于' },
    cv_no_preview: { en: 'Click Preview to view the document', zh: '点击预览查看文档' },
    cv_tip: { en: 'Tip: Click Preview to view the document online, or click Download to save a copy. View counts are tracked server-side (all visitors combined).', zh: '提示：点击预览可在线查看文档，点击下载可保存副本。浏览次数为服务端统计（所有访客汇总）。' },
    form_attachment: { en: 'Attachment (optional)', zh: '附件（可选）' },
    form_attachment_hint: { en: 'Click to upload or drag a file here', zh: '点击上传或拖拽文件到此处' },
    resources_title: { en: 'Academic Resources', zh: '学术资源导航' },
    resources_subtitle: { en: 'Curated links for conferences, learning materials, and useful tools', zh: '会议截止时间、学习资料与实用工具的精选链接' },
    resources_deadlines: { en: 'Conference Deadlines', zh: '会议截止时间' },
    resources_learning: { en: 'Learning Resources', zh: '学习资料' },
    resources_links: { en: 'Useful Links', zh: '实用链接' },
    resource_ccf_desc: { en: 'CCF recommended conference submission deadlines', zh: 'CCF推荐会议投稿截止日期查询' },
    resource_ai_deadlines_desc: { en: 'AI/ML top conference deadlines', zh: 'AI/ML顶会截止日期汇总' },
    resource_all_deadlines_desc: { en: 'Global academic conference deadline tracker', zh: '全球学术会议截止日期追踪' },
    resource_wikicfp_desc: { en: 'Call for papers and conference info', zh: 'CFP征集与会议信息' },
    resource_dl_desc: { en: 'Deep learning textbooks and course resources', zh: '深度学习经典教材与课程资源' },
    resource_pr_desc: { en: 'Paper reading methods and tool recommendations', zh: '论文阅读方法与工具推荐' },
    resource_prog_desc: { en: 'Programming languages and competitive programming resources', zh: '编程语言与算法竞赛学习资源' },
    resource_tools_desc: { en: 'Research tools and productivity software', zh: '科研工具与效率软件推荐' },
    link_scholar_desc: { en: 'Academic search', zh: '学术搜索' },
    link_semantic_desc: { en: 'AI-powered academic search', zh: 'AI驱动学术搜索' },
    link_connected_desc: { en: 'Paper relationship graphs', zh: '论文关系图谱' },
    link_arxiv_desc: { en: 'Preprint paper repository', zh: '预印本论文库' },
    link_pwc_desc: { en: 'Papers and code', zh: '论文与代码' },
    algo_templates_vp_title: { en: 'Algorithm Templates & VP Notes', zh: '算法模板与VP记录' },
    algo_templates: { en: 'Algorithm Templates', zh: '算法模板' },
    algo_vp_notes: { en: 'VP Notes', zh: 'VP记录' },
    algo_empty_vp: { en: 'Contest VP writeups will be added here', zh: '比赛VP记录将在此处添加' },
    algo_dp_meta: { en: 'Classic dynamic programming templates', zh: '经典动态规划模板' },
    algo_graph_meta: { en: 'Shortest path, MST, etc.', zh: '最短路、最小生成树等' },
    algo_string_meta: { en: 'KMP, Aho-Corasick, etc.', zh: 'KMP、AC自动机等' },
    algo_math_meta: { en: 'Number theory, combinatorics, etc.', zh: '数论、组合数学等' },
    algo_ds_meta: { en: 'Segment tree, BIT, etc.', zh: '线段树、树状数组等' },
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][currentLang]) {
      const val = translations[key][currentLang];
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }
  });

  // Update Show Less text too
  const showMoreBtn = document.getElementById('news-toggle');
  if (showMoreBtn) {
    const isExpanded = showMoreBtn.textContent.includes('Less') || showMoreBtn.textContent.includes('收起');
    if (isExpanded) {
      showMoreBtn.textContent = currentLang === 'en' ? 'Show Less ▲' : '收起 ▲';
    }
  }

  // Update HTML lang attribute
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

  // Smooth transition
  document.body.style.opacity = '0.97';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
}

// Apply saved language on load
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
});

// --- Copy BibTeX ---
function copyBibtex(btn) {
  const block = btn.parentElement;
  const text = block.textContent.replace('Copy', '').trim();

  navigator.clipboard.writeText(text).then(() => {
    showCopyFeedback();
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopyFeedback();
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

function showCopyFeedback() {
  const feedback = document.getElementById('copy-feedback');
  feedback.classList.add('show');
  setTimeout(() => { feedback.classList.remove('show'); }, 1500);
}
