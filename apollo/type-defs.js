import gql from 'graphql-tag'

export const typeDefs = gql`
  scalar Date
  type Plant {
    _id: ID!
    species: Species
    purchaseDate: Date
    purchasedFrom: String
    imageUrl: String
    cost: String
    location: String
    variety: String
    plantCount: Int
  }
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
    plantslist: [Plant]
  }
  input newSpecies {
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
    specieslist: [Species]!
    species(slug: String!): Species
    plantslist: [Plant]!
    plant(id: ID!): Plant
  }

  type Mutation {
    createSpecies( species: newSpecies! ): Species!
    updateSpecies( species: newSpecies! ): Species!
  }
`
