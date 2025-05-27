document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const learnMoreButton = document.getElementById('learnMoreButton');
    const contentSections = document.querySelectorAll('main .content-section');
    const header = document.querySelector('header'); // Get the header element

    // Function to get the current height of the fixed header
    function getHeaderHeight() {
        if (header) {
            return header.offsetHeight; // offsetHeight includes padding and border
        }
        return 0; // Fallback if header isn't found
    }

    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');

            // Defer the scroll slightly to ensure the section is visible and rendered
            // This is crucial for fixing the "initial jump" and ensuring accurate measurements
            requestAnimationFrame(() => {
                const headerHeight = getHeaderHeight();
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const scrollOffset = headerHeight + 30; // 30px buffer below the header. Adjust as desired.

                window.scrollTo({
                    top: targetPosition - scrollOffset,
                    behavior: 'smooth' // Smooth scrolling animation
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
        event.preventDefault(); // Prevent default anchor link behavior
        const targetId = this.getAttribute('href').substring(1);
        showSection(targetId);
        setActiveLink(targetId);
        window.location.hash = targetId; // Keep updating URL hash for sharing/bookmarking
    }

    // Attach click event to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Attach click event to the "Learn More" button
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', handleNavigation);
    }

    // Initial load - show the home section if no hash in URL, or the section specified by hash
    // Added a small timeout for initial load to ensure everything is rendered
    setTimeout(() => {
        if (window.location.hash) {
            const initialId = window.location.hash.substring(1);
            showSection(initialId); // This call will now also handle scrolling
            setActiveLink(initialId);
        } else {
            showSection('home'); // This call will also handle scrolling
            setActiveLink('home');
        }
    }, 100); // 100ms delay. Adjust if needed for slower loading.
});
