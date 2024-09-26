export const appTheme = {
    colors: {
        // Define the custom color palette
        dallasCowboys: {
            royalBlue: '#003594',
            blue: '#041E42',
            silver: '#869397',
            silverGreen: '#7F9695',
            white: '#FFFFFF',
        },
        // Optionally map your primary, secondary, etc. colors to the custom colors
        primary: {
            50: '#e3e7f1',
            100: '#c3cdea',
            200: '#a1b4e2',
            300: '#7e9cda',
            400: '#5b85d2',
            500: '#003594',  // Royal Blue as primary
            600: '#002e83',
            700: '#002671',
            800: '#001e60',
            900: '#00154d',
        },
        secondary: {
            50: '#e6f0f0',
            100: '#c0d9d8',
            200: '#99c1c1',
            300: '#72aaa9',
            400: '#4b9392',
            500: '#7F9695',  // Silver-Green as secondary
            600: '#3d6869',
            700: '#294f4f',
            800: '#183636',
            900: '#0a1d1d',
        },
        info: '#041E42',  // Blue as info color
        light: '#FFFFFF', // White for light background
        muted: '#869397', // Silver as muted color
    },
    config: {
        // Optionally, set initial color mode or other config options
        initialColorMode: 'light',
    },
};