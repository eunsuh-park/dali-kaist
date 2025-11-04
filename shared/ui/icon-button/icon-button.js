/**
 * Icon Button Component
 * 아이콘 버튼 컴포넌트 (action-button과 동일한 높이)
 * 
 * @param {Object} options - 버튼 옵션
 * @param {string} options.iconSvg - SVG 아이콘 HTML
 * @param {string} options.href - 링크 URL
 * @param {string} [options.ariaLabel] - 접근성을 위한 aria-label
 * @param {string} [options.target] - 링크 타겟 (기본값: '_self')
 * @param {string} [options.rel] - rel 속성 (기본값: '')
 * @param {Object} [options.dataAttr] - data 속성 (예: {email: 'test@example.com'})
 * @returns {string} HTML 템플릿 문자열
 */
function getIconButtonTemplate(options) {
    const {
        iconSvg,
        href,
        ariaLabel,
        target = '_self',
        rel = '',
        dataAttr = {}
    } = options;

    if (!iconSvg || !href) {
        console.warn('IconButton: iconSvg and href are required');
        return '';
    }

    return getActionButtonTemplate({
        type: 'icon',
        href: href,
        iconSvg: iconSvg,
        ariaLabel: ariaLabel,
        target: target,
        rel: rel,
        dataAttr: dataAttr
    });
}

/**
 * Email Icon Button Helper
 * 이메일 아이콘 버튼을 쉽게 생성하는 헬퍼 함수
 * 
 * @param {Object} options - 버튼 옵션
 * @param {string} options.email - 이메일 주소
 * @param {string} [options.ariaLabel] - 접근성을 위한 aria-label (기본값: 'Send email to {email}')
 * @returns {string} HTML 템플릿 문자열
 */
function getEmailIconButtonTemplate(options) {
    const {
        email,
        ariaLabel
    } = options;

    if (!email) {
        console.warn('EmailIconButton: email is required');
        return '';
    }

    const label = ariaLabel || `Send email to ${email}`;
    const emailIconSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L8 9L14 4M2 4H14M2 4V12H14V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    return getIconButtonTemplate({
        iconSvg: emailIconSvg,
        href: `mailto:${email}`,
        ariaLabel: label,
        dataAttr: { email: email }
    });
}

