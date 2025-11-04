// Publications data loaded from JavaScript file
// publicationsData is defined in publications-data.js

// Load publications from JavaScript data file
function loadPublications() {
    return new Promise((resolve, reject) => {
        try {
            // publicationsData should be loaded from publications-data.js before this script runs
            if (typeof publicationsData === 'undefined') {
                console.warn('publicationsData not found. Make sure publications-data.js is loaded before publications.js');
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.innerHTML = '<p style="text-align: center; color: var(--text-color-light); padding: 2rem;">Publications data is being loaded. Please ensure publications-data.js file exists.</p>';
                }
                reject(new Error('Publications data not found'));
                return;
            }
            
            // Group publications by year
            const publicationsByYear = groupByYear(publicationsData);
            
            // Generate sidebar menu
            generateSidebarMenu(publicationsByYear);
            
            // Generate publication cards
            generatePublicationCards(publicationsByYear);
            
            resolve();
        } catch (error) {
            console.error('Error loading publications:', error);
            // Show fallback message
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.innerHTML = '<p style="text-align: center; color: var(--text-color-light); padding: 2rem;">Error loading publications data.</p>';
            }
            reject(error);
        }
    });
}

// Extract year from date string (e.g., "Mar 2025" -> "2025")
function extractYear(dateString) {
    if (!dateString) return null;
    
    // Try to extract 4-digit year
    const yearMatch = dateString.match(/\b(20\d{2})\b/);
    if (yearMatch) {
        return yearMatch[1];
    }
    
    // Fallback: try Date2 field
    return null;
}

// Filter only Article type publications
function filterArticles(publications) {
    return publications.filter(pub => pub.Type === 'Article');
}

// Group publications by year
function groupByYear(publications) {
    // Filter only Article type
    const articles = filterArticles(publications);
    
    const grouped = {};
    articles.forEach(pub => {
        // Try Date field first, then Date2, then Year
        let year = extractYear(pub.Date) || extractYear(pub.Date2) || pub.Year || pub.year || '';
        
        if (year) {
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(pub);
        }
    });
    return grouped;
}

// Generate sidebar menu with year counts
function generateSidebarMenu(publicationsByYear) {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (!sidebarMenu) return;
    
    sidebarMenu.innerHTML = '';
    
    // Get years sorted in descending order
    const years = Object.keys(publicationsByYear).sort((a, b) => b - a);
    
    years.forEach((year, index) => {
        const count = publicationsByYear[year].length;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${year}`;
        a.textContent = year;
        if (index === 0) {
            a.classList.add('active');
        }
        
        // Add count
        const countSpan = document.createElement('span');
        countSpan.className = 'year-count';
        countSpan.textContent = ` (${count})`;
        a.appendChild(countSpan);
        
        li.appendChild(a);
        sidebarMenu.appendChild(li);
    });
}

// Generate publication cards
function generatePublicationCards(publicationsByYear) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    mainContent.innerHTML = '';
    
    // Get years sorted in descending order
    const years = Object.keys(publicationsByYear).sort((a, b) => b - a);
    
    years.forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'publication-year';
        yearSection.id = year;
        
        const h3 = document.createElement('h3');
        h3.textContent = year;
        yearSection.appendChild(h3);
        
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'publication-cards';
        
        publicationsByYear[year].forEach(pub => {
            const card = createPublicationCard(pub);
            cardsContainer.appendChild(card);
        });
        
        yearSection.appendChild(cardsContainer);
        mainContent.appendChild(yearSection);
    });
}

// Create a publication card
function createPublicationCard(pub) {
    const card = document.createElement('div');
    card.className = 'publication-card';
    
    const imageDiv = document.createElement('div');
    imageDiv.className = 'publication-image';
    const img = document.createElement('img');
    img.src = '../../shared/assets/images/members/jeong-nam_kim.jpg';
    img.alt = pub.Title || 'Publication';
    imageDiv.appendChild(img);
    card.appendChild(imageDiv);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'publication-content';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'publication-title';
    titleDiv.textContent = pub.Title || '';
    contentDiv.appendChild(titleDiv);
    
    // Add Authors if available
    if (pub.Authors || pub.authors) {
        const authorsDiv = document.createElement('div');
        authorsDiv.className = 'publication-authors';
        authorsDiv.textContent = pub.Authors || pub.authors || '';
        contentDiv.appendChild(authorsDiv);
    }
    
    // Add Date if available
    if (pub.Date || pub.Date2) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'publication-date';
        dateDiv.textContent = pub.Date || pub.Date2 || '';
        contentDiv.appendChild(dateDiv);
    }
    
    // Add ETC as venue if available
    if (pub.ETC) {
        const venueDiv = document.createElement('div');
        venueDiv.className = 'publication-venue';
        venueDiv.textContent = pub.ETC;
        contentDiv.appendChild(venueDiv);
    }
    
    // Add action button directly in card content
    const pdfUrl = pub.URL || pub.URL2 || pub.URL3 || '';
    if (pdfUrl) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'publication-actions';
        
        // Use action-button component with primary style
        const buttonHtml = getActionButtonTemplate({
            type: 'primary',
            href: pdfUrl,
            text: 'go to ResearchGate',
            target: '_blank',
            rel: 'noopener noreferrer',
            ariaLabel: 'Go to ResearchGate'
        });
        
        actionsDiv.innerHTML = buttonHtml;
        contentDiv.appendChild(actionsDiv);
    }
    
    card.appendChild(contentDiv);
    
    return card;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPublications().then(() => {
        // Re-initialize scroll-based sidebar activation after publications are loaded
        initializeScrollSidebar();
    });
});

// Function to initialize scroll-based sidebar activation
function initializeScrollSidebar() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (!sidebarMenu) return;

    // Get all sections that can be observed
    const sections = document.querySelectorAll('.publication-year');
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
                    
                    // Check if tablet or mobile
                    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
                    const isMobile = window.innerWidth <= 767;
                    // On tablet and mobile, add extra offset equal to nav height to show the year subtitle
                    const additionalOffset = (isTablet || isMobile) ? navHeight : 0;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - additionalOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

