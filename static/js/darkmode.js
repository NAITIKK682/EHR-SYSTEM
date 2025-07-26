document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Theme application function
    const applyTheme = (isDark) => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Additional text visibility enforcement
        const textElements = document.querySelectorAll(
            '.feature-card, .disease-card, .chatbot-card, .section-title, .hero-content, .auth-form'
        );
        
        textElements.forEach(el => {
            el.style.color = isDark ? '#e0e0e0' : '';
        });
        
        const paragraphElements = document.querySelectorAll(
            '.feature-card p, .disease-card p, .chatbot-card p, .auth-form p'
        );
        
        paragraphElements.forEach(el => {
            el.style.opacity = isDark ? '0.95' : '';
        });
    };

    // Initialize theme
    const initTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDarkScheme.matches ? 'dark' : 'light');
        applyTheme(currentTheme === 'dark');
        if (toggleCheckbox) {
            toggleCheckbox.checked = currentTheme === 'dark';
        }
    };

    // Event listeners
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', (e) => {
            applyTheme(e.target.checked);
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme === 'dark');
            if (toggleCheckbox) {
                toggleCheckbox.checked = newTheme === 'dark';
            }
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
            if (toggleCheckbox) {
                toggleCheckbox.checked = e.matches;
            }
        }
    });

    // Initialize
    initTheme();

    // Special handling for auth pages
    if (window.location.pathname.includes('/login') || 
        window.location.pathname.includes('/signup')) {
        document.body.classList.add('auth-page');
        
        // Additional auth page theming
        const authForm = document.querySelector('.auth-form');
        if (authForm) {
            authForm.style.backgroundColor = 'var(--card-bg)';
            authForm.style.color = 'var(--text-color)';
        }
    }
});