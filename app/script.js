// Load reusable components
function loadComponent(elementId, template) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = template;
    }
}

// Load nav and footer, then set active navigation
document.addEventListener('DOMContentLoaded', function() {
    // Load components - get nav template dynamically to ensure correct path is calculated at runtime
    const currentNavTemplate = typeof getNavTemplate === 'function' ? getNavTemplate() : navTemplate;
    loadComponent('nav-placeholder', currentNavTemplate);
    loadComponent('footer-placeholder', footerTemplate);

    // Active navigation highlighting (for multi-page setup)
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let isActive = false;
        
        if (href) {
            // Normalize paths for comparison
            const normalizedHref = href.toLowerCase().replace(/^[#\/]+/, '').replace(/\/$/, '');
            const normalizedPath = currentPath.toLowerCase().replace(/^[\/]+/, '').replace(/\/$/, '');
            
            // Extract page name from href (e.g., "pages/research/research.html" -> "research")
            const hrefPage = normalizedHref.split('/').pop()?.replace('.html', '') || '';
            const pathPage = normalizedPath.split('/').pop()?.replace('.html', '') || '';
            
            // Check if current path includes the href
            if (normalizedPath.includes(normalizedHref) || normalizedHref.includes(normalizedPath)) {
                isActive = true;
            }
            // Check if page names match (e.g., "research" in both)
            else if (hrefPage && pathPage && (hrefPage === pathPage || pathPage.includes(hrefPage) || hrefPage.includes(pathPage))) {
                isActive = true;
            }
            // Special case for index.html at root
            else if ((currentPage === '' || currentPage === 'index.html' || normalizedPath.endsWith('index.html') || normalizedPath === '') && 
                     (normalizedHref === 'index.html' || normalizedHref === '')) {
                isActive = true;
            }
        }
        
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Go to Top 버튼 주입 (상세 페이지가 있는 페이지: activity/activity.html, publications/publications.html에만)
    const pagesWithDetailView = ['activity/activity.html', 'activity.html', 'publications/publications.html', 'publications.html'];
    if (pagesWithDetailView.includes(currentPage) || currentPath.includes('pages/activity/') || currentPath.includes('pages/publications/')) {
        const btn = document.createElement('button');
        btn.className = 'go-top';
        btn.setAttribute('aria-label', 'Go to top');
        btn.title = 'Go to top';
        btn.innerHTML = `
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <title>up_fill</title>
                <g id="up_fill" fill='none' fill-rule='evenodd'>
                    <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z'/>
                    <path fill='currentColor' d='M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.122l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12l5.657-5.658Z'/>
                </g>
            </svg>
        `;
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
                    
                    // Check if mobile (viewport width <= 767px)
                    const isMobile = window.innerWidth <= 767;
                    // On mobile, add extra offset equal to nav height to show the year subtitle
                    const additionalOffset = isMobile ? navHeight : 0;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - additionalOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
