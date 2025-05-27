document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const learnMoreButton = document.getElementById('learnMoreButton');
    const contentSections = document.querySelectorAll('main .content-section');
    const header = document.querySelector('header'); // Get the header element

    // Function to get the current height of the fixed header
    function getHeaderHeight() {
        if (header) {
            // offsetHeight includes padding and border, giving us the full rendered height
            return header.offsetHeight;
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

            // Calculate the target scroll position, accounting for the fixed header
            const headerHeight = getHeaderHeight();
            // getBoundingClientRect().top gives position relative to viewport
            // window.pageYOffset gives current scroll position from top of document
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;

            // Scroll to the calculated position with an offset
            // Subtract header height to move content below header
            // Subtract an additional 20px as a buffer for more space below the header
            window.scrollTo({
                top: targetPosition - headerHeight - 20, // Adjust '-20' buffer as needed
                behavior: 'smooth' // Smooth scrolling animation
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
    if (window.location.hash) {
        const initialId = window.location.hash.substring(1);
        showSection(initialId); // This call will also handle the scrolling
        setActiveLink(initialId);
    } else {
        showSection('home'); // This call will also handle the scrolling
        setActiveLink('home');
    }
});
