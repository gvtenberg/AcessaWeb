$(document).ready(function() {
    let temporizadorFeedback;

    const htmlElement = $('html');
    const bodyElement = $('body');

    const temaSalvo = localStorage.getItem('tema') || 'claro';
    const fonteSalva = localStorage.getItem('fonte') || 'sans';
    const lgpdAceito = localStorage.getItem('lgpd_aceito');

    if(temaSalvo === 'escuro') {
        htmlElement.removeClass('daltonico').addClass('dark');
    } else if(temaSalvo === 'daltonico') {
        htmlElement.removeClass('dark').addClass('daltonico');
    }

    if(fonteSalva === 'serif') {
        bodyElement.removeClass('font-sans').addClass('font-serif');
    } else if(fonteSalva === 'dislexia') {
        bodyElement.removeClass('font-sans').addClass('font-dislexia');
    }

    if (lgpdAceito !== 'sim') {
        $('#lgpd-banner').removeClass('hidden');
    }

    // Alterna o tema claro/escuro
    $('#btn-tema').on('click', function() {
        let temaAtual = localStorage.getItem('tema') || 'claro';

        if(temaAtual === 'claro'){
            htmlElement.addClass('dark');
            localStorage.setItem('tema', 'escuro');
        } else if(temaAtual === 'escuro'){
            htmlElement.removeClass('dark');
            htmlElement.addClass('daltonico');
            localStorage.setItem('tema', 'daltonico');
        } else {
            htmlElement.removeClass('daltonico');
            localStorage.setItem('tema', 'claro');
        }
    });

    $('#btn-fonte').on('click', function() {
        let fonteAtual = localStorage.getItem('fonte') || 'sans';

        if(fonteAtual === 'sans'){
            bodyElement.removeClass('font-sans').addClass('font-serif');
            localStorage.setItem('fonte', 'serif');
        } else if(fonteAtual === 'serif'){
            bodyElement.removeClass('font-serif').addClass('font-dislexia');
            localStorage.setItem('fonte', 'dislexia');
        } else {
            bodyElement.removeClass('font-dislexia').addClass('font-sans');
            localStorage.setItem('fonte', 'sans');
        }
    });

    $('#btn-lgpd').on('click', function() {
        localStorage.setItem('lgpd_aceito', 'sim');
        $('#lgpd-banner').addClass('hidden');
    });

    const textarea = $('#msg');
    const contador = $('#contador-caracteres');
    const maximo = textarea.attr('maxlength'); // pega o maxlength de forma automática

    contador.text(`${maximo} caracteres restantes`);

    textarea.on('input', function() {
        const tamanhoAtual = $(this).val().length;
        const restantes = maximo - tamanhoAtual;

        contador.text(`${restantes} caracteres restantes`);

        if(restantes < 50){
            contador.addClass('contador-alerta');
        } else {
            contador.removeClass('contador-alerta');
        }
    });

    $('#form-contato').on('submit', function(event) {
        event.preventDefault(); // Evita o recarregamento da página
        const submitButton = $('#btn-enviar');
        const feedbackDiv = $('#form-feedback');
        feedbackDiv.addClass("hidden");

        const dadosForm = {
            title: $('#nome').val(),
            email: $('#email').val(),
            site: $('#site').val(),
            body: $('#msg').val(),
            userId: 1 // exigência do jsonplaceholder
        };

        submitButton.prop('disabled', true)
                    .text('Enviando...');

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dadosForm),
            success: function (response) {
                console.log('Resposta do servidor: ', response);

                feedbackDiv.removeClass('hidden feedback-info feedback-error')
                            .addClass('feedback-success')
                            .html(`Mensagem enviada com sucesso! Entraremos em contato em breve.<br>Número de protocolo: ${response.id}`);
                
                $('#form-contato')[0].reset(); // Limpa o formulário
                contador.text(`${maximo} caracteres restantes`);
                contador.removeClass('contador-alerta');
                esconderFeedback()
            },
            error: function() {
                feedbackDiv.removeClass('hidden feedback-info feedback-success')
                            .addClass('feedback-error')
                            .text('Erro ao enviar mensagem. Por favor, tente novamente');
                esconderFeedback()
            },
            complete: function() {
                submitButton.prop('disabled', false)
                            .text('Enviar Solicitação');
            }
        });
    });

    function esconderFeedback() {
        clearTimeout(temporizadorFeedback);

        temporizadorFeedback = setTimeout(function() {
            $('#form-feedback').addClass('hidden');
        }, 10000);
    }
});
