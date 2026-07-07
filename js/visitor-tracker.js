/**
 * Visitor Tracker — 服务端访客统计
 * 使用 CounterAPI 实现全站用户浏览次数与时长追踪
 * 无需后端，数据聚合存储在 CounterAPI 服务器
 */

const VisitorTracker = {
  NS: 'zephyr-chan.github.io',
  API_BASE: 'https://counterapi.com/api',
  SESSION_KEY: 'vt_session',
  HEARTBEAT_INTERVAL: 60000, // 60秒上报一次活跃时长

  // 当前会话数据（本地追踪）
  session: {
    pageLoadTime: Date.now(),
    activeStartTime: Date.now(),
    totalActiveTime: 0,
    isVisible: true,
    heartbeatSent: 0,
  },

  /**
   * 初始化访客追踪
   * @param {string} pageKey - 页面标识 (如 'homepage', 'resume', 'transcript')
   */
  init(pageKey) {
    this.pageKey = pageKey || 'homepage';

    // 恢复或创建会话
    this.restoreSession();

    // 上报页面浏览量（+1）
    this.incrementView();

    // 启动活跃时长追踪
    this.startActivityTracking();

    // 页面卸载时保存会话数据并上报
    this.setupUnloadHandler();

    console.log('[VisitorTracker] Initialized for page:', pageKey);
  },

  /**
   * 恢复之前的会话（跨页面浏览）
   */
  restoreSession() {
    const saved = sessionStorage.getItem(this.SESSION_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.session.totalActiveTime = data.totalActiveTime || 0;
        this.session.heartbeatSent = data.heartbeatSent || 0;
      } catch (e) {
        // 忽略解析错误
      }
    }
  },

  /**
   * 保存会话数据
   */
  saveSession() {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      totalActiveTime: this.session.totalActiveTime,
      heartbeatSent: this.session.heartbeatSent,
    }));
  },

  /**
   * 上报页面浏览量
   */
  async incrementView() {
    try {
      await fetch(`${this.API_BASE}/${this.NS}/view/${this.pageKey}`, {
        method: 'GET',
        mode: 'cors',
      });
    } catch (e) {
      console.log('[VisitorTracker] Failed to increment view');
    }
  },

  /**
   * 上报活跃时长（每分钟一次）
   */
  async incrementDuration() {
    try {
      await fetch(`${this.API_BASE}/${this.NS}/duration/${this.pageKey}`, {
        method: 'GET',
        mode: 'cors',
      });
      this.session.heartbeatSent++;
      this.saveSession();
    } catch (e) {
      console.log('[VisitorTracker] Failed to increment duration');
    }
  },

  /**
   * 启动活跃时长追踪
   * 使用 Page Visibility API 检测用户是否在页面上
   */
  startActivityTracking() {
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 页面隐藏：累加活跃时长
        if (this.session.isVisible) {
          const now = Date.now();
          this.session.totalActiveTime += now - this.session.activeStartTime;
          this.session.isVisible = false;
          this.saveSession();
        }
      } else {
        // 页面恢复可见
        this.session.activeStartTime = Date.now();
        this.session.isVisible = true;
      }
    });

    // 定时上报活跃时长（每60秒）
    setInterval(() => {
      if (this.session.isVisible && !document.hidden) {
        this.incrementDuration();
      }
    }, this.HEARTBEAT_INTERVAL);
  },

  /**
   * 页面卸载时保存数据并上报
   */
  setupUnloadHandler() {
    // 使用 sendBeacon 上报最后一段活跃时间
    window.addEventListener('beforeunload', () => {
      if (this.session.isVisible) {
        const now = Date.now();
        this.session.totalActiveTime += now - this.session.activeStartTime;
      }
      this.saveSession();

      // 如果有超过30秒未上报的活跃时间，补报一次
      const unreported = Math.floor(this.session.totalActiveTime / 1000 / 60) - this.session.heartbeatSent;
      if (unreported > 0) {
        const url = `${this.API_BASE}/${this.NS}/duration/${this.pageKey}`;
        navigator.sendBeacon && navigator.sendBeacon(url);
      }
    });
  },

  /**
   * 获取页面总浏览量（服务端聚合）
   * @param {string} pageKey - 页面标识
   * @returns {Promise<number>}
   */
  async getViewCount(pageKey) {
    try {
      const resp = await fetch(
        `${this.API_BASE}/${this.NS}/view/${pageKey}?readOnly=true`,
        { mode: 'cors' }
      );
      if (resp.ok) {
        const data = await resp.json();
        return data.value || 0;
      }
    } catch (e) {
      console.log('[VisitorTracker] Failed to get view count');
    }
    return 0;
  },

  /**
   * 获取页面总活跃时长（分钟）
   * @param {string} pageKey - 页面标识
   * @returns {Promise<number>}
   */
  async getDurationCount(pageKey) {
    try {
      const resp = await fetch(
        `${this.API_BASE}/${this.NS}/duration/${pageKey}?readOnly=true`,
        { mode: 'cors' }
      );
      if (resp.ok) {
        const data = await resp.json();
        return data.value || 0;
      }
    } catch (e) {
      console.log('[VisitorTracker] Failed to get duration count');
    }
    return 0;
  },

  /**
   * 获取全站总浏览量（所有页面合计）
   * @returns {Promise<number>}
   */
  async getTotalViews() {
    try {
      const resp = await fetch(
        `${this.API_BASE}/${this.NS}/view/any?readOnly=true`,
        { mode: 'cors' }
      );
      if (resp.ok) {
        const data = await resp.json();
        return data.value || 0;
      }
    } catch (e) {
      console.log('[VisitorTracker] Failed to get total views');
    }
    return 0;
  },

  /**
   * 获取全站总活跃时长（分钟）
   * @returns {Promise<number>}
   */
  async getTotalDuration() {
    try {
      const resp = await fetch(
        `${this.API_BASE}/${this.NS}/duration/any?readOnly=true`,
        { mode: 'cors' }
      );
      if (resp.ok) {
        const data = await resp.json();
        return data.value || 0;
      }
    } catch (e) {
      console.log('[VisitorTracker] Failed to get total duration');
    }
    return 0;
  },

  /**
   * 格式化时长显示
   * @param {number} minutes - 分钟数
   * @returns {string}
   */
  formatDuration(minutes) {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours < 24) {
      return `${hours}h ${mins}m`;
    }
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  },

  /**
   * 渲染访客统计到指定元素
   * @param {string} elementId - 目标元素ID
   */
  async renderStats(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const [views, duration] = await Promise.all([
      this.getTotalViews(),
      this.getTotalDuration()
    ]);

    const avgTime = views > 0 ? Math.round(duration / views) : 0;

    el.innerHTML = `
      <div class="visitor-stats-grid">
        <div class="visitor-stat-item">
          <div class="visitor-stat-icon"><i class="fas fa-eye"></i></div>
          <div class="visitor-stat-value" id="stat-views">${views.toLocaleString()}</div>
          <div class="visitor-stat-label">Total Views</div>
        </div>
        <div class="visitor-stat-item">
          <div class="visitor-stat-icon"><i class="fas fa-clock"></i></div>
          <div class="visitor-stat-value">${this.formatDuration(duration)}</div>
          <div class="visitor-stat-label">Total Time</div>
        </div>
        <div class="visitor-stat-item">
          <div class="visitor-stat-icon"><i class="fas fa-chart-line"></i></div>
          <div class="visitor-stat-value">${avgTime} min</div>
          <div class="visitor-stat-label">Avg / Visit</div>
        </div>
      </div>
    `;
  },

  /**
   * 渲染访客地图区域的简短文字统计
   * @param {string} numberId - 数字元素ID
   */
  async renderMapText(numberId) {
    const el = document.getElementById(numberId);
    if (!el) return;
    const views = await this.getTotalViews();
    el.textContent = views > 0 ? views.toLocaleString() : '—';
  }
};

// 自动初始化（根据当前页面路径推断 pageKey）
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  let pageKey = 'homepage';

  if (path.includes('cv.html')) {
    pageKey = 'cv';
  } else if (path.includes('algorithms.html')) {
    pageKey = 'algorithms';
  } else if (path.includes('resources.html')) {
    pageKey = 'resources';
  } else if (path.includes('social.html')) {
    pageKey = 'social';
  }

  VisitorTracker.init(pageKey);
});
