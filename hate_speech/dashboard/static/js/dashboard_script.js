document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.analytics-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Helper to hide all tabs
  function hideAllTabs() {
    tabContents.forEach(content => {
      content.style.display = 'none';
    });
    tabs.forEach(tab => {
      tab.classList.remove('tab-active');
    });
  }

  // Function to show a specific tab
  function showTab(tab) {
    hideAllTabs();
    tab.classList.add('tab-active');
    const tabId = tab.getAttribute('data-tab');
    const content = document.getElementById(`${tabId}-content`);
    if (content) {
      content.style.display = 'block';
    }
  }

  // Add click listeners
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showTab(tab);
    });
  });

  // Automatically show the first tab on page load
  if (tabs.length > 0) {
    showTab(tabs[0]);
  }
});
