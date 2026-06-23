$(document).ready(function () {
    const CHAVE_USUARIO = 'acessaweb_usuario';

    const formulario = $('#form-login');

    const areaLogin = $('#area-login');
    const areaConta = $('#area-conta');
    const estadoSessao = $('#estado-sessao');

    const campoUsuario = $('#login-usuario');
    const campoSenha = $('#login-senha');

    const botaoEntrar = $('#btn-login');
    const botaoLogout = $('#btn-logout');

    const contaUsuario = $('#conta-usuario');
    const feedback = $('#login-feedback');

    let temporizadorFeedback;

    /*
     * Encerra o script caso a página atual
     * não possua os elementos da conta.
     */
    if (formulario.length === 0 || areaConta.length === 0) {
        return;
    }

    verificarSessaoAtual();

    formulario.on('submit', function (event) {
        event.preventDefault();

        const usuario = campoUsuario.val().trim();

        const senha = campoSenha.val();

        if (usuario.length === 0) {
            mostrarFeedback('Digite o nome de usuário.', 'erro');

            campoUsuario.trigger('focus');
            return;
        }

        if (senha.length === 0) {
            mostrarFeedback('Digite a senha.', 'erro');

            campoSenha.trigger('focus');
            return;
        }

        alterarEstadoLogin(true);

        AcessaWebAuth.entrar(usuario, senha).done(function () {
            /*
            * O nome é salvo somente para exibição.
            * A validade da sessão continua sendo
            * determinada pelo backend.
            */
            localStorage.setItem(CHAVE_USUARIO, usuario);

            campoSenha.val('');

            mostrarAreaConta();

            mostrarFeedback('Login realizado com sucesso.', 'sucesso');
        }).fail(function (xhr) {
            tratarErroLogin(xhr);
        }).always(function () {
            alterarEstadoLogin(false);
        });
    });

    botaoLogout.on('click', function () {
        realizarLogout();
    });

    function verificarSessaoAtual() {
        mostrarEstadoVerificacao();

        AcessaWebAuth.verificarSessao().done(function () {
                /*
                 * Uma resposta 200 de /api/tarefas confirma
                 * que existe uma sessão autenticada.
                 */
                mostrarAreaConta();
            })
            .fail(function (xhr) {
                if (xhr.status === 401) {
                    localStorage.removeItem(CHAVE_USUARIO);

                    mostrarAreaLogin();
                    return;
                }

                mostrarAreaLogin();

                if (xhr.status === 0) {
                    mostrarFeedback(
                        'Não foi possível conectar ao servidor. ' +
                        'Verifique se o Spring Boot está em execução.',
                        'erro'
                    );

                    return;
                }

                mostrarFeedback('Não foi possível verificar a sessão atual.', 'erro');
            });
    }

    function realizarLogout() {
        alterarEstadoLogout(true);

        AcessaWebAuth.sair().done(function () {
                finalizarSessao();

                mostrarFeedback('Sessão encerrada com sucesso.', 'sucesso');
            })
            .fail(function (xhr) {
                /*
                 * Se o backend responder 401,
                 * a sessão já não existe mais.
                 */
                if (xhr.status === 401) {
                    finalizarSessao();

                    mostrarFeedback('A sessão já estava encerrada.', 'sucesso');

                    return;
                }

                if (xhr.status === 403) {
                    mostrarFeedback(
                        'Não foi possível validar a segurança ' +
                        'da solicitação. Atualize a página e ' +
                        'tente novamente.',
                        'erro'
                    );

                    return;
                }

                if (xhr.status === 0) {
                    mostrarFeedback(
                        'Não foi possível conectar ao servidor. ' +
                        'Verifique se o Spring Boot está em execução.',
                        'erro'
                    );

                    return;
                }

                mostrarFeedback('Não foi possível encerrar a sessão.', 'erro');
            })
            .always(function () {
                alterarEstadoLogout(false);
            });
    }

    function finalizarSessao() {
        localStorage.removeItem(CHAVE_USUARIO);

        formulario[0].reset();

        mostrarAreaLogin();

        campoUsuario.trigger('focus');
    }

    function mostrarEstadoVerificacao() {
        estadoSessao.removeClass('hidden')
                    .text('Verificando sessão...');

        areaLogin.addClass('hidden');
        areaConta.addClass('hidden');
    }

    function mostrarAreaLogin() {
        estadoSessao.addClass('hidden');

        areaConta.addClass('hidden');
        areaLogin.removeClass('hidden');

        contaUsuario.text('Usuário autenticado');
    }

    function mostrarAreaConta() {
        const usuarioSalvo = localStorage.getItem(CHAVE_USUARIO);

        estadoSessao.addClass('hidden');

        areaLogin.addClass('hidden');
        areaConta.removeClass('hidden');

        contaUsuario.text(usuarioSalvo || 'Usuário autenticado');
    }

    function tratarErroLogin(xhr) {
        mostrarAreaLogin();

        if (xhr.status === 401) {
            mostrarFeedback('Usuário ou senha incorretos.', 'erro');

            campoSenha.val('').trigger('focus');

            return;
        }

        if (xhr.status === 403) {
            mostrarFeedback(
                'A sessão de segurança expirou. ' +
                'Atualize a página e tente novamente.',
                'erro'
            );

            return;
        }

        if (xhr.status === 0) {
            mostrarFeedback(
                'Não foi possível conectar ao servidor. ' +
                'Verifique se o Spring Boot está em execução.',
                'erro'
            );

            return;
        }

        if (xhr.responseJSON && xhr.responseJSON.mensagem) {
            mostrarFeedback(xhr.responseJSON.mensagem, 'erro');

            return;
        }

        mostrarFeedback('Não foi possível realizar o login.', 'erro');
    }

    function alterarEstadoLogin(enviando) {
        formulario.attr('aria-busy', enviando ? 'true' : 'false');

        campoUsuario.prop('disabled', enviando);

        campoSenha.prop('disabled', enviando);

        botaoEntrar.prop('disabled', enviando)
                   .text(enviando ? 'Entrando...' : 'Entrar');
    }

    function alterarEstadoLogout(saindo) {
        botaoLogout.prop('disabled', saindo)
                   .text(saindo ? 'Saindo...' : 'Sair da conta');
    }

    function mostrarFeedback(mensagem, tipo) {
        clearTimeout(temporizadorFeedback);

        feedback.removeClass('hidden ' + 'feedback-success ' + 'feedback-error')
                .addClass(tipo === 'sucesso' ? 'feedback-success' : 'feedback-error')
                .text(mensagem);

        temporizadorFeedback = setTimeout(function () {
                feedback.addClass('hidden');
            }, 8000);
    }
});