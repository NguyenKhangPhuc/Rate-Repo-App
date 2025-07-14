import { useFormik } from 'formik'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import * as yup from 'yup'
import themes from '../themes/themes'
import useSignUp from '../hooks/useSignUp'
import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'
const SignUpForm = () => {
    const authStorage = useContext(AuthStorageContext)
    const [createUser] = useSignUp(authStorage)
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(5, 'Number of characters need to be between 5 to 30')
            .max(30, 'Number of characters need to be between 5 to 30')
            .required('Username is required'),
        password: yup
            .string()
            .min(5, 'Number of characters need to be between 5 to 30')
            .max(30, 'Number of characters need to be between 5 to 30')
            .required('Password is required'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password is not the same as above')
            .required('Password confirm is required')
    })
    const handleCreateNewUser = async (values) => {
        const newUser = { username: values.username, password: values.password }
        console.log(newUser)
        try {
            await createUser(newUser)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema,
        onSubmit: handleCreateNewUser
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
            <TextInput placeholder="Confirm your password" style={[style.input, { borderColor: formik.touched.passwordConfirm && formik.errors.passwordConfirm && 'red' }]} secureTextEntry value={formik.values.passwordConfirm} onChangeText={formik.handleChange('passwordConfirm')} />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <Text style={style.errors}>{formik.errors.passwordConfirm}</Text>}
            <Button title="Sign in" onPress={formik.handleSubmit} />
        </View>
    )
}

export default SignUpForm