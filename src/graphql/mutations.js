import { gql } from "@apollo/client";


export const AUTHENTICATE = gql`
    mutation authenticate($credentials: AuthenticateInput!){
        authenticate(credentials: $credentials){
            user{
                username
                id
            }
                accessToken
                expiresAt
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput){
        createReview(review: $review){
            createdAt
            id
            text
            repositoryId
            user {
                username
            }
            repository {
                ownerName
            }
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput!){
        createUser(user: $user){
            createdAt
            id
            reviewCount
            username
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!){
        deleteReview(id: $id)
    }
`