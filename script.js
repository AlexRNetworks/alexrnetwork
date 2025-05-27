document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const learnMoreButton = document.getElementById('learnMoreButton');
    const contentSections = document.querySelectorAll('main .content-section');
    const header = document.querySelector('header');
    const body = document.body; // Reference to the body element for themes
    const themeButtons = document.querySelectorAll('.theme-button'); // Get all theme buttons [cite: 175]

    // Function to get the current height of the fixed header
    function getHeaderHeight() {
        if (header) {
            return header.offsetHeight; [cite: 176]
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

            requestAnimationFrame(() => { [cite: 177]
                const headerHeight = getHeaderHeight();
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset; [cite: 178]
                const scrollOffset = headerHeight + 30; // 30px buffer below the header.
                window.scrollTo({
                    top: targetPosition - scrollOffset,
                    behavior: 'smooth'
                }); [cite: 179]
            }); [cite: 180]
        }
    }

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    } [cite: 181]

    function handleNavigation(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
        setActiveLink(targetId); [cite: 182]
        window.location.hash = targetId;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    if (learnMoreButton) { [cite: 183]
        learnMoreButton.addEventListener('click', handleNavigation); [cite: 184]
    }

    // --- Theme Switching Logic ---
    function applyTheme(themeName) {
        // Remove existing theme classes
        // MODIFIED LINE: Added 'theme-war' to the list of classes to remove.
        // Also kept 'theme-ocean' in case it's used or was a previous name for 'theme-war'.
        body.classList.remove('theme-scifi', 'theme-war', 'theme-arcade', 'theme-ocean');
        // Add the new theme class if it's not 'default'
        if (themeName && themeName !== 'default') {
            body.classList.add(`theme-${themeName}`); [cite: 186]
        }

        // Save the selected theme to localStorage
        localStorage.setItem('alexrNetworkTheme', themeName); [cite: 187]
    }

    // Event listeners for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme; // Get theme name from data-theme attribute
            applyTheme(themeName);
        });
    });
    // Apply saved theme on initial page load
    const savedTheme = localStorage.getItem('alexrNetworkTheme'); [cite: 188]
    if (savedTheme) { [cite: 189]
        applyTheme(savedTheme); [cite: 190]
    } else {
        // Apply default theme if no theme is saved (optional, but good practice)
        applyTheme('default'); [cite: 191]
    }
    // --- End Theme Switching Logic ---


    // Initial load - show the home section if no hash in URL, or the section specified by hash
    setTimeout(() => {
        if (window.location.hash) {
            const initialId = window.location.hash.substring(1);
            showSection(initialId);
            setActiveLink(initialId);
        } else {
            showSection('home'); [cite: 192]
            setActiveLink('home');
        }
    }, 100); [cite: 193]
});
