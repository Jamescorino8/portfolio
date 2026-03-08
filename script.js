const toggle = document.getElementById('theme-toggle');

// Check the device's OS theme preference
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

// Function to apply the correct theme and button icon
function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    toggle.textContent = '⚙';
  } else {
    document.body.classList.remove('light-mode');
    toggle.textContent = '☾';
  }
}

// 1. Initial check when the page loads
applyTheme(prefersLightScheme.matches);

// 2. Listen for any OS-level theme changes while the user is on the site
prefersLightScheme.addEventListener('change', (e) => {
  applyTheme(e.matches);
});

// 3. Manual toggle override
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  toggle.textContent = isLight ? '⚙' : '☾';
});