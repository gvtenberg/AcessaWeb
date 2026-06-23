/*
 * Funções compartilhadas de autenticação.
 *
 * Este arquivo centraliza:
 * - endereço do backend;
 * - envio do cookie de sessão;
 * - leitura e envio do token CSRF;
 * - login;
 * - logout;
 * - verificação da sessão.
 */
window.AcessaWebAuth = (function () {
    const BASE_URL = 'http://localhost:8080';

    const NOME_COOKIE_CSRF = 'XSRF-TOKEN';
    const NOME_HEADER_CSRF = 'X-XSRF-TOKEN';

    const METODOS_SEGUROS = [
        'GET',
        'HEAD',
        'OPTIONS',
        'TRACE'
    ];

    /*
     * Lê um cookie pelo nome.
     */
    function obterCookie(nome) {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const partes = cookie.trim().split('=');
            const nomeCookie = partes.shift();

            if (nomeCookie === nome) {
                return decodeURIComponent(
                    partes.join('=')
                );
            }
        }

        return null;
    }

    /*
     * Obtém o token CSRF criado pelo Spring Security.
     */
    function obterTokenCsrf() {
        return obterCookie(NOME_COOKIE_CSRF);
    }

    /*
     * Verifica se o método HTTP exige token CSRF.
     */
    function metodoEhSeguro(metodo) {
        return METODOS_SEGUROS.includes(
            metodo.toUpperCase()
        );
    }

    /*
     * Transforma um caminho relativo em uma URL completa
     * apontando para o backend.
     */
    function montarUrl(caminho) {
        if (
            caminho.startsWith('http://') ||
            caminho.startsWith('https://')
        ) {
            return caminho;
        }

        if (!caminho.startsWith('/')) {
            caminho = `/${caminho}`;
        }

        return `${BASE_URL}${caminho}`;
    }

    /*
     * Faz uma requisição pública ao backend para que
     * o Spring Security gere o cookie XSRF-TOKEN.
     *
     * O index.html do backend está liberado publicamente
     * no SecurityConfig.
     */
    function inicializarCsrf() {
        return $.ajax({
            url: `${BASE_URL}/index.html`,
            method: 'GET',
            dataType: 'text',
            cache: false,
            crossDomain: true,

            xhrFields: {
                withCredentials: true
            }
        });
    }

    /*
     * Executa uma requisição com:
     * - cookie JSESSIONID;
     * - credenciais habilitadas;
     * - cabeçalho CSRF em métodos que alteram dados.
     */
    function executarRequisicao(opcoes) {
        const configuracao = $.extend(
            true,
            {},
            opcoes
        );

        const metodo = (
            configuracao.method ||
            configuracao.type ||
            'GET'
        ).toUpperCase();

        configuracao.url = montarUrl(
            configuracao.url
        );

        configuracao.method = metodo;
        configuracao.crossDomain = true;

        configuracao.xhrFields = $.extend(
            {},
            configuracao.xhrFields,
            {
                withCredentials: true
            }
        );

        const beforeSendOriginal =
            configuracao.beforeSend;

        configuracao.beforeSend = function (
            xhr,
            settings
        ) {
            if (!metodoEhSeguro(metodo)) {
                const tokenCsrf =
                    obterTokenCsrf();

                if (tokenCsrf) {
                    xhr.setRequestHeader(
                        NOME_HEADER_CSRF,
                        tokenCsrf
                    );
                }
            }

            if (
                typeof beforeSendOriginal ===
                'function'
            ) {
                return beforeSendOriginal.call(
                    this,
                    xhr,
                    settings
                );
            }
        };

        return $.ajax(configuracao);
    }

    /*
     * Inicializa o CSRF somente quando necessário
     * e depois executa a requisição.
     */
    function requisicao(opcoes) {
        const metodo = (
            opcoes.method ||
            opcoes.type ||
            'GET'
        ).toUpperCase();

        if (
            metodoEhSeguro(metodo) ||
            obterTokenCsrf()
        ) {
            return executarRequisicao(opcoes);
        }

        return inicializarCsrf().then(
            function () {
                return executarRequisicao(opcoes);
            }
        );
    }

    /*
     * Envia usuário e senha no formato esperado
     * pelo formulário de login do Spring Security.
     */
    function entrar(username, password) {
        return requisicao({
            url: '/perform_login',
            method: 'POST',

            contentType:
                'application/x-www-form-urlencoded; charset=UTF-8',

            data: {
                username: username,
                password: password
            },

            timeout: 10000
        }).then(function () {
            /*
             * Após o login, o Spring pode renovar a sessão
             * e o token CSRF. Esta chamada obtém o token novo.
             */
            return inicializarCsrf();
        });
    }

    /*
     * Finaliza a sessão atual.
     */
    function sair() {
        return requisicao({
            url: '/perform_logout',
            method: 'POST',
            timeout: 10000
        });
    }

    /*
     * Verifica se existe uma sessão autenticada.
     *
     * O endpoint de tarefas exige autenticação:
     * - 200: sessão válida;
     * - 401: usuário não autenticado.
     */
    function verificarSessao() {
        return requisicao({
            url: '/api/tarefas',
            method: 'GET',
            dataType: 'json',
            timeout: 10000
        });
    }

    /*
     * Interface pública disponível para os outros scripts.
     */
    return {
        BASE_URL: BASE_URL,
        obterCookie: obterCookie,
        obterTokenCsrf: obterTokenCsrf,
        inicializarCsrf: inicializarCsrf,
        requisicao: requisicao,
        entrar: entrar,
        sair: sair,
        verificarSessao: verificarSessao
    };
})();