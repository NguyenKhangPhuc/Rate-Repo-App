import { useApolloClient, useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"
import { useNavigate } from "react-router-native"

const useReviewForm = () => {
    const apolloClient = useApolloClient()
    const navigate = useNavigate()
    const [createReview, result] = useMutation(CREATE_REVIEW, {
        onCompleted: async (response) => {
            apolloClient.resetStore()
            navigate(`/repository/${response.createReview.repositoryId}`)
        }
    })
    const create = async (createReviewInput) => {
        console.log('Đây là nó nè', createReviewInput)
        await createReview({ variables: { review: createReviewInput } })
    }

    return [create, result]
}

export default useReviewForm