// Path resolver is expected to be loaded before this file
// getBasePath() function is defined in shared/utils/path-resolver.js
// If getBasePath is not defined, define a fallback
if (typeof getBasePath === 'undefined') {
    console.warn('getBasePath() not found. Make sure path-resolver.js is loaded before nav.js');
    function getBasePath() {
        return '';
    }
}

function getNavTemplate() {
    const basePath = getBasePath();
    // Determine home page path based on current location
    const currentPath = window.location.pathname;
    const isRootIndex = currentPath.includes('index.html') && !currentPath.includes('app/') && !currentPath.includes('pages/');
    const homePath = isRootIndex ? 'index.html' : `${basePath}index.html`;
    
    return `
<nav>
    <div class="nav-container">
        <a class="nav-logo" href="${homePath}" aria-label="DALI Home">
            <img src="${basePath}shared/assets/images/svg/logo.svg" alt="DALI logo">
        </a>
        <button class="hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="nav-links">
            <li><a href="${basePath}pages/publications/publications.html">Publications</a></li>
            <li><a href="${basePath}pages/members/members.html">Members</a></li>
            <li><a href="${basePath}pages/activity/activity.html">Activity</a></li>
            <li><a href="${basePath}pages/contact/contact.html">Contact</a></li>
        </ul>
    </div>
    <div class="nav-overlay"></div>
</nav>
`;
}

// For backward compatibility, export template
// Note: This will be regenerated dynamically when DOMContentLoaded fires in script.js
const navTemplate = getNavTemplate();
