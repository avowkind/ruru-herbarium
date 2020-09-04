import {
  GraphQLDate
} from 'graphql-iso-date'
import { specieslist, getSpecies, speciesForPlant, updateSpecies } from '../model/species'
import { plantslist, plant, plantsForSpecies } from '../model/plants'

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    specieslist,
    species: getSpecies,
    plantslist,
    plant
  },
  Mutation: {
    createSpecies: updateSpecies,
    updateSpecies: updateSpecies
  },
  Plant: {
    species: speciesForPlant
  },
  Species: {
    plantslist: plantsForSpecies
  }
}
