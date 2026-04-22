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
      highlightBox.innerHTML = '<strong>🎯 未来计划：</strong>保持对计算机科学和人工智能的纯粹好奇心，在MPhil阶段深入探索感兴趣的研究方向。希望能在科研中找到真正热爱的问题，与志同道合的伙伴一起做出有意义的贡献。同时也期待在算法竞赛中继续挑战自我，享受解题的乐趣。';
    } else {
      highlightBox.innerHTML = '<strong>🎯 Future Plan:</strong>Maintain a genuine curiosity for computer science and AI. During my MPhil studies, I hope to dive deep into research directions I am truly passionate about. I look forward to finding problems I genuinely love, and making meaningful contributions alongside like-minded peers. I also look forward to continuing to challenge myself in competitive programming and enjoying the thrill of problem-solving.';
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
    research_role3: { en: 'Research Assistant', zh: '科研助理' },
    research_desc1_1: { en: 'Developing a multimodal AI Agent for automated radiotherapy treatment planning based on Large Language Models, building an intelligent system with clinical decision-making capabilities', zh: '基于大语言模型开发多模态放疗自动计划AI Agent，构建具备临床决策能力的智能系统以优化放疗方案制定流程' },
    research_desc2_1: { en: 'Exploring large model approaches for EEG signals to improve decoding accuracy and cross-subject transfer capability', zh: '探索脑电信号的大模型方法，致力于提升脑电数据的解码精度与跨被试迁移能力' },
    research_desc3_1: { en: 'Decoding Mandarin speech from fused brain-muscle dynamics (EEG + sEMG), exploring hierarchical neural representations of tones, initials, and finals', zh: '基于脑肌融合信号(EEG + sEMG)解码汉语语音，探索声调、声母、韵母的层级神经表征' },
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
    visitor_map_note: { en: 'Real-time visitor locations tracked by ClustrMaps', zh: '由 ClustrMaps 追踪的实时访客地理位置' },
    nav_algorithms: { en: 'Algorithms', zh: '算法' },
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
    cv_hide: { en: 'Hide', zh: '收起' },
    cv_views: { en: 'views', zh: '次浏览' },
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][currentLang]) {
      el.textContent = translations[key][currentLang];
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
