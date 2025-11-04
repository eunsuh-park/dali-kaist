/**
 * Chip Component
 * 칩(태그) 컴포넌트
 * 
 * @param {string} text - 칩에 표시할 텍스트
 * @returns {string} HTML 템플릿 문자열
 */
function getChipTemplate(text) {
    if (!text) {
        console.warn('Chip: text is required');
        return '';
    }
    return `<div class="chip">${text}</div>`;
}

/**
 * Chips Container Component
 * 칩 컨테이너 컴포넌트
 * 
 * @param {Array<string>} chips - 칩 텍스트 배열
 * @returns {string} HTML 템플릿 문자열
 */
function getChipsContainerTemplate(chips) {
    if (!chips || !Array.isArray(chips) || chips.length === 0) {
        return '';
    }
    
    const chipsHtml = chips.map(chip => getChipTemplate(chip)).join('');
    return `<div class="chips-container">${chipsHtml}</div>`;
}

