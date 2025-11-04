/**
 * Back Button Component
 * 재사용 가능한 뒤로가기 버튼 컴포넌트
 * 
 * @param {string} id - 버튼의 고유 ID
 * @param {string} ariaLabel - 접근성을 위한 aria-label 속성
 * @returns {string} HTML 템플릿 문자열
 */
function getBackButtonTemplate(id, ariaLabel = 'Back') {
    return `
<button class="back-button" id="${id}" aria-label="${ariaLabel}">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</button>
`;
}

