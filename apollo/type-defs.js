import gql from 'graphql-tag'

export const typeDefs = gql`
  scalar Date
  type Species {
    _id: ID!
    name: String
    slug: String
    otherCommonNames: String
    scientificName: String
    taxon: String
    imageUrl: String
    habit: String
    native: String
    flowers: String
    flower_time: String
    fruit: String
    fruit_time: String
    soil: String
    ph: String
    tolerates: String
    createdAt: Date
    creatorId: String
    description: String
    uses: String
  }

  type Query {
    species: [Species]!
  }
`
