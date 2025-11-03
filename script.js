// Load reusable components
function loadComponent(elementId, template) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = template;
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

    // Go to Top 버튼 주입 (contact.html과 publications.html 제외)
    const excludedPages = ['contact.html', 'publications.html'];
    if (!excludedPages.includes(currentPage)) {
        const btn = document.createElement('button');
        btn.className = 'go-top';
        btn.setAttribute('aria-label', 'Go to top');
        btn.title = 'Go to top';
        btn.innerHTML = '↑';
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);
    }
});

// Hamburger menu toggle
document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    // Close menu when clicking outside
    if (!e.target.closest('.nav-container')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        if (hamburger && navLinks && overlay) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    // Close menu when clicking a link
    if (e.target.closest('.nav-links a')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        if (hamburger && navLinks && overlay) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    // Close menu when clicking overlay
    if (e.target.closest('.nav-overlay')) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        if (hamburger && navLinks && overlay) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
});

// Scroll animation for about section
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate highlight items with delay
                    const highlightItems = entry.target.querySelectorAll('.highlight-item');
                    highlightItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(aboutSection);
    }
});

// Active sidebar menu based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (!sidebarMenu) return;

    // Get all sections that can be observed
    const sections = document.querySelectorAll('.research-year, .publication-year, .member-group');
    if (sections.length === 0) return;

    // Get all sidebar menu links
    const menuLinks = sidebarMenu.querySelectorAll('a');

    // Function to update active menu item
    function updateActiveMenu(activeId) {
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href.replace('#', '');
            if (targetId === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Function to determine which section should be active based on scroll position
    function getActiveSection() {
        const navHeight = 64; // --nav-height value
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportTop = scrollTop + navHeight + 100; // Offset for better detection

        let activeSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            if (!section.id) return;
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionBottom = sectionTop + rect.height;

            // Check if section is visible and calculate distance from viewport top
            if (sectionTop <= viewportTop && sectionBottom >= viewportTop) {
                const distance = Math.abs(sectionTop - viewportTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = section;
                }
            } else if (sectionTop > viewportTop && sectionTop - viewportTop < minDistance) {
                // If we haven't scrolled past any section yet, use the first one
                minDistance = sectionTop - viewportTop;
                activeSection = section;
            }
        });

        // If no section is found, use the first section
        if (!activeSection && sections.length > 0 && sections[0].id) {
            activeSection = sections[0];
        }

        return activeSection;
    }

    // Update active menu based on scroll position
    function updateActiveMenuOnScroll() {
        const activeSection = getActiveSection();
        if (activeSection && activeSection.id) {
            updateActiveMenu(activeSection.id);
        }
    }

    // Handle initial page load
    updateActiveMenuOnScroll();

    // Handle scroll events with throttling
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            updateActiveMenuOnScroll();
            isScrolling = true;
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            updateActiveMenuOnScroll();
        }, 50);
    }, { passive: true });

    // Keep existing click functionality - smooth scroll to section
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = 64; // --nav-height value
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
