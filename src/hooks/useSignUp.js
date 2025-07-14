import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations"
import useSignIn from "./useSignIn"

const useSignUp = (authStorage) => {
    const [signUp, result] = useMutation(CREATE_USER,)
    const [signIn, signInResult] = useSignIn(authStorage)
    const createUser = async (newUser) => {
        const { data } = await signUp({ variables: { user: newUser } })
        console.log(data)
        if (data) {
            await signIn(newUser)
        }
    }
    return [createUser, result]
}

export default useSignUp