// Get base path based on current location
// This utility function calculates the relative path from the current page to the project root
// Supports both file:// and http:// protocols

function getBasePath() {
    // Handle both file:// and http:// protocols
    let path = window.location.pathname;
    
    // For file:// protocol, pathname might include drive letter
    // Extract just the file path part
    if (path.startsWith('/')) {
        // Remove leading slash for Windows paths like /C:/Users/...
        path = path.substring(1);
    }
    
    // Decode URL-encoded path (for file:// protocol with spaces like "AI%20Design")
    const decodedPath = decodeURIComponent(path);
    
    // Extract relative path from project root (dali-kaist folder)
    // Find the LAST occurrence of 'dali-kaist' in the path (to handle nested folders)
    // This handles cases like: .../dali-kaist/dali-kaist/app/index.html
    let lastDaliKaistIndex = -1;
    let searchIndex = 0;
    
    // Find the last occurrence of 'dali-kaist'
    while (true) {
        const index = decodedPath.indexOf('dali-kaist', searchIndex);
        if (index === -1) break;
        lastDaliKaistIndex = index;
        searchIndex = index + 1;
    }
    
    let relativePath = '';
    
    if (lastDaliKaistIndex !== -1) {
        // Get path after the last 'dali-kaist/'
        const afterDaliKaist = decodedPath.substring(lastDaliKaistIndex + 'dali-kaist'.length);
        if (afterDaliKaist.startsWith('/')) {
            relativePath = afterDaliKaist.substring(1);
        } else if (afterDaliKaist.startsWith('\\')) {
            // Handle Windows path separator
            relativePath = afterDaliKaist.substring(1).replace(/\\/g, '/');
        } else {
            relativePath = afterDaliKaist.replace(/\\/g, '/');
        }
    } else {
        // Fallback: use filename to determine
        const filename = decodedPath.split(/[/\\]/).pop() || '';
        if (filename === 'index.html') {
            return '';
        }
        relativePath = decodedPath.replace(/\\/g, '/');
    }
    
    // Extract filename from relative path
    const filename = relativePath.split('/').pop() || '';
    
    // Check if we're in app folder (app/index.html)
    if (relativePath.includes('app/')) {
        // If we're in app/index.html, we're at app root
        // Need to go up one level to reach project root
        if (filename === 'index.html' && relativePath === 'app/index.html') {
            return '../';
        }
        // If we're in app subdirectory, go up to project root
        return '../../';
    }
    // Check if we're in pages folder (pages/xxx/xxx.html)
    else if (relativePath.includes('pages/')) {
        // From pages/xxx/xxx.html, go up to project root
        return '../../';
    } 
    // Check if we're in shared folder (shared/ui/nav/nav.js, etc.)
    else if (relativePath.includes('shared/')) {
        // From shared/xxx/xxx.js, go up to project root
        // Calculate depth: shared/ui/nav/nav.js -> 3 levels up
        const depth = relativePath.split('/').length - 1; // -1 for filename
        return '../'.repeat(depth);
    }
    // If filename is index.html or empty, we're at root (legacy - should not happen)
    else if (filename === 'index.html' || filename === '' || relativePath === '') {
        return '';
    }
    // Otherwise, we're in some subdirectory
    else {
        return '../';
    }
}

