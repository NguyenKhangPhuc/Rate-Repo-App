import { gql } from "@apollo/client";

const REPO_FRAGMENT = gql`
    fragment RepoFragment on Repository {
        id
        createdAt
        description
        forksCount
        fullName
        id
        language
        name
        openIssuesCount
        ownerAvatarUrl
        ownerName
        ratingAverage
        reviewCount
        stargazersCount
        url
        
    }
`

export const GET_REPOSITORIES = gql`
    query ExampleQuery ($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories (first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword)  {
            edges{
                node {
                    ...RepoFragment
                }
            cursor
            }
            pageInfo {
                endCursor
                startCursor,
                hasNextPage
            }
        }
    }
${REPO_FRAGMENT}
`


export const ME = gql`
    query me ($includeReviews: Boolean!) {
        me{
            username
            id
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        createdAt
                        id
                        rating
                        repositoryId
                        text
                        user {
                            username
                            id
                        }
                        repository {
                            url
                        }
                    }
                }
            }
        }
    }
`

export const GET_SINGLEREPO = gql`
    query repository ($first: Int, $after: String, $id: ID!){
        repository (id: $id){
            ...RepoFragment
            reviews (first: $first, after: $after) {
                edges {
                    node {
                        createdAt
                        id
                        rating
                        repositoryId
                        text
                        user {
                            username
                            id
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
${REPO_FRAGMENT}
`