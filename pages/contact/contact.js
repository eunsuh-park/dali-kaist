// Contact page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Generate action button for research collaboration
    const contactActionButton = document.getElementById('contact-action-button');
    if (contactActionButton && typeof getActionButtonTemplate === 'function') {
        contactActionButton.innerHTML = getActionButtonTemplate({
            type: 'primary',
            href: 'mailto:layinformatics@kaist.ac.kr',
            text: 'Contact Us',
            ariaLabel: 'Send email to layinformatics@kaist.ac.kr'
        });
    }
});

