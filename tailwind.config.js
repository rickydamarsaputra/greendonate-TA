/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e7f0ed',
					100: '#b6d0c7',
					200: '#92b9ac',
					300: '#609986',
					400: '#41856e',
					500: '#12674a',
					600: '#105e43',
					700: '#0d4935',
					800: '#0a3929',
					900: '#082b1f',
				},
				secondary: {
					50: '#fefdfb',
					100: '#fcf9f1',
					200: '#faf6ea',
					300: '#f8f2e1',
					400: '#f7f0db',
					500: '#f5ecd2',
					600: '#dfd7bf',
					700: '#aea895',
					800: '#878274',
					900: '#676358',
				},
			},
		},
	},
	plugins: [],
};
