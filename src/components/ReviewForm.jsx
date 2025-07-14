import { useFormik } from "formik"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import themes from "../themes/themes"
import * as yup from 'yup';
import useReviewForm from "../hooks/useReviewForm";
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
const ReviewForm = () => {
    const [create] = useReviewForm()
    const validationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required(),
        repositoryName: yup
            .string()
            .required(),
        rating: yup
            .number()
            .typeError('Rating must be a number')
            .min(0, 'Rating cannot below 0')
            .max(100, 'Rating cannot over 100')
            .required(),
        text: yup.string()
    })
    const handleSubmitReviewForm = async (values) => {
        const createReviewInput = { ...values, rating: parseInt(values.rating) }
        console.log(createReviewInput)
        try {
            await create(createReviewInput)
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            ownerName: '',
            repositoryName: '',
            rating: '',
            text: '',
        },
        validationSchema,
        onSubmit: handleSubmitReviewForm
    })

    return (
        <View style={style.container} >
            <TextInput placeholder="Repository owner name" style={[style.input, { borderColor: formik.touched.ownerName && formik.errors.ownerName && 'red' }]} value={formik.values.ownerName} onChangeText={formik.handleChange('ownerName')} />
            {formik.touched.ownerName && formik.errors.ownerName && <Text style={style.errors}>{formik.errors.ownerName}</Text>}
            <TextInput placeholder="Repository name" style={[style.input, { borderColor: formik.touched.repositoryName && formik.errors.repositoryName && 'red' }]} value={formik.values.repositoryName} onChangeText={formik.handleChange('repositoryName')} />
            {formik.touched.repositoryName && formik.errors.repositoryName && <Text style={style.errors}>{formik.errors.repositoryName}</Text>}
            <TextInput placeholder="Rating between 0 and 100" style={[style.input, { borderColor: formik.touched.rating && formik.errors.rating && 'red' }]} value={formik.values.rating} onChangeText={formik.handleChange('rating')} />
            {formik.touched.rating && formik.errors.rating && <Text style={style.errors}>{formik.errors.rating}</Text>}
            <TextInput placeholder="Review" multiline={true} style={[style.input, { borderColor: formik.touched.text && formik.errors.text && 'red' }]} value={formik.values.text} onChangeText={formik.handleChange('text')} />
            {formik.touched.text && formik.errors.text && <Text style={style.errors}>{formik.errors.text}</Text>}
            <Button title="Create" onPress={formik.handleSubmit} />
        </View >
    )
}

export default ReviewForm