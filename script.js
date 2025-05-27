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
            return header.offsetHeight; // [cite: 176]
        }
        return 0;
    }

    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active'); // [cite: 177]

            requestAnimationFrame(() => { // [cite: 177]
                const headerHeight = getHeaderHeight();
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset; // [cite: 178]
                const scrollOffset = headerHeight + 30; // 30px buffer below the header. // [cite: 178]
                window.scrollTo({ // [cite: 179]
                    top: targetPosition - scrollOffset,
                    behavior: 'smooth'
                }); // [cite: 180]
            });
        }
    }

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        }); // [cite: 181]
    }

    function handleNavigation(event) {
        event.preventDefault(); // [cite: 181]
        const targetId = this.getAttribute('href').substring(1); // [cite: 181]
        showSection(targetId); // [cite: 181]
        setActiveLink(targetId); // [cite: 182]
        window.location.hash = targetId; // [cite: 182]
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation); // [cite: 182]
    });
    if (learnMoreButton) { // [cite: 183]
        learnMoreButton.addEventListener('click', handleNavigation); // [cite: 184]
    }

    // --- Theme Switching Logic ---
    function applyTheme(themeName) {
        // Remove existing theme classes
        // THIS IS THE ONLY LINE MODIFIED FROM YOUR ORIGINAL SCRIPT.TXT (plus this comment)
        // It now includes 'theme-war' in the list of classes to be removed.
        body.classList.remove('theme-scifi', 'theme-war', 'theme-arcade', 'theme-ocean');
        // Add the new theme class if it's not 'default'
        if (themeName && themeName !== 'default') { // [cite: 185]
            body.classList.add(`theme-${themeName}`); // [cite: 186]
        }

        // Save the selected theme to localStorage
        localStorage.setItem('alexrNetworkTheme', themeName); // [cite: 186]
    }

    // Event listeners for theme buttons
    themeButtons.forEach(button => { // [cite: 187]
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme; // Get theme name from data-theme attribute // [cite: 187]
            applyTheme(themeName);
        });
    }); // [cite: 188]
    // Apply saved theme on initial page load
    const savedTheme = localStorage.getItem('alexrNetworkTheme'); // [cite: 188]
    if (savedTheme) { // [cite: 189]
        applyTheme(savedTheme); // [cite: 189]
    } else {
        // Apply default theme if no theme is saved (optional, but good practice)
        applyTheme('default'); // [cite: 190]
    } // [cite: 191]
    // --- End Theme Switching Logic ---


    // Initial load - show the home section if no hash in URL, or the section specified by hash
    setTimeout(() => { // [cite: 191]
        if (window.location.hash) {
            const initialId = window.location.hash.substring(1);
            showSection(initialId);
            setActiveLink(initialId);
        } else {
            showSection('home'); // [cite: 192]
            setActiveLink('home'); // [cite: 192]
        }
    }, 100); // [cite: 193]
}); // [cite: 193]
