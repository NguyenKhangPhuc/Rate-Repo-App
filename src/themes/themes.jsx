import { Platform, StyleSheet } from "react-native"

const themes = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        small: 12
    },
    fonts: {
        main: Platform.OS === 'android' ? 'Roboto' : 'San Francisco',
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    backgroundColors: {
        appBar: '#24292e',
        primary: '#0366d6'
    }
}

export default themes