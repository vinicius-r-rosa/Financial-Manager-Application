import { createGlobalStyle } from 'styled-components'

export type themeType = typeof theme

export const theme = {
    colors: {
        primary: '#5e6ba6', // Main brand color
        primaryLight: '#8fa1fb', // Light variant of primary
        primaryDark: '#2e3451', // Dark variant of primary

        secondary: '#56fdf9', // Accent color
        secondaryLight: '#8efff8', // Light variant of secondary
        secondaryDark: '#2ccbc7', // Dark variant of secondary

        neutralWhite: '#ffffff', // Background color
        neutralLightGrey: '#f5f5f5', // Light UI element background
        neutralMediumGrey: '#cccccc', // Borders, dividers
        neutralDarkGrey: '#333333', // Text and prominent UI elements
        neutralBlack: '#000000', // Strong text and accents

        fadedPrimary: '#5e6ba650', // Primary with 50% opacity
        fadedSecondary: '#56fdf950', // Secondary with 50% opacity
        fadedBlack: '#00000050', // Black with 50% opacity

        info: '#007bff', // Informational messages or highlights
        infoGray: '#808080', // Gray state for informational messages or highlights
        success: '#28a745', // Success messages or highlights
        warning: '#ffc107', // Warnings or alerts
        error: '#dc3545', // Error messages or highlights

        infoDark: '#0056b3', // Dark state for informational messages or highlights
        successDark: '#218838', // Dark state for success messages or highlights
        warningDark: '#d39e00', // Dark state for warnings or alerts
        errorDark: '#c82333', // Dark state for error messages or highlights
    },
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.colors.neutralLightGrey};
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    color: white;
    padding: 5px 10px;


    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.secondaryDark};
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutralMediumGrey};
    border-radius: 10px;
    }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutralLightGrey};
  }
`
