const { qgl } = require ("apollo-server-express");

const typeDefs = qgl
    `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook( bookId: ID!): User
    }
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input savedBook {
        authors:[String]
        description: String
        title: String
        bookId: ID!
        image: String
        link: String
    }
    type Auth {
        token
        user
    }
    `
    module.exports = typeDefs;