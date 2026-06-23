$(document).ready(function () {
    const htmlElement = $('html');
    const bodyElement = $('body');

    const botoesPaleta = $('.paleta-opcao');

    const campoCorPrimaria = $('#cor-primaria');
    const campoCorFundo = $('#cor-fundo');
    const campoCorSuperficie = $('#cor-superficie');
    const campoCorTexto = $('#cor-texto');

    const botaoAplicarPaleta = $('#btn-aplicar-paleta');

    const feedbackPaletas = $('#feedback-paletas');
    const feedbackPersonalizado = $('#feedback-personalizacao');
    const feedbackFonte = $('#feedback-fonte');
    const feedbackTamanho = $('#feedback-tamanho');

    const radiosFonte = $('input[name="fonte"]');
    const botoesTamanho = $('.tamanho-fonte');
    const botaoResetar = $('#btn-resetar-personalizacao');

    const paletasPredefinidas = [
        'azul',
        'verde',
        'roxo',
        'ambar',
        'escura',
        'alto-contraste'
    ];

    iniciarConfiguracoes();

    botoesPaleta.on('click', function () {
        const paletaEscolhida = $(this).data('paleta');

        if (!paletasPredefinidas.includes(paletaEscolhida)) {
            return;
        }

        ativarTemaClaro();
        aplicarPaletaPredefinida(paletaEscolhida);
        destacarPaletaSelecionada(paletaEscolhida);

        localStorage.setItem('paleta', paletaEscolhida);

        const nomePaleta = $(this).find('span').first().text();

        mostrarFeedback(feedbackPaletas, `Paleta “${nomePaleta}” aplicada e salva.`);
    });

    botaoAplicarPaleta.on('click', function () {
        const cores = obterCoresDosCampos();

        ativarTemaClaro();
        aplicarPaletaPersonalizada(cores);
        salvarCoresPersonalizadas(cores);
        destacarPaletaSelecionada('personalizada');

        localStorage.setItem('paleta', 'personalizada');

        mostrarFeedback(feedbackPersonalizado, 'Paleta personalizada aplicada e salva.');
    });

    radiosFonte.on('change', function () {
        const fonteEscolhida = $(this).val();

        aplicarFonte(fonteEscolhida);
        destacarFonteSelecionada(fonteEscolhida);

        localStorage.setItem('fonte', fonteEscolhida);

        mostrarFeedback(feedbackFonte, 'Fonte aplicada e salva.');
    });

    botoesTamanho.on('click', function () {
        const tamanhoEscolhido = $(this).data('tamanho');

        aplicarTamanho(tamanhoEscolhido);
        destacarTamanhoSelecionado(tamanhoEscolhido);

        localStorage.setItem('tamanhoFonte', tamanhoEscolhido);

        mostrarFeedback(feedbackTamanho, 'Tamanho do texto aplicado e salvo.');
    });

    $(document).on('click', '#btn-fonte', function () {
        setTimeout(function () {
            const fonteAtual = localStorage.getItem('fonte') || 'sans';

            destacarFonteSelecionada(fonteAtual);
        }, 0);
    });

    botaoResetar.on('click', function () {
        const configuracoesVisuais = [
            'paleta',
            'tema',
            'fonte',
            'tamanhoFonte',
            'corPrimaria',
            'corFundo',
            'corSuperficie',
            'corTexto'
        ];

        configuracoesVisuais.forEach(function (configuracao) {
            localStorage.removeItem(configuracao);
        });

        window.location.reload();
    });

    function iniciarConfiguracoes() {
        const paletaSalva = localStorage.getItem('paleta') || 'azul';

        const fonteSalva = localStorage.getItem('fonte') || 'sans';

        const tamanhoSalvo = localStorage.getItem('tamanhoFonte') || 'normal';

        const coresPersonalizadas = obterCoresPersonalizadasSalvas();

        preencherCamposDeCor(coresPersonalizadas);

        if (paletaSalva === 'personalizada') {
            aplicarPaletaPersonalizada(coresPersonalizadas);
        } else if (paletasPredefinidas.includes(paletaSalva)) {
            aplicarPaletaPredefinida(paletaSalva);
        } else {
            aplicarPaletaPredefinida('azul');
        }

        destacarPaletaSelecionada(paletaSalva);

        aplicarFonte(fonteSalva);
        destacarFonteSelecionada(fonteSalva);

        aplicarTamanho(tamanhoSalvo);
        destacarTamanhoSelecionado(tamanhoSalvo);
    }

    function ativarTemaClaro() {
        htmlElement.removeClass('dark daltonico');

        localStorage.setItem('tema', 'claro');

        document.documentElement.style.colorScheme = 'light';
    }

    function aplicarPaletaPredefinida(paleta) {
        htmlElement.attr('data-paleta', paleta);
    }

    function aplicarPaletaPersonalizada(cores) {
        const raiz = document.documentElement;

        const corHover = escurecerCor(cores.primaria, 15);

        const corTextoBotao = escolherCorTextoBotao(cores.primaria);

        raiz.style.setProperty('--personalizada-primaria', cores.primaria);

        raiz.style.setProperty('--personalizada-primaria-hover', corHover);

        raiz.style.setProperty('--personalizada-texto-botao', corTextoBotao);

        raiz.style.setProperty('--personalizada-fundo', cores.fundo);

        raiz.style.setProperty('--personalizada-superficie', cores.superficie);

        raiz.style.setProperty('--personalizada-texto', cores.texto);

        htmlElement.attr('data-paleta', 'personalizada');
    }

    function destacarPaletaSelecionada(paleta) {
        botoesPaleta.attr('aria-pressed', 'false');

        if (paleta === 'personalizada') {
            return;
        }

        botoesPaleta.filter(`[data-paleta="${paleta}"]`)
                    .attr('aria-pressed', 'true');
    }

    function obterCoresDosCampos() {
        return {
            primaria: campoCorPrimaria.val(),
            fundo: campoCorFundo.val(),
            superficie: campoCorSuperficie.val(),
            texto: campoCorTexto.val()
        };
    }

    function obterCoresPersonalizadasSalvas() {
        return {
            primaria: localStorage.getItem('corPrimaria') || '#2563eb',

            fundo: localStorage.getItem('corFundo') || '#f9fafb',

            superficie: localStorage.getItem('corSuperficie') ||'#ffffff',

            texto: localStorage.getItem('corTexto') || '#111827'
        };
    }

    function salvarCoresPersonalizadas(cores) {
        localStorage.setItem('corPrimaria', cores.primaria);

        localStorage.setItem('corFundo', cores.fundo);

        localStorage.setItem('corSuperficie', cores.superficie);

        localStorage.setItem('corTexto', cores.texto);
    }

    function preencherCamposDeCor(cores) {
        campoCorPrimaria.val(cores.primaria);
        campoCorFundo.val(cores.fundo);
        campoCorSuperficie.val(cores.superficie);
        campoCorTexto.val(cores.texto);
    }

    function aplicarFonte(fonte) {
        bodyElement.removeClass('font-sans font-serif font-dislexia');

        if (fonte === 'serif') {
            bodyElement.addClass('font-serif');
        } else if (fonte === 'dislexia') {
            bodyElement.addClass('font-dislexia');
        } else {
            bodyElement.addClass('font-sans');
        }
    }

    function destacarFonteSelecionada(fonte) {
        radiosFonte.prop('checked', false);

        radiosFonte.filter(`[value="${fonte}"]`)
                   .prop('checked', true);
    }

    function aplicarTamanho(tamanho) {
        const classesDeTamanho = [
            'texto-pequeno',
            'texto-normal',
            'texto-grande',
            'texto-muito-grande'
        ];

        htmlElement.removeClass(classesDeTamanho.join(' '));

        const classeEscolhida = {
            pequeno: 'texto-pequeno',
            normal: 'texto-normal',
            grande: 'texto-grande',
            'muito-grande': 'texto-muito-grande'
        };

        htmlElement.addClass(classeEscolhida[tamanho] || 'texto-normal');
    }

    function destacarTamanhoSelecionado(tamanho) {
        botoesTamanho.attr('aria-pressed', 'false');

        botoesTamanho.filter(`[data-tamanho="${tamanho}"]`)
                     .attr('aria-pressed', 'true');
    }

    function mostrarFeedback(elemento, mensagem) {
        esconderTodosOsFeedbacks();

        elemento.removeClass('hidden feedback-error')
                .addClass('feedback-success')
                .text(mensagem);

        const temporizador = setTimeout(function () {
            elemento.addClass('hidden');
        }, 5000);

        elemento.data('temporizador', temporizador);
    }

    function esconderTodosOsFeedbacks() {
        const feedbacks = $(
            '#feedback-paletas, ' +
            '#feedback-personalizacao, ' +
            '#feedback-fonte, ' +
            '#feedback-tamanho'
        );

        feedbacks.each(function () {
            const elemento = $(this);

            clearTimeout(elemento.data('temporizador'));

            elemento.addClass('hidden')
                    .removeClass('feedback-success feedback-error');
        });
    }

    function escurecerCor(corHexadecimal, porcentagem) {
        const hexadecimal = corHexadecimal.replace('#', '');

        const numero = parseInt(hexadecimal, 16);

        const fator = (100 - porcentagem) / 100;

        const vermelho = Math.round(((numero >> 16) & 255) * fator);

        const verde = Math.round(((numero >> 8) & 255) * fator);

        const azul = Math.round((numero & 255) * fator);

        return (
            '#' +
            [vermelho, verde, azul]
                .map(function (valor) {
                    return valor.toString(16)
                                .padStart(2, '0');
                }).join('')
        );
    }

    function escolherCorTextoBotao(corHexadecimal) {
        const hexadecimal = corHexadecimal.replace('#', '');

        const vermelho = parseInt(hexadecimal.substring(0, 2), 16);

        const verde = parseInt(hexadecimal.substring(2, 4), 16);

        const azul = parseInt(hexadecimal.substring(4, 6), 16);

        const luminosidade = (vermelho * 299 + verde * 587 + azul * 114 ) / 1000;

        return luminosidade >= 150 ? '#111827' : '#ffffff';
    }
});