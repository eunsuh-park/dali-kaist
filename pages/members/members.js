// Member detail data
const memberDetails = {
    'jeong-nam-kim': {
        name: 'Jeong-Nam Kim, Ph.D.',
        image: '../../shared/assets/images/members/jeong-nam_kim_clean.jpg',
        email: 'layinformatics@kaist.ac.kr',
        profileUrl: 'https://example.com/profile/jeong-nam-kim',
        description: 'I study communicative action and informatics among lay problem solvers. I constructed the situational theory of problem solving (STOPS) and the model of cognitive arrest and epistemic inertia among lay problem solvers (vs scientists) with Jim Grunig. I work on a theory of information markets to explain the processes and problems from information trafficking among social actors such as pseudo-information, biases, failing information markets, and fading public delegation to social institutions.',
        skills: [
            'Communication',
            'Public Relations',
            'Mass Communication',
            'New Media Technology',
            'Communication Theory',
            'Media Studies',
            'Strategic Communication',
            'Communication Management',
            'New Media',
            'Communication Science'
        ]
    },
    'jen-sern-tham': {
        name: 'Jen Sern Tham',
        image: '../../shared/assets/images/members/jen_sern_tham.jpg',
        email: 'jensern.tham@kaist.ac.kr',
        profileUrl: 'https://example.com/profile/jen-sern-tham',
        description: 'My research focuses on health communication, information behavior, and mental health. I examine how individuals seek, process, and use health information in their decision-making processes. My work contributes to understanding communication patterns in health contexts and their impact on public well-being.',
        skills: [
            'Health Communication',
            'Information Behavior',
            'Mental Health',
            'Public Health',
            'Health Information Seeking',
            'Behavioral Communication'
        ]
    },
    'si-hyeok-lee': {
        name: 'Si Hyeok Lee',
        image: '../../shared/assets/images/members/si_hyeok_lee.jpg',
        email: 'sihyeok.lee@kaist.ac.kr',
        profileUrl: 'https://example.com/profile/si-hyeok-lee',
        description: 'I conduct research in communication studies and media research. My work explores the dynamics of media consumption, information processing, and communication patterns in digital environments. I investigate how media technologies influence public communication behaviors.',
        skills: [
            'Communication Research',
            'Media Studies',
            'Digital Media',
            'Media Effects',
            'Communication Theory'
        ]
    },
    'seungyoon-lee': {
        name: 'Seungyoon Lee, Ph.D.',
        image: '../../shared/assets/images/members/seungyoon_lee.jpg',
        email: 'seungyoon.lee@uky.edu',
        profileUrl: 'https://example.com/profile/seungyoon-lee',
        description: 'Former Ph.D. student of DaLI Lab, currently serving as Assistant Professor at the Department of Communication, University of Kentucky. My research focuses on strategic communication and organizational communication, with particular interest in crisis communication and stakeholder engagement.',
        skills: [
            'Strategic Communication',
            'Organizational Communication',
            'Crisis Communication',
            'Stakeholder Engagement',
            'Public Relations'
        ]
    },
    'yana-hashim': {
        name: 'Yana Hashim, Ph.D.',
        image: '../../shared/assets/images/members/yana_hashim.jpg',
        email: 'yana.hashim@uc.edu',
        profileUrl: 'https://example.com/profile/yana-hashim',
        description: 'Former Ph.D. student of DaLI Lab, currently working as Research Fellow at the Department of Communication, University of California. My research explores communication theory, media effects, and public opinion formation in digital environments.',
        skills: [
            'Communication Theory',
            'Media Effects',
            'Public Opinion',
            'Digital Communication',
            'Research Methods'
        ]
    }
};

