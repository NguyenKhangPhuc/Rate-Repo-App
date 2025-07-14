import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = (variables) => {
    console.log(variables)
    const { data, loading, refetch, error, fetchMore } = useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network' })
    console.log(error)
    const handleFetchMore = () => {
        const canFetch = !loading && data?.repositories.pageInfo.hasNextPage
        if (!canFetch) {
            return
        }
        fetchMore({ variables: { after: data.repositories.pageInfo.endCursor, ...variables } })
    }
    const repositories = data?.repositories.edges.map((e) => e.node)
    return { repositories, loading, refetch, fetchMore: handleFetchMore }
}

export default useRepositories