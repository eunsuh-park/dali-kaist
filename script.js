// Load reusable components
function loadComponent(elementId, template) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = template;
    }
}

// Adjust main padding based on nav height
function adjustMainPadding() {
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    if (nav && main) {
        const navHeight = nav.offsetHeight;
        main.style.marginTop = navHeight + 'px';
    }
}

// Load nav and footer, then set active navigation
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponent('nav-placeholder', navTemplate);
    loadComponent('footer-placeholder', footerTemplate);

    // Active navigation highlighting (for multi-page setup)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Adjust main padding after components are loaded
    adjustMainPadding();
});

// Adjust padding on window resize
window.addEventListener('resize', adjustMainPadding);

// Hamburger menu toggle
document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Close menu when clicking outside
    if (!e.target.closest('.nav-container')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }

    // Close menu when clicking a link
    if (e.target.closest('.nav-links a')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});
