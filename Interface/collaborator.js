// Collaborator Modal Functions

function openCollaboratorModal(name, linkedinUrl, email) {
    const modal = document.getElementById('collaboratorModal');
    const nameElement = document.getElementById('collaboratorName');
    const linkedinLink = document.getElementById('linkedinLink');
    const emailLink = document.getElementById('emailLink');

    nameElement.textContent = name;
    linkedinLink.href = linkedinUrl;
    emailLink.href = `mailto:${email}`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCollaboratorModal() {
    const modal = document.getElementById('collaboratorModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close collaborator modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('collaboratorModal');
    if (event.target === modal) {
        closeCollaboratorModal();
    }
});

// Close collaborator modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCollaboratorModal();
    }
});