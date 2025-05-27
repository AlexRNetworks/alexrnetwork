document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const learnMoreButton = document.getElementById('learnMoreButton');
    const contentSections = document.querySelectorAll('main .content-section');
    const header = document.querySelector('header');
    const body = document.body; // Reference to the body element for themes
    const themeButtons = document.querySelectorAll('.theme-button'); // Get all theme buttons

    // Function to get the current height of the fixed header
    function getHeaderHeight() {
        if (header) {
            return header.offsetHeight;
        }
        return 0;
    }

    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');

            requestAnimationFrame(() => {
                const headerHeight = getHeaderHeight();
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const scrollOffset = headerHeight + 30; // 30px buffer below the header.
                window.scrollTo({
                    top: targetPosition - scrollOffset,
                    behavior: 'smooth'
                });
            });
        }
    }

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    function handleNavigation(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
        setActiveLink(targetId);
        window.location.hash = targetId;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', handleNavigation);
    }

    // --- Theme Switching Logic ---
    function applyTheme(themeName) {
        // Remove existing theme classes
        // MODIFIED LINE: Added new theme classes to the list
        body.classList.remove(
            'theme-scifi', 
            'theme-war', 
            'theme-arcade', 
            'theme-ocean', // Kept 'theme-ocean' in case it's still used elsewhere or for future
            'theme-minecraft', 
            'theme-blackops2', 
            'theme-neotokyo' 
        );
        // Add the new theme class if it's not 'default'
        if (themeName && themeName !== 'default') {
            body.classList.add(`theme-${themeName}`);
        }

        // Save the selected theme to localStorage
        localStorage.setItem('alexrNetworkTheme', themeName);
    }

    // Event listeners for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme; // Get theme name from data-theme attribute
            applyTheme(themeName);
        });
    });
    // Apply saved theme on initial page load
    const savedTheme = localStorage.getItem('alexrNetworkTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Apply default theme if no theme is saved (optional, but good practice)
        applyTheme('default');
    }
    // --- End Theme Switching Logic ---


    // Initial load - show the home section if no hash in URL, or the section specified by hash
    setTimeout(() => {
        if (window.location.hash) {
            const initialId = window.location.hash.substring(1);
            showSection(initialId);
            setActiveLink(initialId);
        } else {
            showSection('home');
            setActiveLink('home');
        }
    }, 100);
});
