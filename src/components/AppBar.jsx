import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import themes from '../themes/themes';
import { Link } from 'react-router-native';
import MyText from './MyText';
import { useApolloClient } from '@apollo/client';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { AuthenticationContext } from './Main';
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: themes.backgroundColors.appBar,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        padding: 10,
        gap: 20
    },
    tabs: {
        color: 'white'
    }
});

const NavLink = () => {
    const apolloClient = useApolloClient()
    const authStorage = useContext(AuthStorageContext)
    const data = useContext(AuthenticationContext)
    const handleLogout = () => {
        authStorage.removeAccessToken()
        apolloClient.resetStore()
    }
    return (
        <>
            <Link to={'/'}><MyText fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>Repositories</MyText></Link>
            {data?.me?.id && <Link to={'/create-review'}><MyText fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>Create a review</MyText></Link>}
            {data?.me?.id && <Link to={'/user/reviews'}><MyText fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>My reviews</MyText></Link>}
            {data?.me?.id ? <MyText onPress={handleLogout} fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>Sign out</MyText> : <Link to={'/sign-in'}><MyText fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>Sign in</MyText></Link>}
            {!data?.me?.id && <Link to={'/sign-up'}><MyText fontWeight={'bold'} style={{ color: 'white', padding: 5 }}>Sign up</MyText></Link>}
        </>
    )
}

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal><NavLink /></ScrollView>
        </View>
    )
};

export default AppBar;