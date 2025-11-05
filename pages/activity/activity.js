// Activity IDs in order
const activityIds = [
    'research-seminar-2024',
    'conference-presentation-2024',
    'workshop-2024',
    'research-collaboration-2023',
    'publication-release-2023',
    'lab-meeting-2023',
    'guest-lecture-2023',
    'field-research-2023',
    'data-analysis-2023',
    'research-presentation-2023',
    'team-building-2023',
    'paper-submission-2023',
    'research-discussion-2023',
    'collaboration-meeting-2023',
    'publication-award-2023',
    'annual-review-2022'
];

// Activity detail data
const activityDetails = {
    'research-seminar-2024': {
        title: 'Research Seminar',
        date: '2024-03-15',
        source: 'DaLI Lab @ KAIST',
        description: 'This research seminar explored the latest findings in communication theory and information science. The seminar featured presentations on situational theory of problem solving and discussed implications for strategic communication practices.',
        url: 'https://example.com/news/research-seminar-2024'
    },
    'conference-presentation-2024': {
        title: 'Conference Presentation',
        date: '2024-02-20',
        source: 'International Communication Conference',
        description: 'Our team presented research findings on digital media effects and public opinion formation at the International Communication Conference. The presentation highlighted innovative approaches to studying information markets.',
        url: 'https://example.com/news/conference-2024'
    },
    'workshop-2024': {
        title: 'Workshop',
        date: '2024-01-10',
        source: 'Strategic Communication Workshop',
        description: 'A comprehensive workshop on strategic communication strategies and their applications in various contexts. Participants engaged in hands-on activities and case study discussions.',
        url: 'https://example.com/news/workshop-2024'
    },
    'research-collaboration-2023': {
        title: 'Research Collaboration',
        date: '2023-12-05',
        source: 'DaLI Lab @ KAIST',
        description: 'Initiated a new research collaboration focusing on cognitive biases and epistemic inertia in public decision-making processes. The collaboration brings together experts from multiple institutions.',
        url: 'https://example.com/news/collaboration-2023'
    },
    'publication-release-2023': {
        title: 'Publication Release',
        date: '2023-11-18',
        source: 'Journal of Communication',
        description: 'New publication released in the Journal of Communication exploring information processing and decision-making patterns among lay problem solvers. The research contributes to our understanding of public communication behaviors.',
        url: 'https://example.com/news/publication-2023'
    },
    'lab-meeting-2023': {
        title: 'Lab Meeting',
        date: '2023-10-30',
        source: 'DaLI Lab @ KAIST',
        description: 'Regular lab meeting discussing ongoing research projects, upcoming deadlines, and collaborative opportunities. Team members shared progress updates and future research plans.',
        url: 'https://example.com/news/lab-meeting-2023'
    },
    'guest-lecture-2023': {
        title: 'Guest Lecture',
        date: '2023-09-25',
        source: 'KAIST Communication Department',
        description: 'Invited guest lecture on communication theory and media studies. The lecture provided insights into current trends in communication research and their practical applications.',
        url: 'https://example.com/news/guest-lecture-2023'
    },
    'field-research-2023': {
        title: 'Field Research',
        date: '2023-08-15',
        source: 'Public Information Survey',
        description: 'Conducted comprehensive field research on public information seeking behaviors and information market dynamics. The study involved extensive data collection and analysis.',
        url: 'https://example.com/news/field-research-2023'
    },
    'data-analysis-2023': {
        title: 'Data Analysis',
        date: '2023-07-22',
        source: 'DaLI Lab @ KAIST',
        description: 'Completed data analysis phase of major research project examining information trafficking patterns and their effects on public decision-making processes.',
        url: 'https://example.com/news/data-analysis-2023'
    },
    'research-presentation-2023': {
        title: 'Research Presentation',
        date: '2023-06-10',
        source: 'Academic Conference',
        description: 'Presented research findings at major academic conference focusing on communication theory and strategic communication practices. The presentation received positive feedback from the academic community.',
        url: 'https://example.com/news/presentation-2023'
    },
    'team-building-2023': {
        title: 'Team Building',
        date: '2023-05-28',
        source: 'DaLI Lab @ KAIST',
        description: 'Team building event fostering collaboration and strengthening relationships among lab members. Activities included research discussions and social interactions.',
        url: 'https://example.com/news/team-building-2023'
    },
    'paper-submission-2023': {
        title: 'Paper Submission',
        date: '2023-04-12',
        source: 'Journal Submission',
        description: 'Submitted research paper for peer review examining cognitive biases and information market failures. The paper represents significant contribution to the field.',
        url: 'https://example.com/news/paper-submission-2023'
    },
    'research-discussion-2023': {
        title: 'Research Discussion',
        date: '2023-03-20',
        source: 'DaLI Lab @ KAIST',
        description: 'Research discussion session reviewing current literature and exploring new research directions. Team members engaged in critical analysis and idea exchange.',
        url: 'https://example.com/news/discussion-2023'
    },
    'collaboration-meeting-2023': {
        title: 'Collaboration Meeting',
        date: '2023-02-08',
        source: 'Inter-University Research',
        description: 'Collaboration meeting with researchers from other institutions to discuss joint research initiatives and potential collaborative projects in communication studies.',
        url: 'https://example.com/news/collaboration-meeting-2023'
    },
    'publication-award-2023': {
        title: 'Publication Award',
        date: '2023-01-15',
        source: 'Best Paper Award',
        description: 'Received Best Paper Award for outstanding contribution to communication research. The award recognizes excellence in theoretical development and empirical rigor.',
        url: 'https://example.com/news/award-2023'
    },
    'annual-review-2022': {
        title: 'Annual Review',
        date: '2022-12-30',
        source: 'DaLI Lab @ KAIST',
        description: 'Annual review of research accomplishments, publications, and future research directions. The review highlighted significant progress and achievements throughout the year.',
        url: 'https://example.com/news/annual-review-2022'
    }
};

