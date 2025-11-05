// Path resolver is expected to be loaded before this file
// getBasePath() function is defined in shared/utils/path-resolver.js
// If getBasePath is not defined, define a fallback
if (typeof getBasePath === 'undefined') {
    console.warn('getBasePath() not found. Make sure path-resolver.js is loaded before footer.js');
    function getBasePath() {
        return '';
    }
}

function getFooterTemplate() {
    const basePath = getBasePath();
    return `
<footer>
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-info">
                <p><strong>Debiasing and Lay Informatics Lab</strong><br>
                Room 2226, N5, KAIST<br>
                291 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea</p>
            </div>
            <div class="footer-contact">
                <p><strong>Prof. Jeong-Nam Kim</strong><br>
                layinformatics@kaist.ac.kr</p>
            </div>
        </div>
    </div>
</footer>
`;
}

// For backward compatibility
const footerTemplate = getFooterTemplate();
