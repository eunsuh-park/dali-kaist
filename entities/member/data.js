// Member detail data
const memberDetails = {
    'jeong-nam-kim': {
        name: 'Jeong-Nam Kim, Ph.D.',
        image: '../../shared/assets/images/members/no_profile.png',
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
    
    // Set member name
    document.getElementById('member-detail-name').textContent = memberInfo.name;
    
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
            ${memberInfo.profileUrl ? `
            <a href="${memberInfo.profileUrl}" target="_blank" rel="noopener noreferrer" class="affiliated-profile-btn">View Profile</a>
            ` : ''}
            ${memberInfo.email ? `
            <a href="mailto:${memberInfo.email}" class="affiliated-email-btn" data-email="${memberInfo.email}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L8 9L14 4M2 4H14M2 4V12H14V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            ` : ''}
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
                    <h3>Skills and Expertise</h3>
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
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                showMemberDetail(memberId);
            }
        });
    });
    
    // Back button handler
    const backButton = document.getElementById('back-to-members');
    if (backButton) {
        backButton.addEventListener('click', showMembersList);
    }
});

