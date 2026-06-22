$(document).ready(function() {
    const htmlElement = $('html');
    const bodyElement = $('body');

    function aplicarTema(tema) {
        htmlElement.removeClass('dark daltonico');
        
        if (tema === 'escuro') {
            htmlElement.addClass('dark');
        } else if (tema === 'daltonico') {
            htmlElement.addClass('daltonico');
        }
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

    const temaSalvo = localStorage.getItem('tema') || 'claro';
    const fonteSalva = localStorage.getItem('fonte') || 'sans';
    const lgpdAceito = localStorage.getItem('lgpd_aceito');

    aplicarTema(temaSalvo);
    aplicarFonte(fonteSalva);

    if (lgpdAceito !== 'sim') {
        $('#lgpd-banner').removeClass('hidden');
    }

    // Alterna o tema claro/escuro
    $(document).on('click', '#btn-tema', function () {
        const temaAtual = localStorage.getItem('tema') || 'claro';
        let proximoTema;

        if(temaAtual === 'claro'){
            proximoTema = 'escuro';
        } else if(temaAtual === 'escuro'){
            proximoTema = 'daltonico';
        } else {
            proximoTema = 'claro';
        }

        aplicarTema(proximoTema);
        localStorage.setItem('tema', proximoTema);
    });

    $(document).on('click', '#btn-fonte', function () {
        const fonteAtual = localStorage.getItem('fonte') || 'sans';
        let proximaFonte;

        if(fonteAtual === 'sans'){
            proximaFonte = 'serif';
        } else if(fonteAtual === 'serif'){
            proximaFonte = 'dislexia';
        } else {
            proximaFonte = 'sans';
        }

        aplicarFonte(proximaFonte);
        localStorage.setItem('fonte', proximaFonte);
    });

    $(document).on('click', '#btn-lgpd', function () {
        localStorage.setItem('lgpd_aceito', 'sim');
        $('#lgpd-banner').addClass('hidden');
    });
});