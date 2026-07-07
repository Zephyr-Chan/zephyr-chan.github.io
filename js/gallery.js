/* ============================================
   Gallery — Lightbox 灯箱功能
   点击放大、键盘导航、关闭
   ============================================ */

const galleryData = [
  { src: 'assets/images/gallery/conference-photo.webp', caption: 'Conference', year: '2026' },
  { src: 'assets/images/gallery/lab-meeting-2026.webp', caption: 'Lab Meeting', year: '2026' },
  { src: 'assets/images/gallery/academic-visit.webp', caption: 'Academic Visit', year: '2025' },
  { src: 'assets/images/gallery/project-demo.webp', caption: 'Project Demo', year: '2025' },
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  img.src = galleryData[index].src;
  img.alt = galleryData[index].caption;
  caption.textContent = galleryData[index].caption;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryData.length) % galleryData.length;
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  img.src = galleryData[currentLightboxIndex].src;
  img.alt = galleryData[currentLightboxIndex].caption;
  caption.textContent = galleryData[currentLightboxIndex].caption;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
    }
  });

  // --- 跑马灯:视口外暂停动画节省性能 ---
  const marqueeTrack = document.getElementById('gallery-marquee-track');
  const marqueeSection = document.getElementById('gallery-marquee');
  if (marqueeTrack && marqueeSection && 'IntersectionObserver' in window) {
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        marqueeTrack.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    marqueeObserver.observe(marqueeSection);
  }
});
