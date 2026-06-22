document.addEventListener('DOMContentLoaded', carregarMenu);

async function carregarMenu() {
    const menuContainer = document.getElementById('menu__container');

    if (!menuContainer) {
        return;
    }

    try {
        const response = await fetch('menu.html');

        if (!response.ok) {
            throw new Error(`Erro ao carregar o menu: ${response.status}`);
        }

        const menuHTML = await response.text();

        menuContainer.innerHTML = menuHTML;

        iniciarMenuResponsivo();
        destacarPaginaAtual();

    } catch (erro) {
        console.error(erro);

        menuContainer.innerHTML = `
            <div class="p-4 bg-red-100 text-red-800 text-center">
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

    function abrirMenu() {
        menu.style.transform = 'translateX(0)';
        overlay.classList.remove('hidden');

        botaoAbrir.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        botaoFechar.focus();
    }

    function fecharMenu() {
        menu.style.transform = '';
        overlay.classList.add('hidden');

        botaoAbrir.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    botaoAbrir.addEventListener('click', abrirMenu);
    botaoFechar.addEventListener('click', fecharMenu);
    overlay.addEventListener('click', fecharMenu);

    links.forEach(function (link) {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            fecharMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) {
            fecharMenu();
        }
    });
}

function destacarPaginaAtual() {
    let paginaAtual = window.location.pathname.split('/').pop();

    if (paginaAtual === '') {
        paginaAtual = 'index.html';
    }

    const links = document.querySelectorAll('[data-menu-link]');

    links.forEach(function (link) {
        const destino = link.getAttribute('href');

        if (destino === paginaAtual) {
            link.setAttribute('aria-current', 'page');
        }
    });
}