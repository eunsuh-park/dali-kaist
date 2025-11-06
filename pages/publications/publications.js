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
    // const img = document.createElement('img');
    // img.src = '../../shared/assets/images/members/no_profile.jpg';
    // img.alt = pub.Title || 'Publication';
    // imageDiv.appendChild(img);
    const svgIcon = document.createElement('div');
    svgIcon.className = 'publication-icon';
    svgIcon.innerHTML = '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'><title>blockquote_line</title><g id="blockquote_line" fill=\'none\' fill-rule=\'evenodd\'><path d=\'M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z\'/><path fill=\'#D8D8D8FF\' d=\'M11.778 4.371a1 1 0 0 1-.15 1.407c-.559.452-.924.886-1.163 1.276a2 2 0 1 1-2.46 1.792c-.024-.492.02-1.15.293-1.892.326-.884.956-1.829 2.073-2.732a1 1 0 0 1 1.407.15ZM15 5a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2zM4 14a1 1 0 0 1 1-1h15a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2zM3.006 8.846a2 2 0 1 0 2.459-1.792c.239-.39.604-.824 1.164-1.276A1 1 0 1 0 5.37 4.222c-1.117.903-1.747 1.848-2.073 2.732a4.757 4.757 0 0 0-.292 1.892Z\'/></g></svg>';
    imageDiv.appendChild(svgIcon);
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

