/**
 * Action Button Component
 * 재사용 가능한 액션 버튼 컴포넌트 (affiliated-button 스타일)
 * 
 * @param {Object} options - 버튼 옵션
 * @param {string} options.type - 버튼 타입: 'profile' (텍스트 버튼), 'icon' (아이콘 버튼), 또는 'primary' (primary 색상 버튼)
 * @param {string} options.href - 링크 URL
 * @param {string} [options.text] - 텍스트 (profile/primary 타입일 때 사용)
 * @param {string} [options.iconSvg] - SVG 아이콘 HTML (icon/primary 타입일 때 선택사항)
 * @param {string} [options.ariaLabel] - 접근성을 위한 aria-label
 * @param {string} [options.target] - 링크 타겟 (기본값: '_self')
 * @param {string} [options.rel] - rel 속성 (기본값: '')
 * @param {string} [options.dataAttr] - data 속성 (예: {email: 'test@example.com'})
 * @returns {string} HTML 템플릿 문자열
 */
function getActionButtonTemplate(options) {
    const {
        type,
        href,
        text,
        iconSvg,
        ariaLabel,
        target = '_self',
        rel = '',
        dataAttr = {}
    } = options;

    if (!type || !href) {
        console.warn('ActionButton: type and href are required');
        return '';
    }

    let buttonClass = '';
    let buttonContent = '';
    let attributes = '';

    if (type === 'profile') {
        // Profile button: 텍스트가 있는 버튼
        if (!text) {
            console.warn('ActionButton: text is required for profile type');
            return '';
        }
        buttonClass = 'action-button action-button-profile';
        buttonContent = text;
    } else if (type === 'icon') {
        // Icon button: 아이콘만 있는 버튼
        if (!iconSvg) {
            console.warn('ActionButton: iconSvg is required for icon type');
            return '';
        }
        buttonClass = 'action-button action-button-icon';
        buttonContent = iconSvg;
    } else if (type === 'primary') {
        // Primary button: primary 색상 배경의 버튼 (activity-url-button 스타일)
        if (!text) {
            console.warn('ActionButton: text is required for primary type');
            return '';
        }
        buttonClass = 'action-button action-button-primary';
        buttonContent = text;
        if (iconSvg) {
            buttonContent += ` ${iconSvg}`;
        }
    } else {
        console.warn('ActionButton: type must be "profile", "icon", or "primary"');
        return '';
    }

    // Build attributes
    const attrs = [];
    if (ariaLabel) attrs.push(`aria-label="${ariaLabel}"`);
    if (target) attrs.push(`target="${target}"`);
    if (rel) attrs.push(`rel="${rel}"`);
    
    // Add data attributes
    Object.keys(dataAttr).forEach(key => {
        attrs.push(`data-${key}="${dataAttr[key]}"`);
    });
    
    attributes = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    return `<a href="${href}" class="${buttonClass}"${attributes}>${buttonContent}</a>`;
}

