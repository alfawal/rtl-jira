function sm(m) {
  chrome.storage.local.set({ rtl_jira_mode: m });
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("rtl_jira_mode", (r) => {
    let m = r.rtl_jira_mode;
    if (!m) m = "rtl";

    let el = document.querySelector("#" + m);
    el.checked = true;
    el.parentElement.classList.add("checked");

    const cbs = document.querySelectorAll("#off,#ltr,#auto,#rtl");
    cbs.forEach((cb) => {
      cb.addEventListener("change", (e) => {
        sm(cb.id);
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

  ce.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText("").then(
      function () {
        const ot = ce.textContent;
        ce.textContent = "Link copied!";
        setTimeout(function () {
          ce.textContent = ot;
        }, 3000);
      },
      function () {
        alert("Failed to copy :(");
      }
    );
  });
});
