const toggle = document.getElementById('theme-toggle');

// Check the device's OS theme preference
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

// Function to apply the correct theme and button icon
function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    if (toggle) toggle.textContent = '⚙';
  } else {
    document.body.classList.remove('light-mode');
    if (toggle) toggle.textContent = '☾';
  }
}

// 1. Initial check when the page loads
const storedTheme = localStorage.getItem('theme');
if (storedTheme !== null) {
  // Use saved preference if it exists
  applyTheme(storedTheme === 'light');
} else {
  // Otherwise, fallback to the OS default
  applyTheme(prefersLightScheme.matches);
}

// 2. Listen for any OS-level theme changes while the user is on the site
prefersLightScheme.addEventListener('change', (e) => {
  // Only automatically switch with the OS if the user hasn't explicitly saved a preference
  if (localStorage.getItem('theme') === null) {
    applyTheme(e.matches);
  }
});

// 3. Manual toggle override
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    toggle.textContent = isLight ? '⚙' : '☾';
    
    // Save to localStorage so it persists across pages!
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// 4. Typewriter Effect for h1
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector('h1');
  if (h1) {
    const textToType = h1.textContent;
    
    // Lock in the exact rendered height before clearing the text to prevent any layout shift
    const exactHeight = h1.getBoundingClientRect().height;
    h1.style.minHeight = `${exactHeight}px`;

    h1.textContent = ''; // clear initial content
    h1.classList.add('typewriter-cursor'); // add cursor

    let i = 0;
    const speed = 75; // Adjust typing speed (ms) here

    function typeWriter() {
      if (i < textToType.length) {
        h1.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // slight delay before starting to type looks natural
    setTimeout(typeWriter, 500);
  }
});