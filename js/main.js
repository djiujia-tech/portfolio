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

// スクロールでハンバーガーの色を切り替え
window.addEventListener("scroll", () => {
  const mvHeight = document.querySelector(".top-kv")?.offsetHeight ?? 0;

  if (window.scrollY > mvHeight) {
    hamburger.querySelectorAll("span").forEach((span) => {
      span.style.background = "var(--black-color)";
    });
  } else {
    hamburger.querySelectorAll("span").forEach((span) => {
      span.style.background = "var(--primary-color)";
    });
  }
});

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
