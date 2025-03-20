import { gql } from 'apollo-server';

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }

type Auth {
    token: ID!
    user: User
    }

type Matchup {
    _id: ID
    name: String
    votes: Int
}

type Query {
    me: User
    matchups: [Matchup]
    }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
    removeBook(bookId: String): User
    addMatchup(name: String!): Matchup
    voteMatchup(matchupId: ID!): Matchup
    }

    `;

export default typeDefs;
