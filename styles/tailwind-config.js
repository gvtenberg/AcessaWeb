tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Arial', 'sans-serif'],
                serif: ['Georgia', 'serif'],
                dislexia: ['OpenDyslexic', 'sans-serif']
            }
        }
    },
    plugins: [
        function({ addVariant }) {
            addVariant('daltonico', '.daltonico &');
        }
    ]
};