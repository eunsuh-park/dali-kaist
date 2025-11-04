// Sidebar navigation for research sections
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = {
        'before-2025': document.getElementById('before-2025'),
        '2026': document.getElementById('2026')
    };
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').replace('#', '');
            
            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide sections
            Object.keys(sections).forEach(id => {
                if (sections[id]) {
                    sections[id].style.display = id === targetId ? 'block' : 'none';
                }
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
});

