import { Text, StyleSheet } from 'react-native';

import themes from '../themes/themes';

const styles = StyleSheet.create({
    text: {
        color: themes.colors.textPrimary,
        fontSize: themes.fontSizes.body,
        fontFamily: themes.fonts.main,
        fontWeight: themes.fontWeights.normal,
    },
    colorTextSecondary: {
        color: themes.colors.textSecondary,
    },
    colorPrimary: {
        color: themes.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: themes.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: themes.fontWeights.bold,
    },
    fontSizeSmall: {
        fontSize: themes.fontSizes.small
    }
});

const MyText = ({ color, fontSize, fontWeight, style, ...props }) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'small' && styles.fontSizeSmall,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];

    return <Text style={textStyle} {...props} />;
};

export default MyText;