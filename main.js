/* ============================================================
   페이지 인터랙션 — Cohere 디자인 유지
   1) 스크롤 진입 애니메이션 (IntersectionObserver)
   2) 작품 확대 라이트박스 (원본 600x400 직접 조작)
   ============================================================ */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // JS 활성 표시 (CSS reveal 게이팅용)
  document.documentElement.classList.add('has-js');

  /* ---------- 1) 스크롤 진입 애니메이션 ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2) 작품 확대 라이트박스 ---------- */
  var lb       = document.getElementById('lightbox');
  var lbFrame  = document.getElementById('lb-frame');
  var lbCanvas = document.getElementById('lb-canvas');
  var lbStage  = document.getElementById('lb-stage');
  var lbIdx    = document.getElementById('lb-idx');
  var lbChip   = document.getElementById('lb-chip');
  var lbTitle  = document.getElementById('lb-title');
  var lbDesc   = document.getElementById('lb-desc');
  var lastFocused = null;

  var W = 600, H = 400;

  function fitStage() {
    if (lb.hidden) return;
    var availW = Math.min(window.innerWidth - 48, 760);
    var availH = window.innerHeight - 230;          // 헤더/푸터 여백
    var scale = Math.min(1, availW / W, availH / H);
    if (scale <= 0) scale = 0.5;
    lbCanvas.style.transform = 'scale(' + scale + ')';
    lbStage.style.width  = (W * scale) + 'px';
    lbStage.style.height = (H * scale) + 'px';
  }

  function openLightbox(card) {
    var src   = card.querySelector('.cell iframe').getAttribute('src');
    var title = card.querySelector('h2').textContent;
    var idx   = card.querySelector('.idx').textContent;
    var chip  = card.querySelector('.chip');
    var desc  = card.querySelector('.meta p').innerHTML;

    lbIdx.textContent = idx;
    lbTitle.textContent = title;
    lbDesc.innerHTML = desc;
    lbChip.textContent = chip.textContent;
    lbChip.className = 'lb-chip ' +
      (chip.classList.contains('chip-dynamic') ? 'chip-dynamic' : 'chip-static');

    lastFocused = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    // 새로 로드해 인터랙티브 작품을 원본 크기에서 처음부터 실행
    lbFrame.setAttribute('src', src);
    requestAnimationFrame(function () {
      lb.classList.add('open');
      fitStage();
    });
    document.getElementById('lb-close').focus();
  }

  function closeLightbox() {
    if (lb.hidden) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
    var done = function () {
      lb.hidden = true;
      lbFrame.removeAttribute('src');       // 애니메이션 정지 · 상태 초기화
      lb.removeEventListener('transitionend', done);
    };
    if (reduce) { done(); }
    else { lb.addEventListener('transitionend', done); setTimeout(done, 350); }
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () { openLightbox(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  lb.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lb.hidden) closeLightbox();
  });
  window.addEventListener('resize', fitStage);
})();
