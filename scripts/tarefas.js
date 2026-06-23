$(document).ready(function () {
    const API_URL = 'http://localhost:8080/tarefas'; // Endereço do backend em Spring Boot
    const LIMITE_TEXTO = 255;

    const formulario = $('#form-tarefa');
    const campoNovaTarefa = $('#nova-tarefa');
    const botaoAdicionar = $('#btn-adicionar-tarefa');
    const botaoAtualizar = $('#btn-atualizar-tarefas');

    const listaTarefas = $('#lista-tarefas');
    const estadoCarregando = $('#tarefas-carregando');
    const estadoVazio = $('#tarefas-vazias');

    const contador = $('#contador-tarefa');
    const feedbackNovaTarefa = $('#nova-tarefa-feedback');
    const feedbackLista = $('#lista-tarefas-feedback');

    //let temporizadorFeedback;

    if (formulario.length === 0 || listaTarefas.length === 0) {
        return;
    }

    formulario.on('submit', function (event) {
        event.preventDefault();
        criarTarefa();
    });

    campoNovaTarefa.on('input', atualizarContador);

    botaoAtualizar.on('click', function () {
        carregarTarefas();
    });

    listaTarefas.on(
        'click',
        '[data-acao="editar"]',
        function () {
            const item = $(this).closest('.tarefa-item');
            iniciarEdicao(item);
        }
    );

    listaTarefas.on(
        'click',
        '[data-acao="cancelar"]',
        function () {
            const item = $(this).closest('.tarefa-item');
            cancelarEdicao(item, true);
        }
    );

    listaTarefas.on(
        'click',
        '[data-acao="salvar"]',
        function () {
            const item = $(this).closest('.tarefa-item');
            atualizarTarefa(item, $(this));
        }
    );

    listaTarefas.on(
        'click',
        '[data-acao="excluir"]',
        function () {
            const item = $(this).closest('.tarefa-item');
            excluirTarefa(item, $(this));
        }
    );

    listaTarefas.on(
        'keydown',
        '.tarefa-edit-input',
        function (event) {
            const item = $(this).closest('.tarefa-item');

            if (event.key === 'Enter') {
                event.preventDefault();

                item
                    .find('[data-acao="salvar"]')
                    .trigger('click');
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                cancelarEdicao(item, true);
            }
        }
    );

    atualizarContador();
    carregarTarefas();

    function carregarTarefas() {
        alterarEstadoCarregamento(true);

        $.ajax({
            url: API_URL,
            method: 'GET',
            dataType: 'json',
            timeout: 10000,

            success: function (tarefas) {
                renderizarTarefas(tarefas);
            },

            error: function (xhr) {
                listaTarefas.addClass('hidden');
                estadoVazio.addClass('hidden');

                mostrarFeedback(
                    feedbackLista,
                    obterMensagemErro(
                        xhr,
                        'Não foi possível carregar as tarefas.'
                    ),
                    'erro'
                );
            },

            complete: function () {
                alterarEstadoCarregamento(false);
            }
        });
    }

    function criarTarefa() {
        const texto = campoNovaTarefa.val().trim();

        if (!validarTexto(texto, feedbackNovaTarefa)) {
            campoNovaTarefa.trigger('focus');
            return;
        }

        alterarBotao(
            botaoAdicionar,
            true,
            'Adicionando...'
        );

        $.ajax({
            url: API_URL,
            method: 'POST',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            data: JSON.stringify({
                texto: texto
            }),
            timeout: 10000,

            success: function () {
                campoNovaTarefa.val('');
                atualizarContador();

                mostrarFeedback(
                    feedbackNovaTarefa,
                    'Tarefa adicionada com sucesso.',
                    'sucesso'
                );

                carregarTarefas();
                campoNovaTarefa.trigger('focus');
            },

            error: function (xhr) {
                mostrarFeedback(
                    feedbackNovaTarefa,
                    obterMensagemErro(
                        xhr,
                        'Não foi possível adicionar a tarefa.'
                    ),
                    'erro'
                );
            },

            complete: function () {
                alterarBotao(
                    botaoAdicionar,
                    false,
                    'Adicionar tarefa'
                );
            }
        });
    }

    function atualizarTarefa(item, botaoSalvar) {
        const id = item.data('id');

        const campoEdicao =
            item.find('.tarefa-edit-input');

        const texto = campoEdicao.val().trim();

        if (!validarTexto(texto, feedbackLista)) {
            campoEdicao.trigger('focus');
            return;
        }

        alterarBotao(
            botaoSalvar,
            true,
            'Salvando...'
        );

        $.ajax({
            url: `${API_URL}/${id}`,
            method: 'PUT',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            data: JSON.stringify({
                texto: texto
            }),
            timeout: 10000,

            success: function (tarefaAtualizada) {
                item
                    .find('.tarefa-texto')
                    .text(tarefaAtualizada.texto);

                item
                    .find('.tarefa-data')
                    .text(
                        criarTextoData(tarefaAtualizada)
                    );

                campoEdicao
                    .val(tarefaAtualizada.texto)
                    .attr(
                        'aria-label',
                        `Editar tarefa: ${tarefaAtualizada.texto}`
                    );

                item
                    .find('[data-acao="editar"]')
                    .attr(
                        'aria-label',
                        `Editar tarefa: ${tarefaAtualizada.texto}`
                    );

                item
                    .find('[data-acao="excluir"]')
                    .attr(
                        'aria-label',
                        `Excluir tarefa: ${tarefaAtualizada.texto}`
                    );

                cancelarEdicao(item, true);

                mostrarFeedback(
                    feedbackLista,
                    'Tarefa atualizada com sucesso.',
                    'sucesso'
                );
            },

            error: function (xhr) {
                mostrarFeedback(
                    feedbackLista,
                    obterMensagemErro(
                        xhr,
                        'Não foi possível atualizar a tarefa.'
                    ),
                    'erro'
                );
            },

            complete: function () {
                alterarBotao(
                    botaoSalvar,
                    false,
                    'Salvar'
                );
            }
        });
    }

    function excluirTarefa(item, botaoExcluir) {
        const id = item.data('id');
        const texto = item.find('.tarefa-texto').text();

        const confirmou = window.confirm(
            `Deseja excluir a tarefa "${texto}"?`
        );

        if (!confirmou) {
            return;
        }

        alterarBotao(
            botaoExcluir,
            true,
            'Excluindo...'
        );

        $.ajax({
            url: `${API_URL}/${id}`,
            method: 'DELETE',
            timeout: 10000,

            success: function () {
                item.remove();

                verificarListaVazia();

                mostrarFeedback(
                    feedbackLista,
                    'Tarefa excluída com sucesso.',
                    'sucesso'
                );

                botaoAtualizar.trigger('focus');
            },

            error: function (xhr) {
                mostrarFeedback(
                    feedbackLista,
                    obterMensagemErro(
                        xhr,
                        'Não foi possível excluir a tarefa.'
                    ),
                    'erro'
                );

                alterarBotao(
                    botaoExcluir,
                    false,
                    'Excluir'
                );
            }
        });
    }

    function renderizarTarefas(tarefas) {
        listaTarefas.empty();

        if (!Array.isArray(tarefas) || tarefas.length === 0) {
            listaTarefas.addClass('hidden');
            estadoVazio.removeClass('hidden');
            return;
        }

        tarefas.forEach(function (tarefa) {
            listaTarefas.append(
                criarElementoTarefa(tarefa)
            );
        });

        estadoVazio.addClass('hidden');
        listaTarefas.removeClass('hidden');
    }

    function criarElementoTarefa(tarefa) {
        const item = $('<li>', {
            class: 'tarefa-item',
            'data-id': tarefa.id
        });

        const visualizacao = $('<div>', {
            class: 'tarefa-visualizacao'
        });

        const conteudo = $('<div>', {
            class: 'tarefa-conteudo'
        });

        const texto = $('<p>', {
            class: 'tarefa-texto'
        }).text(tarefa.texto);

        const data = $('<p>', {
            class: 'tarefa-data'
        }).text(criarTextoData(tarefa));

        conteudo.append(texto, data);

        const acoes = $('<div>', {
            class: 'tarefa-acoes'
        });

        const botaoEditar = $('<button>', {
            type: 'button',
            class: 'botao-tarefa botao-tarefa-secundario',
            text: 'Editar',
            'data-acao': 'editar',
            'aria-label': `Editar tarefa: ${tarefa.texto}`
        });

        const botaoExcluir = $('<button>', {
            type: 'button',
            class: 'botao-tarefa botao-tarefa-perigo',
            text: 'Excluir',
            'data-acao': 'excluir',
            'aria-label': `Excluir tarefa: ${tarefa.texto}`
        });

        acoes.append(botaoEditar, botaoExcluir);

        visualizacao.append(conteudo, acoes);

        const edicao = $('<div>', {
            class: 'tarefa-edicao',
            hidden: true
        });

        const campoEdicao = $('<input>', {
            type: 'text',
            class: 'campo-paleta tarefa-edit-input',
            maxlength: LIMITE_TEXTO,
            value: tarefa.texto,
            'aria-label': `Editar tarefa: ${tarefa.texto}`
        });

        const botoesEdicao = $('<div>', {
            class: 'tarefa-botoes-edicao'
        });

        const botaoSalvar = $('<button>', {
            type: 'button',
            class: 'botao-tarefa botao-tarefa-primario',
            text: 'Salvar',
            'data-acao': 'salvar'
        });

        const botaoCancelar = $('<button>', {
            type: 'button',
            class: 'botao-tarefa botao-tarefa-secundario',
            text: 'Cancelar',
            'data-acao': 'cancelar'
        });

        botoesEdicao.append(
            botaoSalvar,
            botaoCancelar
        );

        edicao.append(
            campoEdicao,
            botoesEdicao
        );

        item.append(
            visualizacao,
            edicao
        );

        return item;
    }

    function iniciarEdicao(item) {
        listaTarefas
            .find('.tarefa-item')
            .each(function () {
                cancelarEdicao($(this), false);
            });

        const textoAtual =
            item.find('.tarefa-texto').text();

        item
            .find('.tarefa-edit-input')
            .val(textoAtual);

        item
            .find('.tarefa-visualizacao')
            .prop('hidden', true);

        item
            .find('.tarefa-edicao')
            .prop('hidden', false);

        item
            .find('.tarefa-edit-input')
            .trigger('focus')
            .trigger('select');
    }

    function cancelarEdicao(item, devolverFoco) {
        item
            .find('.tarefa-edicao')
            .prop('hidden', true);

        item
            .find('.tarefa-visualizacao')
            .prop('hidden', false);

        if (devolverFoco) {
            item
                .find('[data-acao="editar"]')
                .trigger('focus');
        }
    }

    function validarTexto(texto, feedbackAlvo) {
        if (texto.length === 0) {
            mostrarFeedback(
                feedbackAlvo,
                'Digite uma descrição para a tarefa.',
                'erro'
            );

            return false;
        }

        if (texto.length > LIMITE_TEXTO) {
            mostrarFeedback(
                feedbackAlvo,
                `A tarefa deve possuir no máximo ${LIMITE_TEXTO} caracteres.`,
                'erro'
            );

            return false;
        }

        return true;
    }

    function verificarListaVazia() {
        if (listaTarefas.children().length === 0) {
            listaTarefas.addClass('hidden');
            estadoVazio.removeClass('hidden');
        }
    }

    function atualizarContador() {
        const tamanhoAtual =
            campoNovaTarefa.val().length;

        const restantes =
            LIMITE_TEXTO - tamanhoAtual;

        contador.text(
            `${restantes} caracteres restantes`
        );

        contador.toggleClass(
            'contador-alerta',
            restantes < 30
        );
    }

    function criarTextoData(tarefa) {
        if (tarefa.updatedAt) {
            return `Atualizada em ${formatarData(tarefa.updatedAt)}`;
        }

        if (tarefa.createdAt) {
            return `Criada em ${formatarData(tarefa.createdAt)}`;
        }

        return 'Data não informada';
    }

    function formatarData(valor) {
        const partes = valor.split('T');

        if (partes.length !== 2) {
            return valor;
        }

        const data = partes[0].split('-');
        const horario = partes[1].slice(0, 5);

        if (data.length !== 3) {
            return valor;
        }

        return `${data[2]}/${data[1]}/${data[0]} às ${horario}`;
    }

    function alterarEstadoCarregamento(carregando) {
        if (carregando) {
            estadoCarregando.removeClass('hidden');
            estadoVazio.addClass('hidden');
            listaTarefas.addClass('hidden');

            botaoAtualizar
                .prop('disabled', true)
                .text('Atualizando...');
        } else {
            estadoCarregando.addClass('hidden');

            botaoAtualizar
                .prop('disabled', false)
                .text('Atualizar lista');
        }
    }

    function alterarBotao(botao, desabilitado, texto) {
        botao
            .prop('disabled', desabilitado)
            .text(texto);
    }

    function mostrarFeedback(alvo, mensagem, tipo) {
        const temporizadorAnterior =
            alvo.data('temporizador-feedback');

        clearTimeout(temporizadorAnterior);

        alvo
            .removeClass(
                'hidden feedback-success feedback-error'
            )
            .addClass(
                tipo === 'sucesso'
                    ? 'feedback-success'
                    : 'feedback-error'
            )
            .text(mensagem);

        const temporizadorAtual = setTimeout(function () {
            alvo.addClass('hidden');
        }, 8000);

        alvo.data(
            'temporizador-feedback',
            temporizadorAtual
        );
    }

    function obterMensagemErro(xhr, mensagemPadrao) {
        if (xhr.status === 0) {
            return (
                'Não foi possível conectar ao servidor. ' +
                'Verifique se o Spring Boot está em execução.'
            );
        }

        if (
            xhr.responseJSON &&
            xhr.responseJSON.mensagem
        ) {
            return xhr.responseJSON.mensagem;
        }

        return mensagemPadrao;
    }
});