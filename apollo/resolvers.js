import {
  GraphQLDate
} from 'graphql-iso-date'

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    async species (_parent, _args, _context, _info) {
      console.log('resolving species', _info.fieldNodes[0].selectionSet.selections[1].name)
      const species = await _context.db
        .collection('species')
        .find({})
        .toArray()
      return species
    }
  }
}
