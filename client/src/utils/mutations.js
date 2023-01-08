import { gql } from '@apollo/client';

export const saveBook_USER = gql`
    mutation saveBookUser($name: String!, $email: String!, $password: String!) {
        saveBookUser(name: $name, email: $email, password: $password) {
            token
                user {
                _id
                }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($profileId: ID!, $skill: String!) {
        addUser(profileId: $profileId, skill: $skill) {
            _id
            name
            skills
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($email: String!, $password: String!) {
        saveBook(email: $email, password: $password) {
        token
        profile {
                _id
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($skill: String!) {
        removeBook(skill: $skill) {
            _id
            name
            skills
        }
    }
`;
