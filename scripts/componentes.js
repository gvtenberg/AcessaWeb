document.addEventListener('DOMContentLoaded', carregarComponentes);

window.addEventListener('pageshow', function (event) {
    /*
     * Quando o navegador restaura uma página pelo cache de navegação,
     * recria os componentes e reinicializa o VLibras.
     */
    if (event.persisted) {
        reiniciarComponentes();
    }
});

let promessaScriptVlibras = null;

async function carregarComponentes() {
    const container = document.getElementById('componentes__container');

    if (!container) {
        return;
    }

    try {
        const response = await fetch('componentes.html', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar componentes: ${response.status}`
            );
        }

        const componentesHTML = await response.text();

        container.innerHTML = componentesHTML;

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
    const elementoVlibras = document.querySelector('[vw]');

    if (!elementoVlibras) {
        return;
    }

    await carregarScriptVlibras();

    if (!window.VLibras || !window.VLibras.Widget) {
        throw new Error('A biblioteca do VLibras não foi carregada.');
    }

    if (elementoVlibras.dataset.inicializado === 'true') {
        return;
    }

    new window.VLibras.Widget('https://vlibras.gov.br/app');

    elementoVlibras.dataset.inicializado = 'true';
}

function carregarScriptVlibras() {
    if (window.VLibras && window.VLibras.Widget) {
        return Promise.resolve();
    }

    if (promessaScriptVlibras) {
        return promessaScriptVlibras;
    }

    promessaScriptVlibras = new Promise(function (resolve, reject) {
        let script = document.querySelector(
            'script[data-vlibras-plugin]'
        );

        if (!script) {
            script = document.createElement('script');

            script.src =
                'https://vlibras.gov.br/app/vlibras-plugin.js';

            script.async = true;
            script.dataset.vlibrasPlugin = 'true';

            document.head.appendChild(script);
        }

        script.addEventListener(
            'load',
            function () {
                resolve();
            },
            { once: true }
        );

        script.addEventListener(
            'error',
            function () {
                promessaScriptVlibras = null;

                reject(
                    new Error('Erro ao carregar o script do VLibras.')
                );
            },
            { once: true }
        );

        /*
         * Caso o script já tenha terminado de carregar
         * antes dos eventos serem registrados.
         */
        if (window.VLibras && window.VLibras.Widget) {
            resolve();
        }
    });

    return promessaScriptVlibras;
}

function reiniciarComponentes() {
    const container = document.getElementById('componentes__container');

    if (!container) {
        return;
    }

    container.innerHTML = '';

    carregarComponentes();
}