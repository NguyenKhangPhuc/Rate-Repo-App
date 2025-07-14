import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import themes from "../themes/themes"
import { useFormik } from "formik"
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

export const SignInFormContainer = ({ signIn }) => {
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(5, 'Username need to be at least 5 characters')
            .required('Username is required'),
        password: yup
            .string()
            .min(5, 'Password need to be at least 5 characters')
            .required('Password is required'),
    })
    const handleSubmitCredentials = async (values) => {
        try {
            await signIn(values)
        } catch (e) {
            console.log(e)
        }

    }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: handleSubmitCredentials
    })
    const style = StyleSheet.create({
        container: {
            padding: 15,
            display: 'flex',
            gap: 10
        },
        input: {
            backgroundColor: 'white',
            height: 60,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 15,
            fontSize: themes.fontSizes.subheading
        },
        errors: {
            color: 'red'
        }
    })
    return (
        <View style={style.container}>
            <TextInput placeholder="Name" style={[style.input, { borderColor: formik.touched.username && formik.errors.username && 'red' }]} value={formik.values.username} onChangeText={formik.handleChange('username')} />
            {formik.touched.username && formik.errors.username && <Text style={style.errors}>{formik.errors.username}</Text>}
            <TextInput placeholder="Password" style={[style.input, { borderColor: formik.touched.password && formik.errors.password && 'red' }]} secureTextEntry value={formik.values.password} onChangeText={formik.handleChange('password')} />
            {formik.touched.password && formik.errors.password && <Text style={style.errors}>{formik.errors.password}</Text>}
            <Button title="Sign in" onPress={formik.handleSubmit} />
        </View>
    )
}

const SignInForm = () => {
    const authStorage = useContext(AuthStorageContext)
    console.log(authStorage.getAccessToken())
    const [signIn] = useSignIn(authStorage)
    return <SignInFormContainer signIn={signIn} />
}

export default SignInForm