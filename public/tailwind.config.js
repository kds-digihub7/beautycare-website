module.exports = {
content: [
'./src/pages/**/*.{js,jsx,ts,tsx}',
'./src/components/**/*.{js,jsx,ts,tsx}'
],
theme: {
extend: {
colors: {
"pink-light": '#FFD8E8',
"pink":"#FF7AB6", // primary pink
"pink-dark": '#D23A74'
},
fontFamily: {
sans: ['Inter', 'ui-sans-serif', 'system-ui']
}
}
},
plugins: []
};