// Gestion des modales pour la galerie
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('role', 'dialog'); // Rendre la modale accessible
        modal.innerHTML = `
            <span class="close" role="button" aria-label="Close">&times;</span>
            <div class="modal-content-wrapper">
                <img class="modal-content" src="${this.src}" alt="${this.alt}">
                <p class="modal-description">${this.alt}</p>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Désactiver le défilement en arrière-plan

        // Fermer la modale
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = ''; // Réactiver le défilement
        };

        modal.querySelector('.close').addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
});

// Bouton "Retour en haut"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerText = '↑';
scrollToTopBtn.id = 'scrollToTopBtn';
scrollToTopBtn.setAttribute('aria-label', 'Retour en haut'); // Accessibilité
scrollToTopBtn.style.display = 'none'; // Cacher par défaut
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '20px';
scrollToTopBtn.style.right = '20px';
scrollToTopBtn.style.padding = '10px 15px';
scrollToTopBtn.style.fontSize = '20px';
scrollToTopBtn.style.backgroundColor = '#d4af37'; // Or pour une touche élégante
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.borderRadius = '50%';
scrollToTopBtn.style.cursor = 'pointer';
scrollToTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
scrollToTopBtn.style.zIndex = '1000';
scrollToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Afficher/Masquer le bouton en fonction du défilement
window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = 'block';
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'scale(1)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            scrollToTopBtn.style.display = 'none';
        }, 300);
    }
};

// Activer les liens de navigation lors du défilement
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, i) => {
        if (window.scrollY >= section.offsetTop - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[i].classList.add('active');
        }
    });
});