// Affiliated member data for hover effects
const affiliatedMemberData = {
    'alessandra-mazzei': {
        bio: 'Expert in strategic communication and public relations with extensive research on organizational communication and stakeholder engagement.',
        profileUrl: 'https://example.com/profile/alessandra-mazzei',
        email: 'alessandra.mazzei@kaist.ac.kr'
    },
    'david-ebert': {
        bio: 'Researcher focusing on communication research and media studies, exploring digital media impacts and communication patterns.',
        profileUrl: 'https://example.com/profile/david-ebert',
        email: 'david.ebert@kaist.ac.kr'
    },
    'lisa-tam': {
        bio: 'Communication theory and media research scholar investigating information processing and communication behaviors.',
        profileUrl: 'https://example.com/profile/lisa-tam',
        email: 'lisa.tam@kaist.ac.kr'
    },
    'loarre-andreu-perez': {
        bio: 'Strategic communication and public relations expert with focus on crisis communication and organizational reputation.',
        profileUrl: 'https://example.com/profile/loarre-perez',
        email: 'loarre.perez@kaist.ac.kr'
    },
    'ming-ming-chiu': {
        bio: 'Communication and media studies researcher examining media effects and public opinion formation.',
        profileUrl: 'https://example.com/profile/ming-ming-chiu',
        email: 'mingming.chiu@kaist.ac.kr'
    },
    'myoung-gi-chon': {
        bio: 'Social media and digital activism researcher exploring communication behavior in online environments.',
        profileUrl: 'https://example.com/profile/myoung-gi-chon',
        email: 'myounggi.chon@kaist.ac.kr'
    },
    'soo-yun-kim': {
        bio: 'Communication research and media studies scholar investigating information processing and media consumption patterns.',
        profileUrl: 'https://example.com/profile/soo-yun-kim',
        email: 'sooyun.kim@kaist.ac.kr'
    },
    'daniel-thompson': {
        bio: 'Communication theory and media research expert focusing on information markets and communication dynamics.',
        profileUrl: 'https://example.com/profile/daniel-thompson',
        email: 'daniel.thompson@kaist.ac.kr'
    },
    'valentina-martino': {
        bio: 'Communication research scholar examining media studies and public communication behaviors in digital contexts.',
        profileUrl: 'https://example.com/profile/valentina-martino',
        email: 'valentina.martino@kaist.ac.kr'
    },
    'yu-won-oh': {
        bio: 'Communication and media studies researcher exploring information processing and communication patterns.',
        profileUrl: 'https://example.com/profile/yu-won-oh',
        email: 'yuwon.oh@kaist.ac.kr'
    }
};

const NAV_SCROLL_OFFSET = 80;
let lastSelectedMemberElement = null;

function scrollToElementAfterRender(element) {
    if (!element) return;
    requestAnimationFrame(() => {
        const navHeight = 64;
        const extraOffset = 16;
        const rect = element.getBoundingClientRect();
        const target = rect.top + window.pageYOffset - (navHeight + extraOffset);
        window.scrollTo({ top: target > 0 ? target : 0, behavior: 'smooth' });
    });
}

/**
 * Initialize detail header using detail-header component
 * @param {string} parentElementId - 상위 요소의 ID (페이지명이 포함된 요소, 예: 'member-detail', 'activity-detail')
 * @param {Object} options - 헤더 옵션
 * @param {string} options.title - 제목 텍스트
 * @param {string} [options.date] - 날짜 (선택사항, member 상세에서는 사용하지 않음)
 * @param {string} options.backButtonId - 뒤로가기 버튼의 ID
 * @param {string} options.backButtonAriaLabel - 뒤로가기 버튼의 aria-label
 * @param {Function} options.onBackClick - 뒤로가기 버튼 클릭 핸들러
 */
function initializeDetailHeader(parentElementId, options) {
    // Find parent element by ID
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement || typeof getDetailHeaderTemplate === 'undefined') {
        return;
    }
    
    // Find detail-header element inside parent
    const headerElement = parentElement.querySelector('#detail-header');
    if (!headerElement) {
        return;
    }
    
    const {
        title,
        date,
        backButtonId,
        backButtonAriaLabel,
        onBackClick,
        titleId = ''
    } = options;
    
    // Create header using detail-header component
    const headerHtml = getDetailHeaderTemplate({
        backButtonId: backButtonId,
        backButtonAriaLabel: backButtonAriaLabel,
        title: title,
        date: date, // undefined for members (no date display)
        titleId: titleId
    });
    
    headerElement.innerHTML = headerHtml;
    
    // Add click handler for back button
    const backButton = document.getElementById(backButtonId);
    if (backButton && onBackClick) {
        backButton.addEventListener('click', onBackClick);
    }
}

