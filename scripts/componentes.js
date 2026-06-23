document.addEventListener('DOMContentLoaded', carregarComponentes);

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

        document.dispatchEvent(new CustomEvent('componentesCarregados'));
    } catch (erro) {
        console.error(erro);

        container.innerHTML = `
            <p class="feedback-error p-4 text-center" role="alert">
                Não foi possível carregar os componentes da página.
            </p>
        `;
    }
}