$(document).ready(function () {
    const formulario = $('#form-contato');

    if(formulario.length === 0){
        return;
    }

    const textarea = $('#msg');
    const contador = $('#contador-caracteres');
    const botaEnviar = $('#btn-enviar');
    const feedbackDiv = $('#form-feedback');
    const maximo = Number(textarea.attr('maxlength')) || 500; // pega o maxlength de forma automática
    
    let temporizadorFeedback;

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

    formulario.on('submit', function(event) {
        const submitButton = $('#btn-enviar');
        event.preventDefault(); // Evita o recarregamento da página
        clearTimeout(temporizadorFeedback);
        
        feedbackDiv.addClass('hidden')
                    .removeClass('feedback-info feedback-success feedback-error');

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
                
                formulario[0].reset(); // Limpa o formulário

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