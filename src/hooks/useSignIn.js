import { useApolloClient, useMutation } from "@apollo/client"
import { AUTHENTICATE } from "../graphql/mutations"
import { useNavigate } from "react-router-native"

const useSignIn = (authStorage) => {
    const apolloClient = useApolloClient()
    const navigate = useNavigate()
    const [authenticate, result] = useMutation(AUTHENTICATE, {
        onCompleted: async (response) => {
            console.log(response.authenticate.accessToken)
            await authStorage.setAccessToken(response.authenticate.accessToken)
            apolloClient.resetStore()
            navigate('/')
        }
    })
    const signIn = async (credentials) => {
        await authenticate({ variables: { credentials } })
    }

    return [signIn, result]
}

export default useSignIn