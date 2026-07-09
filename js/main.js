"use strict";

/*---------- ハンバーガーメニュー ----------*/

// const hamburger = document.querySelector(".m-header-hamburger");
// const nav = document.querySelector(".l-header__nav");

// // ハンバーガーの開閉
// hamburger.addEventListener("click", () => {
//   const isOpen = nav.classList.toggle("is-open");
//   hamburger.setAttribute("aria-expanded", isOpen);
// });

// // スクロールでハンバーガーの色を切り替え
// window.addEventListener("scroll", () => {
//   const mvHeight = document.querySelector(".p-mv")?.offsetHeight ?? 0;

//   if (window.scrollY > mvHeight) {
//     // MV以降は黒
//     hamburger.querySelectorAll("span").forEach((span) => {
//       span.style.background = "var(--black-color)";
//     });
//   } else {
//     // MV上は白
//     hamburger.querySelectorAll("span").forEach((span) => {
//       span.style.background = "#fff";
//     });
//   }
// });

const hamburger = document.querySelector(".m-header-hamburger");
const nav = document.querySelector(".l-header__nav");

// メニューを閉じる関数
const closeMenu = () => {
  nav.classList.remove("is-open");
  hamburger.setAttribute("aria-expanded", false);
};

// ハンバーガーの開閉
hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// ナビのリンクをクリックしたら閉じる
const navLinks = document.querySelectorAll(".l-header__nav-list a");
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ナビの外側をクリックしたら閉じる
nav.addEventListener("click", (e) => {
  if (e.target === nav) closeMenu(); // navの背景部分をクリックした時のみ
});

// スクロールでヘッダー背景・ハンバーガーの色を切り替え
const header = document.querySelector(".l-header");

// FVがないページは最初から白背景（.cue-kvがあるページは除外）
if (!document.querySelector(".top-kv") && !document.querySelector(".cue-kv")) {
  header.classList.add("is-scrolled");
}
window.addEventListener("scroll", () => {
  const mvHeight = (document.querySelector(".top-kv") ?? document.querySelector(".cue-kv"))?.offsetHeight ?? 0;

  // ヘッダーがKVを抜ける前に白背景へ切り替え、コンテンツとの重なりを防ぐ
  const threshold = Math.max(mvHeight - header.offsetHeight, 0);

  if (window.scrollY > threshold) {
    header.classList.add("is-scrolled");
    hamburger.querySelectorAll("span").forEach((span) => {
      span.style.background = "var(--black-color)";
    });
  } else {
    header.classList.remove("is-scrolled");
    hamburger.querySelectorAll("span").forEach((span) => {
      span.style.background = "var(--primary-color)";
    });
  }
});

/*---------- スクロールで各セクションをふわっと表示 ----------*/
const revealEls = document.querySelectorAll(
  ".m_section-title, .top-plans__item, .top-service__item, .top-works__item, .top-flow__item, .top-about__content, .top-contact__content"
);

if ("IntersectionObserver" in window && revealEls.length) {
  // 同じ親の中の要素(カード群など)には時間差をつける
  const groups = new Map();
  revealEls.forEach((el) => {
    const siblings = groups.get(el.parentElement) ?? [];
    el.style.setProperty("--reveal-delay", `${Math.min(siblings.length, 4) * 0.09}s`);
    siblings.push(el);
    groups.set(el.parentElement, siblings);
    el.classList.add("js-reveal");
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

// スキル詳細の開閉
const skillTrigger = document.querySelector(".about-skill__trigger");
const skillDetail = document.querySelector(".about-skill__detail");

if (skillTrigger && skillDetail) {
  skillTrigger.addEventListener("click", () => {
    skillDetail.classList.toggle("is-open");
    const icon = skillTrigger.querySelector(".about-skill__trigger-icon");
    icon.textContent = skillDetail.classList.contains("is-open") ? "−" : "+";
  });
}

// スキルアコーディオン
const accordions = document.querySelectorAll(".about-skill__accordion");
accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const body = accordion.nextElementSibling;
    body.classList.toggle("is-open");
    accordion.setAttribute("aria-expanded", body.classList.contains("is-open"));
  });
});
