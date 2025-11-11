/**
 * Detail Header Component
 * 상세페이지 헤더 컴포넌트 (뒤로가기 버튼 + 제목 + 하단 구분선)
 * 
 * @param {Object} options - 헤더 옵션
 * @param {string} options.backButtonId - 뒤로가기 버튼의 ID
 * @param {string} options.backButtonAriaLabel - 뒤로가기 버튼의 aria-label
 * @param {string} options.title - 제목 텍스트
 * @param {string} options.date - 날짜 (선택사항, undefined면 표시 안함)
 * @param {string} options.titleId - 제목 요소의 ID (선택사항)
 * @returns {string} HTML 템플릿 문자열
 */
function getDetailHeaderTemplate(options) {
    const {
        backButtonId,
        backButtonAriaLabel,
        title,
        date,
        titleId = '',
        titleTag = ''
    } = options;

    // Back button HTML
    const backButtonHtml = getBackButtonTemplate(backButtonId, backButtonAriaLabel);

    // Title HTML with optional date
    let titleHtml = '';
    const formattedTitle = titleTag ? `<${titleTag}>${title}</${titleTag}>` : title;

    if (date) {
        // Activity style: title with date
        titleHtml = `
            <h2 class="detail-header-title detail-header-title-with-date" ${titleId ? `id="${titleId}"` : ''}>
                <span class="detail-header-title-text">${formattedTitle}</span>
                <span class="detail-header-title-date">${date}</span>
            </h2>
        `;
    } else {
        // Default style: title only (date span is included but empty for CSS hiding)
        titleHtml = `
            <h2 class="detail-header-title" ${titleId ? `id="${titleId}"` : ''}>
                <span class="detail-header-title-text">${formattedTitle}</span>
                <span class="detail-header-title-date"></span>
            </h2>
        `;
    }

    return `
<div class="detail-header">
    ${backButtonHtml}
    ${titleHtml}
</div>
`;
}

