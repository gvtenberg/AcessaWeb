const tema = localStorage.getItem('tema') || 'claro';
const raiz = document.documentElement;

if (tema === 'escuro') {
    raiz.classList.add('dark');
    raiz.style.backgroundColor = '#111827';
    raiz.style.colorScheme = 'dark';
} else if (tema === 'daltonico') {
    raiz.classList.add('daltonico');
    raiz.style.backgroundColor = '#fefce8';
    raiz.style.colorScheme = 'light';
} else {
    raiz.style.backgroundColor = '#f9fafb';
    raiz.style.colorScheme = 'light';
}