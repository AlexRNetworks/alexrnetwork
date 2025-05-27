document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const learnMoreButton = document.getElementById('learnMoreButton'); // Get the learn more button
    const contentSections = document.querySelectorAll('main .content-section');

    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
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
        window.location.hash = targetId; // Update URL hash for sharing/bookmarking
    }

    // Attach click event to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Attach click event to the "Learn More" button
    if (learnMoreButton) { // Ensure the button exists before adding listener
        learnMoreButton.addEventListener('click', handleNavigation);
    }


    // Initial load - show the home section if no hash in URL
    if (window.location.hash) {
        const initialId = window.location.hash.substring(1);
        showSection(initialId);
        setActiveLink(initialId);
    } else {
        showSection('home');
        setActiveLink('home');
    }
});