import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"
import { ME } from "../graphql/queries"

const useDeleteReview = () => {
    const [deleteReview, result] = useMutation(DELETE_REVIEW, { refetchQueries: [{ query: ME, variables: { includeReviews: true } }], onCompleted: (res) => console.log(res) })
    const handleDeleteReview = async (id) => {
        console.log('this is id inside', id)
        try {
            await deleteReview({ variables: { id } })
        } catch (error) {
            console.log(error)
        }
    }
    return [handleDeleteReview, result]
}

export default useDeleteReview