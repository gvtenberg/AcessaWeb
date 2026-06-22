const raiz = document.documentElement;

const temaSalvo = localStorage.getItem('tema') || 'claro';

const paletaSalva = localStorage.getItem('paleta') || 'azul';

const tamanhoSalvo = localStorage.getItem('tamanhoFonte') || 'normal';

const paletasPermitidas = [
    'azul',
    'verde',
    'roxo',
    'ambar',
    'escura',
    'alto-contraste',
    'personalizada'
];

const paletaInicial = paletasPermitidas.includes(paletaSalva) ? paletaSalva : 'azul';

raiz.setAttribute('data-paleta', paletaInicial);

aplicarTamanhoInicial(tamanhoSalvo);

if (paletaInicial === 'personalizada') {
    aplicarCoresPersonalizadasIniciais();
}

const fundosDasPaletas = {
    azul: '#f9fafb',
    verde: '#f0fdf4',
    roxo: '#faf5ff',
    ambar: '#fffbeb',
    escura: '#111827',
    'alto-contraste': '#000000',
    personalizada: localStorage.getItem('corFundo') || '#f9fafb'
};

if (temaSalvo === 'escuro') {
    raiz.classList.add('dark');
    raiz.style.backgroundColor = '#111827';
    raiz.style.colorScheme = 'dark';
} else if (temaSalvo === 'daltonico') {
    raiz.classList.add('daltonico');
    raiz.style.backgroundColor = '#fefce8';
    raiz.style.colorScheme = 'light';
} else {
    raiz.style.backgroundColor = fundosDasPaletas[paletaInicial];

    const paletaComFundoEscuro = paletaInicial === 'escura' || paletaInicial === 'alto-contraste';

    raiz.style.colorScheme = paletaComFundoEscuro ? 'dark' : 'light';
}

function aplicarTamanhoInicial(tamanho) {
    const classeEscolhida = {
        pequeno: 'texto-pequeno',
        normal: 'texto-normal',
        grande: 'texto-grande',
        'muito-grande': 'texto-muito-grande'
    };

    raiz.classList.add(classeEscolhida[tamanho] || 'texto-normal' );
}

function aplicarCoresPersonalizadasIniciais() {
    const corPrimaria = localStorage.getItem('corPrimaria') || '#2563eb';

    const corFundo = localStorage.getItem('corFundo') || '#f9fafb';

    const corSuperficie = localStorage.getItem('corSuperficie') || '#ffffff';

    const corTexto = localStorage.getItem('corTexto') || '#111827';

    raiz.style.setProperty('--personalizada-primaria', corPrimaria);

    raiz.style.setProperty('--personalizada-primaria-hover', escurecerCor(corPrimaria, 15));

    raiz.style.setProperty('--personalizada-texto-botao', escolherCorTextoBotao(corPrimaria));

    raiz.style.setProperty('--personalizada-fundo', corFundo);

    raiz.style.setProperty('--personalizada-superficie', corSuperficie);

    raiz.style.setProperty('--personalizada-texto', corTexto);
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