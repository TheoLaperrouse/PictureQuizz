/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                teal: '#0A6E62',
                'dark-teal': '#374b43',
                'navy-blue': '#03224c',
                grey: '#97b1ab',
                'royal-blue': '#244f7A',
                'light-blue': '#7496c7',
            },
        },
    },
    plugins: [],
};
