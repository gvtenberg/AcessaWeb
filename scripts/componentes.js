document.addEventListener(
    'DOMContentLoaded',
    carregarComponentes
);

async function carregarComponentes() {
    const container = document.getElementById(
        'componentes__container'
    );

    if (!container) {
        return;
    }

    try {
        const response = await fetch('componentes.html');

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar componentes: ${response.status}`
            );
        }

        const componentesHTML = await response.text();

        container.innerHTML = componentesHTML;

        /*
         * Informa ao app.js que o banner da LGPD
         * já existe no documento.
         */
        document.dispatchEvent(
            new CustomEvent('componentesCarregados')
        );

        await inicializarVlibras();
    } catch (erro) {
        console.error(erro);

        container.innerHTML = `
            <p class="feedback-error p-4 text-center" role="alert">
                Não foi possível carregar os componentes da página.
            </p>
        `;
    }
}

async function inicializarVlibras() {
    try {
        await carregarScriptVlibras();

        if (
            !window.VLibras ||
            !window.VLibras.Widget
        ) {
            throw new Error(
                'Biblioteca do VLibras indisponível.'
            );
        }

        if (window.vlibrasWidgetInicializado) {
            return;
        }

        new window.VLibras.Widget(
            'https://vlibras.gov.br/app'
        );

        window.vlibrasWidgetInicializado = true;
    } catch (erro) {
        console.error(
            'Não foi possível iniciar o VLibras.',
            erro
        );
    }
}

function carregarScriptVlibras() {
    if (
        window.VLibras &&
        window.VLibras.Widget
    ) {
        return Promise.resolve();
    }

    const scriptExistente = document.querySelector(
        'script[data-vlibras-plugin]'
    );

    if (scriptExistente) {
        return new Promise(function (resolve, reject) {
            scriptExistente.addEventListener(
                'load',
                resolve,
                { once: true }
            );

            scriptExistente.addEventListener(
                'error',
                reject,
                { once: true }
            );
        });
    }

    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');

        script.src =
            'https://vlibras.gov.br/app/vlibras-plugin.js';

        script.async = true;
        script.dataset.vlibrasPlugin = 'true';

        script.addEventListener(
            'load',
            resolve,
            { once: true }
        );

        script.addEventListener(
            'error',
            reject,
            { once: true }
        );

        document.head.appendChild(script);
    });
}