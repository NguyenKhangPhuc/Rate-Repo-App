
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepoList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignInForm from './SignInForm';
import SingleRepo from './SingleRepo';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { createContext } from 'react';
import MyReviews from './MyReviews';
export const AuthenticationContext = createContext()
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e6e6',
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    const { data } = useQuery(ME, { variables: { includeReviews: true } })
    console.log('this is me', data)
    return (
        <AuthenticationContext.Provider value={data}>
            <View style={styles.container}>
                <AppBar />
                <Routes>
                    <Route path="/" element={<RepositoryList />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path='/sign-in' element={<SignInForm />} />
                    <Route path='/repository/:id' element={<SingleRepo />} />
                    <Route path='/create-review' element={data?.me?.id ? <ReviewForm /> : <RepositoryList />} />
                    <Route path='/sign-up' element={<SignUpForm />} />
                    <Route path='/user/reviews' element={data?.me?.id ? <MyReviews /> : <RepositoryList />} />
                </Routes>
            </View>
        </AuthenticationContext.Provider>

    );
};

export default Main;