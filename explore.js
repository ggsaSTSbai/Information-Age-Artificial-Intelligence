// explore.js

document.addEventListener("DOMContentLoaded", () => {
  // Get all tab buttons and tabs
  const tabButtons = document.querySelectorAll(".tab-buttons li");
  const tabs = document.querySelectorAll(".tab");

  // Function to remove active class from all tabs/buttons
  function deactivateAll() {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabs.forEach(tab => tab.classList.remove("active"));
  }

  // Add click event to each tab button
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab"); // e.g., "tab1"
      const tabToShow = document.getElementById(tabId);

      if (tabToShow) {
        deactivateAll(); // Hide all tabs and deactivate all buttons
        button.classList.add("active"); // Activate clicked button
        tabToShow.classList.add("active"); // Show corresponding tab
      }
    });
  });

  // Optional: activate first tab on page load
  if (tabButtons.length > 0) tabButtons[0].click();
});
