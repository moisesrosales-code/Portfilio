function showTab(tabId) {
  let sections = document.querySelectorAll(".tab-section");
  let buttons = document.querySelectorAll(".tab-btn");

  sections.forEach(function(section) {
    section.classList.remove("active");
  });

  buttons.forEach(function(button) {
    button.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}