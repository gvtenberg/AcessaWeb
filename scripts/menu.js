document.addEventListener('DOMContentLoaded', carregarMenu);

async function carregarMenu() {
    const menuContainer = document.getElementById('menu__container');

    if (!menuContainer) {
        return;
    }

    try {
        const response = await fetch('menu.html', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar o menu: ${response.status}`
            );
        }

        const menuHTML = await response.text();

        menuContainer.innerHTML = menuHTML;

        iniciarMenuResponsivo();
        destacarPaginaAtual();
    } catch (erro) {
        console.error(erro);

        menuContainer.innerHTML = `
            <div class="feedback-error p-4 text-center">
                Não foi possível carregar o menu.
            </div>
        `;
    }
}

function iniciarMenuResponsivo() {
    const botaoAbrir = document.getElementById('menu-button');
    const botaoFechar = document.getElementById('menu-close');
    const menu = document.getElementById('main-menu');
    const overlay = document.getElementById('menu-overlay');
    const links = document.querySelectorAll('[data-menu-link]');

    if (!botaoAbrir || !botaoFechar || !menu || !overlay) {
        console.warn('Não foi possível iniciar o menu responsivo.');

        return;
    }

    const larguraDesktop = 900;

    function menuEstaAberto() {
        return botaoAbrir.getAttribute('aria-expanded') === 'true';
    }

    function abrirMenu() {
        if (window.innerWidth >= larguraDesktop) {
            return;
        }

        menu.inert = false;
        menu.removeAttribute('aria-hidden');
        menu.classList.add('menu-aberto');

        overlay.classList.remove('hidden');

        botaoAbrir.setAttribute('aria-expanded', 'true');

        document.body.style.overflow = 'hidden';

        botaoFechar.focus();
    }

    function fecharMenu(devolverFoco = false) {
        const estavaAberto = menuEstaAberto();

        menu.classList.remove('menu-aberto');

        overlay.classList.add('hidden');

        botaoAbrir.setAttribute('aria-expanded', 'false');

        document.body.style.overflow = '';

        if (
            devolverFoco &&
            estavaAberto &&
            window.innerWidth < larguraDesktop
        ) {
            botaoAbrir.focus();
        }

        if (window.innerWidth < larguraDesktop) {
            menu.inert = true;
            menu.setAttribute('aria-hidden', 'true');
        }
    }

    function atualizarEstadoResponsivo() {
        if (window.innerWidth >= larguraDesktop) {
            menu.inert = false;
            menu.removeAttribute('aria-hidden');
            menu.classList.remove('menu-aberto');

            overlay.classList.add('hidden');

            botaoAbrir.setAttribute('aria-expanded', 'false');

            document.body.style.overflow = '';

            return;
        }

        if (!menuEstaAberto()) {
            menu.inert = true;
            menu.setAttribute('aria-hidden', 'true');
            menu.classList.remove('menu-aberto');
        }
    }

    botaoAbrir.addEventListener('click', abrirMenu);

    botaoFechar.addEventListener('click', function () {
        fecharMenu(true);
    });

    overlay.addEventListener('click', function () {
        fecharMenu(true);
    });

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            fecharMenu(false);
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuEstaAberto()) {
            fecharMenu(true);
        }
    });

    window.addEventListener(
        'resize',
        atualizarEstadoResponsivo
    );

    atualizarEstadoResponsivo();
}

function destacarPaginaAtual() {
    let paginaAtual =
        window.location.pathname.split('/').pop();

    if (paginaAtual === '') {
        paginaAtual = 'index.html';
    }

    const links =
        document.querySelectorAll('[data-menu-link]');

    links.forEach(function (link) {
        const destino = link.getAttribute('href');

        if (destino === paginaAtual) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}