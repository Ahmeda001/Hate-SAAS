

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  document.getElementById("sun-icon").classList.toggle("hidden");
  document.getElementById("moon-icon").classList.toggle("hidden");
}

function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
}

// Persist dark mode across refresh
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcons();
}

function updateThemeIcons() {
  const sun = document.getElementById("sun-icon");
  const moon = document.getElementById("moon-icon");
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  } else {
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
  }
}

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
updateThemeIcons();
