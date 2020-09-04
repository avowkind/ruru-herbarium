
export async function plantslist (_parent, _args, context, _info) {
  console.log('resolving all plants')
  const plants = await context.db
    .collection('plants')
    .find({})
    .toArray()
  return plants
}

export async function plant (_parent, args, context, _info) {
  console.log('resolving one plant by ', args)
  const species = await context.db
    .collection('plants')
    .findOne(args)
  return species
}

export async function plantsForSpecies (parent, _args, _context) {
  // get the list of plants we have of a species
  console.log('resolving one species plants for', parent.species)
  const pl = await _context.db
    .collection('plants')
    .find({ species: parent.name })
    .toArray()
  return pl
}
