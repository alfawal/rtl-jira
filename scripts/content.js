const s = [
  // Common
  "textarea",
  ".user-content-block",
  ".ak-editor-content-area",
  ".ak-renderer-wrapper",
  ".ak-renderer-document",

  // Jira
  // Issue - title/summary
  '[data-testid="issue.views.issue-base.foundation.summary.heading"]',
  // Issue - title/summary field in the creation modal
  "#summary-field",
  '[data-testid="issue-create-commons.common.ui.fields.base-fields.input-field.textfield"]',
  // Issue - Linked issues
  '[data-testid="issue-field-summary.ui.inline-read.link-item"]',
  '[data-testid="issue-field-summary.ui.inline-read.link-item--primitive--container"]>div>span',
  // Backlog - items
  '[data-testid="software-backlog.card-list.card.card-contents.card-container"]>div:nth-of-type(5)',
  // Issues - navigation sidebar
  '[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.summary"]',

  // Confluence
  // Page - Title
  '[data-testid="title-text"]',
  // Page - Cards in the bottom
  '[data-testid="page-card-end-of-page-view"]>div:nth-of-type(1)',
].join(",");

const ps = [
  // Jira
  // Code blocks
  ".code-block",
  // Cards, link previews (after pasting a link)
  ".blockCardView-content-wrap",
  // Inline cards, link previews (after pasting a link)
  ".inlineCardView-content-wrap",
  // Floating toolbars (select language of code block, inline card settings)
  '[data-testid="editor-floating-toolbar"]',
].join(",");

function csc(cs, m) {
  const es = document.querySelectorAll(s);
  const esl = es.length;

  if (m === "a") {
    for (let i = 0; i < esl; i++) {
      es[i].classList.add(...cs);
    }
  } else if (m === "r") {
    for (let i = 0; i < esl; i++) {
      es[i].classList.remove(...cs);
    }
  }
}

chrome.storage.local.get("rtl_jira_mode", (r) => {
  let m = r?.rtl_jira_mode;

  if (m === "off") return;

  if (!m) {
    chrome.storage.local.set({ rtl_jira_mode: "rtl" });
    m = "rtl";
  }

  mcs = {
    rtl: ["rtl-jira-rtl", "rtl-jira-text-start"],
    ltr: ["rtl-jira-ltr"],
    auto: ["rtl-jira-auto"],
  };

  let cs = mcs[m];

  const st = document.createElement("style");
  st.innerHTML = `
    .rtl-jira-rtl {
        direction: rtl !important;
    }

    .rtl-jira-ltr, ${ps} {
        direction: ltr !important;
    }

    .rtl-jira-auto {
        direction: auto !important;
    }

    .rtl-jira-text-start {
        text-align: start !important;
    }
    `;

  const h = document.head || document.getElementsByTagName("head")[0];
  h.appendChild(st);

  let dbto;

  const o = new MutationObserver((_, __) => {
    clearTimeout(dbto);
    dbto = setTimeout(() => csc(cs, "a"), 100);
  });

  const c = { childList: true, subtree: true };

  o.observe(document.body, c);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (
      namespace !== "local" ||
      !Object.keys(changes).includes("rtl_jira_mode")
    )
      return;

    o.disconnect();
    csc(cs, "r");

    const n = changes["rtl_jira_mode"]["newValue"];
    if (n === "off") return;

    cs = mcs[n];
    csc(cs, "a");
    o.observe(document.body, c);
  });
});
