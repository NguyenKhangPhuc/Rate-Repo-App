import { useQuery } from "@apollo/client"
import { GET_SINGLEREPO } from "../graphql/queries"

const useSingleRepo = (variables) => {
    const { data, loading, error, fetchMore } = useQuery(GET_SINGLEREPO, { variables: variables, fetchPolicy: 'cache-and-network', })
    if (error) {
        console.log(error)
        return { repository: [] }
    }
    const handleFetchMore = () => {
        const canFetch = !loading && data?.repository.reviews.pageInfo.hasNextPage
        if (!canFetch) {
            return;
        }
        fetchMore({ variables: { after: data.repository.reviews.pageInfo.endCursor, ...variables } })
    }
    const repository = data?.repository
    const reviews = data?.repository.reviews.edges.map(e => e.node)
    return { repository, reviews, loading, fetchMore: handleFetchMore }
}
export default useSingleRepo