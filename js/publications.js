/* ============================================
   Publications — 论文筛选功能
   按类型筛选（All/Conference/Journal/Preprint）
   ============================================ */

function filterPubs(type, clickedTag) {
  // Update active tag
  document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.classList.remove('active');
  });
  clickedTag.classList.add('active');

  // Filter publications
  const pubItems = document.querySelectorAll('.pub-item');
  const yearHeaders = document.querySelectorAll('.pub-year-header');

  pubItems.forEach(item => {
    const itemType = item.getAttribute('data-type');
    if (type === 'all' || itemType === type) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  // Hide year headers if no visible items follow
  yearHeaders.forEach(header => {
    let next = header.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains('pub-year-header')) {
      if (next.classList.contains('pub-item') && next.style.display !== 'none') {
        hasVisible = true;
        break;
      }
      next = next.nextElementSibling;
    }
    header.style.display = hasVisible ? 'block' : 'none';
  });
}