// Show member detail
function showMemberDetail(memberId) {
    const memberList = document.getElementById('members-content');
    const memberDetail = document.getElementById('member-detail');
    const memberInfo = memberDetails[memberId];
    
    if (!memberInfo) {
        console.warn(`Member detail not found for: ${memberId}`);
        return;
    }
    
    // Hide member list
    memberList.style.display = 'none';
    
    // Show detail view
    memberDetail.style.display = 'block';
    
    // Add class to body to hide sidebar on tablet/mobile
    document.body.classList.add('detail-view-open');
    
    // Initialize detail header using detail-header component
    initializeDetailHeader('member-detail', {
        title: memberInfo.name,
        date: undefined, // No date for members
        backButtonId: 'back-to-members',
        backButtonAriaLabel: 'Back to members list',
        onBackClick: showMembersList,
        titleId: 'member-detail-name'
    });
    
    // Build detail content
    const detailContent = document.getElementById('member-detail-info');
    
    // Check if this is an alumni member (no image available)
    const isAlumni = memberId === 'seungyoon-lee' || memberId === 'yana-hashim';
    const imageHtml = isAlumni 
        ? '<div class="member-detail-placeholder"></div>'
        : `<img src="${memberInfo.image}" alt="${memberInfo.name}">`;
    
    // Actions buttons HTML (Affiliated 스타일과 동일)
    const actionsHtml = (memberInfo.profileUrl || memberInfo.email) ? `
        <div class="member-detail-actions">
            ${memberInfo.profileUrl ? getActionButtonTemplate({
                type: 'profile',
                href: memberInfo.profileUrl,
                text: 'View Profile',
                target: '_blank',
                rel: 'noopener noreferrer',
                ariaLabel: `View ${memberInfo.name}'s profile`
            }) : ''}
            ${memberInfo.email ? getEmailIconButtonTemplate({
                email: memberInfo.email,
                ariaLabel: `Send email to ${memberInfo.email}`
            }) : ''}
            ${memberInfo.email ? `<span class="member-detail-email-text">${memberInfo.email}</span>` : ''}
        </div>
    ` : '';
    
    detailContent.innerHTML = `
        <div class="member-detail-layout">
            <div class="member-detail-image">
                ${imageHtml}
                ${actionsHtml}
            </div>
            <div class="member-detail-text">
                <div class="member-detail-description">
                    <p>${memberInfo.description}</p>
                </div>
                <div class="member-detail-skills">
                    <h5>Skills and Expertise</h5>
                    <div class="chips-container">
                        ${memberInfo.skills.map(skill => `<div class="chip">${skill}</div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to members list
function showMembersList() {
    const memberList = document.getElementById('members-content');
    const memberDetail = document.getElementById('member-detail');
    
    memberList.style.display = 'block';
    memberDetail.style.display = 'none';
    
    // Remove class from body to show sidebar on tablet/mobile
    document.body.classList.remove('detail-view-open');
    
    scrollToElementAfterRender(lastSelectedMemberElement);
}

// Initialize member card click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all member cards
    const memberCards = document.querySelectorAll('.member');
    memberCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent clicking on links inside member card
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const memberId = this.getAttribute('data-member-id');
            if (memberId && memberDetails[memberId]) {
                lastSelectedMemberElement = this;
                showMemberDetail(memberId);
            }
        });
    });
    
    // Add click handlers to alumni items
    const alumniItems = document.querySelectorAll('.alumni-item');
    alumniItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const memberId = this.getAttribute('data-member-id');
            if (memberId && memberDetails[memberId]) {
                lastSelectedMemberElement = this;
                showMemberDetail(memberId);
            }
        });
    });
    
    // Affiliated members: 클릭 토글 및 자동 숨김 (타블렛/모바일)
    const affiliatedMembers = document.querySelectorAll('.affiliated-member');
    const activeTimeouts = new Map(); // 각 멤버별 타이머 저장
    
    // 화면 크기 확인 함수
    function isTabletOrMobile() {
        return window.innerWidth <= 1024;
    }
    
    affiliatedMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            // 링크 클릭 시에는 상세 페이지로 이동
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // 타블렛/모바일에서만 클릭 토글 작동
            if (!isTabletOrMobile()) {
                return;
            }
            
            e.stopPropagation();
            
            // 현재 멤버의 기존 타이머 취소
            const memberId = this.getAttribute('data-affiliated-id');
            if (activeTimeouts.has(memberId)) {
                clearTimeout(activeTimeouts.get(memberId));
                activeTimeouts.delete(memberId);
            }
            
            // 현재 상태 확인
            const isActive = this.classList.contains('active');
            
            // 다른 모든 affiliated-member의 active 제거 및 타이머 취소
            affiliatedMembers.forEach(m => {
                if (m !== this) {
                    m.classList.remove('active');
                    const otherId = m.getAttribute('data-affiliated-id');
                    if (activeTimeouts.has(otherId)) {
                        clearTimeout(activeTimeouts.get(otherId));
                        activeTimeouts.delete(otherId);
                    }
                }
            });
            
            // 토글
            if (isActive) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
                
                // 5초 후 자동으로 숨김
                const timeoutId = setTimeout(() => {
                    this.classList.remove('active');
                    activeTimeouts.delete(memberId);
                }, 5000);
                activeTimeouts.set(memberId, timeoutId);
            }
        });
    });
    
    // 화면 크기 변경 시 active 상태 초기화
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isTabletOrMobile()) {
                affiliatedMembers.forEach(member => {
                    member.classList.remove('active');
                });
                // 모든 타이머 취소
                activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                activeTimeouts.clear();
            }
        }, 100);
    });
});

