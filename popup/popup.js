function sb(m) {
  const bt = m.charAt(0).toUpperCase();
  chrome.action.setBadgeText({ text: bt });
  chrome.action.setBadgeBackgroundColor({
    color: m === "off" ? "#A9A9A9" : "#6495ED",
  });
}

function sm(m) {
  chrome.storage.local.set({ rtl_jira_mode: m });
  sb(m);
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("rtl_jira_mode", (r) => {
    let m = r.rtl_jira_mode;
    if (!m) {
      m = "rtl";
      sb(m);
    }

    const el = document.querySelector("#" + m);
    el.checked = true;
    el.parentElement.classList.add("checked");

    const cbs = document.querySelectorAll("#off,#ltr,#auto,#rtl");
    cbs.forEach((cb) => {
      cb.addEventListener("change", (e) => {
        sm(cb.id);
        sb(cb.id);
        cbs.forEach((c) => {
          c.parentElement.classList.remove("checked");
          c.checked = false;
        });
        e.target.parentElement.classList.add("checked");
        e.target.checked = true;
      });
    });
  });

  const ce = document.getElementById("copy");

  ce.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("").then(
      () => {
        const ot = ce.textContent;
        ce.textContent = "Link copied!";
        setTimeout(() => (ce.textContent = ot), 3000);
      },
      () => alert("Failed to copy :(")
    );
  });
});