// Get previous and next activity IDs
function getPreviousActivityId(currentId) {
    const currentIndex = activityIds.indexOf(currentId);
    if (currentIndex > 0) {
        return activityIds[currentIndex - 1];
    }
    return null;
}

function getNextActivityId(currentId) {
    const currentIndex = activityIds.indexOf(currentId);
    if (currentIndex < activityIds.length - 1) {
        return activityIds[currentIndex + 1];
    }
    return null;
}

// Store current activity ID
let currentActivityId = null;

// Show activity detail
function showActivityDetail(activityId) {
    const activityList = document.getElementById('activity-content');
    const activityDetail = document.getElementById('activity-detail');
    const activityInfo = activityDetails[activityId];
    
    if (!activityInfo) {
        console.warn(`Activity detail not found for: ${activityId}`);
        return;
    }
    
    currentActivityId = activityId;
    
    // Hide activity list
    activityList.style.display = 'none';
    
    // Show detail view
    activityDetail.style.display = 'block';
    
    // Create and insert detail header with back button and title (with date)
    const headerElement = document.getElementById('activity-detail-header');
    if (headerElement) {
        const headerHtml = getDetailHeaderTemplate({
            backButtonId: 'back-to-activities',
            backButtonAriaLabel: 'Back to activities list',
            title: activityInfo.title,
            date: activityInfo.date,
            titleId: 'activity-detail-name'
        });
        headerElement.innerHTML = headerHtml;
        
        // Add click handler for back button
        const backButton = document.getElementById('back-to-activities');
        if (backButton) {
            backButton.addEventListener('click', showActivitiesList);
        }
    }
    
    // Get previous and next IDs
    const prevId = getPreviousActivityId(activityId);
    const nextId = getNextActivityId(activityId);
    
    // Build detail content
    const detailContent = document.getElementById('activity-detail-info');
    detailContent.innerHTML = `
        <div class="activity-image-container">
            ${prevId ? `
            <button class="activity-nav-btn activity-prev-btn" data-activity-id="${prevId}" aria-label="Previous activity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            ` : '<div class="activity-nav-btn-placeholder"></div>'}
            <div class="activity-detail-image">
                <div class="activity-placeholder-image"></div>
            </div>
            ${nextId ? `
            <button class="activity-nav-btn activity-next-btn" data-activity-id="${nextId}" aria-label="Next activity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            ` : '<div class="activity-nav-btn-placeholder"></div>'}
        </div>
        <div class="activity-detail-meta">
            <div class="activity-detail-source">${activityInfo.source}</div>
        </div>
        <div class="activity-detail-description">
            <p>${activityInfo.description}</p>
        </div>
        ${activityInfo.url ? `
        <div class="activity-detail-actions">
            ${getActionButtonTemplate({
                type: 'primary',
                href: activityInfo.url,
                text: 'View Original News',
                iconSvg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                target: '_blank',
                rel: 'noopener noreferrer',
                ariaLabel: 'View original news'
            })}
        </div>
        ` : ''}
    `;
    
    // Add navigation button handlers
    const prevBtn = detailContent.querySelector('.activity-prev-btn');
    const nextBtn = detailContent.querySelector('.activity-next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-activity-id');
            if (targetId) {
                showActivityDetail(targetId);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-activity-id');
            if (targetId) {
                showActivityDetail(targetId);
            }
        });
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to activities list
function showActivitiesList() {
    const activityList = document.getElementById('activity-content');
    const activityDetail = document.getElementById('activity-detail');
    
    activityList.style.display = 'block';
    activityDetail.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize activity item click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item[data-activity-id]');
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const activityId = this.getAttribute('data-activity-id');
            if (activityId && activityDetails[activityId]) {
                showActivityDetail(activityId);
            }
        });
    });
    
    // Back button will be created dynamically when detail view is shown
});

