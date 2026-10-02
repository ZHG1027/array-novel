/* =========================================================
 * 《数组那些事儿》阅读页脚本
 *
 * 更新小说时，只需要改下面两处配置：
 *   1) CHAPTERS —— 章节目录
 *   2) GISCUS   —— 讨论区
 * ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. 章节目录 ---------- */
  var CHAPTERS = [
    { file: "ch1.html", title: "数组那些事（一）" },
    { file: "ch2.html", title: "数组那些事（二）" },
    { file: "ch3.html", title: "数组那些事（三）" },
    { file: "ch4.html", title: "数组那些事（四）" },
    { file: "ch5.html", title: "数组那些事（五）" },
    { file: "ch6.html", title: "数组那些事（六）" },
    { file: "ch7.html", title: "数组那些事（七）" }
  ];

  /* ---------- 2. giscus 讨论区 ---------- */
  var GISCUS = {
    repo: "ZHG1027/array-novel",
    repoId: "R_kgDOUyUBFw",
    category: "Announcements",
    categoryId: "DIC_kwDOUyUBF84DGphq",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "zh-CN",
    loading: "lazy"
  };

  /* ---------- 3. LaTeX 支持（MathJax） ---------- */
  (function () {
    window.MathJax = {
      tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        processEscapes: true
      },
      options: {
        skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      }
    };
    var mj = document.createElement("script");
    mj.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    mj.async = true;
    mj.id = "MathJax-script";
    document.head.appendChild(mj);
  })();

  /* ---------- 以下无需改动 ---------- */

  var total = CHAPTERS.length;
  var idx = parseInt(document.body.getAttribute("data-chapter"), 10);
  if (isNaN(idx) || idx < 1) idx = 1;
  if (idx > total) idx = total;

  var current = CHAPTERS[idx - 1];

  /* 顶部：当前标题 + 阅读进度 + 章节导航 */
  var topbar = document.getElementById("topbar");
  if (topbar) {
    var pct = (idx / total * 100).toFixed(2);

    var navHTML = '<nav class="chapter-nav" aria-label="章节导航">';
    for (var i = 0; i < CHAPTERS.length; i++) {
      var num = i + 1;
      var cls = num === idx ? "chapter-nav-btn active" : "chapter-nav-btn";
      navHTML +=
        '<a class="' + cls + '" href="' + CHAPTERS[i].file + '" ' +
        'title="' + CHAPTERS[i].title + '">' + num + "</a>";
    }
    navHTML += "</nav>";

    topbar.innerHTML =
      '<div class="topbar-inner">' +
        '<div class="topbar-row">' +
          '<span class="topbar-title">' + current.title + "</span>" +
          '<span class="topbar-count">第 ' + idx + " 章 / 共 " + total + " 章</span>" +
        "</div>" +
        '<div class="progress-track">' +
          '<div class="progress-fill" style="width:' + pct + '%"></div>' +
        "</div>" +
        navHTML +
      "</div>";
  }

  /* 底部：上一章 / 下一章 */
  var pager = document.getElementById("pager");
  if (pager) {
    var prev = idx > 1 ? CHAPTERS[idx - 2] : null;
    var next = idx < total ? CHAPTERS[idx] : null;

    var prevHTML = prev
      ? '<a class="pager-btn prev" href="' + prev.file + '">上一章</a>'
      : '<span class="pager-btn prev is-disabled">上一章</span>';

    var nextHTML = next
      ? '<a class="pager-btn next" href="' + next.file + '">下一章</a>'
      : '<span class="pager-btn next is-disabled">已是最新</span>';

    pager.innerHTML = prevHTML + nextHTML;
  }

  /* 讨论区：giscus */
  var mount = document.getElementById("giscus-container");
  if (mount) {
    var ready =
      GISCUS.repo.indexOf("YOUR_") !== 0 &&
      GISCUS.repoId.indexOf("YOUR_") !== 0 &&
      GISCUS.categoryId.indexOf("YOUR_") !== 0;

    if (!ready) {
      mount.innerHTML =
        '<div class="giscus-hint">' +
          "讨论区尚未启用。打开 <code>novel.js</code>，把顶部的 " +
          "<code>repo</code>、<code>repoId</code>、<code>category</code>、" +
          "<code>categoryId</code> 四项替换成你自己的 giscus 配置，" +
          "保存并刷新后，每一章的评论区就会出现在这里。" +
        "</div>";
    } else {
      var s = document.createElement("script");
      s.src = "https://giscus.app/client.js";
      s.async = true;
      s.crossOrigin = "anonymous";
      s.setAttribute("data-repo", GISCUS.repo);
      s.setAttribute("data-repo-id", GISCUS.repoId);
      s.setAttribute("data-category", GISCUS.category);
      s.setAttribute("data-category-id", GISCUS.categoryId);
      s.setAttribute("data-mapping", GISCUS.mapping);
      s.setAttribute("data-strict", GISCUS.strict);
      s.setAttribute("data-reactions-enabled", GISCUS.reactionsEnabled);
      s.setAttribute("data-emit-metadata", GISCUS.emitMetadata);
      s.setAttribute("data-input-position", GISCUS.inputPosition);
      s.setAttribute("data-theme", "transparent_dark");
      s.setAttribute("data-lang", GISCUS.lang);
      s.setAttribute("data-loading", GISCUS.loading);
      mount.appendChild(s);
    }
  }
})();