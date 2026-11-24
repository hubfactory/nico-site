// 旧テーマの ui.js / top.js（jQuery）をバニラJSに置き換えたもの

const wrapper = document.getElementById('wrapper');
const main = document.getElementById('main');
const header = document.getElementById('js-global-header');
const isTop = document.body.id === 'page-id-top';
const isSP = /iPhone|Android/.test(navigator.userAgent);

// コンテンツ表示（フェードイン）
setTimeout(() => wrapper?.classList.add('is-show'), 300);

// 固定ヘッダー
if (main && header) {
  if (!isTop) {
    header.classList.add('is-fixed');
    main.classList.add('is-menu-fixed');
  } else {
    const mainOffsetTop = main.getBoundingClientRect().top + window.scrollY;
    const headerOffsetTop = header.getBoundingClientRect().top + window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (isSP) {
        main.classList.toggle('is-hide-intro', y >= mainOffsetTop);
        return;
      }
      const fixed = y >= headerOffsetTop;
      header.classList.toggle('is-fixed', fixed);
      main.classList.toggle('is-menu-fixed', fixed);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    update();
  }
}

// SP: ヘッダーメニュー開閉
document.querySelectorAll<HTMLElement>('.js-slider-menu-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const target = trigger.parentElement?.querySelector('.js-slider-menu-target');
    if (!target) return;
    const open = trigger.classList.toggle('is-open');
    target.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
});

// TOP: セクションが表示されたら背景を切り替え
const contentBg = document.getElementById('js-content-bg');
if (isTop && contentBg) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const num = (entry.target as HTMLElement).dataset.num;
      contentBg.querySelector(`.content-${num}`)?.classList.toggle('is-show', entry.isIntersecting);
    });
  });
  document.querySelectorAll('.js-fade-in-view').forEach((el) => observer.observe(el));
}
