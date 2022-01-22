const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
//const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()


const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}



type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID! 
}


type Mutation {
  addBook(
    title: String!
    author: String
    published: Int!
    genres: [String!]!
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int
  ): Author

  createUser(
    username: String!
    favouriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token

}
type Subscription {
  bookAdded: Book!
}    

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book]
  allAuthors: [Author!]!
  me: User
  findBooks(genre: String): [Book]!
  
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      const findAuthors = await Author.find({}).populate('name')
      return findAuthors
      },
    allBooks: async (root, args) => {
      const findBooks= await Book.find({}).populate("author")
      
      return findBooks},
    me: (root, args, context) => {
      return context.currentUser
      },
    findBooks: async (root, args) => {
      if (args.genre === null){
        const findBooks= await Book.find({}).populate("author")
      
        return findBooks
      
      }
      const findGenreBooks = await Book.find({ genres: args.genre }).populate("author")
      return findGenreBooks
      
    }

  },
  Author: {
  bookCount: async (root, args) => {
    const books = await Book.find( { author: { $in: [ root._id ] } } )
    return books.length
  }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const findAuthor = await Author.findOne({name: args.author})
      currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (findAuthor !== null) {
        const book = new Book({ ...args, author: findAuthor })
        try{
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }
    
    const author = new Author({ name: args.author, born: null })
    const book = new Book({ ...args, author: author })
    try{
      await author.save()
      await book.save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
    return book

  },
  editAuthor: async(root, args, context) => {
    const author = await Author.findOne({name: args.name})
    currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
    if (!author) {
      return null
    }
    author.born = args.setBornTo
    try{
      await author.save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
   
    return author
  },
  createUser: (root, args) => {
    const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new UserInputError("wrong credentials")
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, JWT_SECRET) }
  },
},
  Subscription: {
    bookAdded: {
  
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])  
    },
  },
}
  

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
      }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})