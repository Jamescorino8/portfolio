const toggle = document.getElementById('theme-toggle');

// Check the device's OS theme preference
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

// Function to apply the correct theme and button icon
function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    if (toggle) toggle.textContent = '☼';
  } else {
    document.body.classList.remove('light-mode');
    if (toggle) toggle.textContent = '⏾';
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
    toggle.textContent = isLight ? '☼' : '⏾';
    
    // Save to localStorage so it persists across pages!
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// 4. Typewriter Effect for h1 and optional h2
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector('h1');
  const h2 = document.querySelector('h2'); // May not exist on all pages

  if (h1) {
    const speed = 75; // Adjust typing speed (ms) here
    // const hasSeenH1Type = sessionStorage.getItem('hasSeenH1Type') === 'true';
    
    // Grab new elements
    const cta = document.querySelector('.cta');
    const footer = document.querySelector('footer');
    
    let ctaText = '';
    if (cta) {
      ctaText = cta.textContent;
      const exactHeight = cta.getBoundingClientRect().height;
      cta.style.minHeight = `${exactHeight}px`; // prevent layout jump
      cta.textContent = ''; // clear on load
    }

    // Helper function to type out a generic element
    function typeElement(element, text, callback) {
      // Lock height to prevent layout shift
      const exactHeight = element.getBoundingClientRect().height;
      element.style.minHeight = `${exactHeight}px`;
      
      element.textContent = '';
      element.classList.add('typewriter-cursor');

      let i = 0;
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          // Finished typing this element
          if (callback) {
            // Remove cursor from this element before moving on
            element.classList.remove('typewriter-cursor');
            callback();
          }
        }
      }
      setTimeout(type, 500); // Initial delay
    }

    const h1Text = h1.textContent;
    let h2Text = '';
    if (h2) {
      h2Text = h2.textContent;
    }

    // Auto-scale headers to ensure they fit exactly on one line before typing starts
    function scaleHeadersToFit() {
      // 1. Get starting font size in pixels
      let currentFontSize = parseFloat(window.getComputedStyle(h1).fontSize);
      const originalFontSize = currentFontSize;
      
      // 2. Shrink until the text physically measures as a single line
      while (currentFontSize > 10) {
        // Measure what a single line SHOULD be at the current font size
        h1.textContent = 'A';
        const expectedSingleHeight = h1.offsetHeight;
        
        // Put full text back in to see what the actual height is
        h1.textContent = h1Text;
        
        // If the actual height is roughly the size of a single line, it isn't wrapping!
        if (h1.offsetHeight < expectedSingleHeight * 1.5) {
            break; 
        }
        
        // Otherwise, shrink by 1px and try again.
        currentFontSize -= 1;
        h1.style.fontSize = `${currentFontSize}px`;
      }
      
      // 3. Make H2 font size exactly match H1
      if (h2) {
        h2.style.fontSize = `${currentFontSize}px`;
      }
      
      // 4. Clear headers so typewriter animation can begin cleanly
      h1.textContent = '';
      if (h2) h2.textContent = ''; 
    }
    
    // Execute scaling math instantly
    scaleHeadersToFit();

    // Fire the staggered terminal print effect, then queue the CTA typing
    function runStaggerPrint() {
      const items = document.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('printed');
        }, index * 100); // 100ms gap between each line "printing"
      });
      
      // Calculate when staggered print finishes and start the CTA typing
      const staggeredDuration = items.length * 100 + 300; // wait an extra 300ms for breathing room
      
      setTimeout(() => {
        if (cta) {
            typeElement(cta, ctaText, () => {
                // When CTA finishes, fade in the footer
                if (footer) {
                    footer.classList.add('revealed');
                }
            });
        }
      }, staggeredDuration);
    }

    // Type h1, then h2
    typeElement(h1, h1Text, () => {
      // After h1 is done, type h2 if it exists
      if (h2) {
         // Gracefully "hit enter"
         h2.classList.add('expanded');
         
         // Wait for CSS slide down to complete before typing
         setTimeout(() => {
             typeElement(h2, h2Text, () => {
                 // Simulated Cmd+Shift+LeftArrow and Cmd+U sequence
                 
                 // 1. Pause slightly to mimic human reaction
                 setTimeout(() => {
                     // 2. Cmd+Shift+LeftArrow (highlight)
                     h2.classList.add('highlighted');
                     
                     // 3. Pause for user pressing next shortcut
                     setTimeout(() => {
                         // 4. Cmd+U (underline), drop highlight (selection ends)
                         h2.classList.remove('highlighted');
                         h2.classList.add('underlined');
                         
                         // 5. Fire stagger print slightly after to let the underline read
                         setTimeout(runStaggerPrint, 200);
                     }, 350);
                 }, 400); 
             });
         }, 350); 
      } else {
         // If no h2, run stagger print directly after h1
         runStaggerPrint();
      }
    });
  }
});