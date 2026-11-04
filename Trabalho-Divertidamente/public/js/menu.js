document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu').forEach((menu, index) => {
        const button = menu.querySelector('.menu-toggle');
        const links = menu.querySelector('.menu-links');

        if (!button || !links) return;

        // Garante um id exclusivo caso a página tenha mais de um menu.
        if (!links.id) links.id = `menu-links-${index + 1}`;
        button.setAttribute('aria-controls', links.id);

        const closeMenu = () => {
            menu.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Abrir menu');
        };

        button.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            button.setAttribute('aria-expanded', String(isOpen));
            button.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });

        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeMenu();
        });
    });
});
