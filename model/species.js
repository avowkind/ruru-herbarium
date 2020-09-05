import { ObjectID } from 'mongodb'
import slug from 'limax'

export async function specieslist (_parent, _args, context, _info) {
  console.log('specieslist')
  const species = await context.db
    .collection('species')
    .find({})
    .toArray()
  return species
}

export async function getSpecies (_parent, args, context, _info) {
  console.log('resolving one species', args)
  const species = await context.db
    .collection('species')
    .findOne(args)
  return species
}

export async function speciesForPlant (parent, _args, context) {
  // get the species referenced by the plant
  console.log('resolving one plants species for', parent.species)
  const sp = await context.db
    .collection('species')
    .findOne({ slug: slug(parent.species) })
  sp.species = parent.species
  return sp
}

export async function updateSpecies (_parent, args, context, _info) {
  console.log('updateSpecies', args)
  const species = args.species

  if (!species) return null

  let _id = species._id
  delete species._id
  try {
    const doc = await context.db
      .collection('species')
      .updateOne(
        { _id: ObjectID(_id) },
        {
          $set: {
            ...species
          }
        },
        { upsert: true }
      )
    console.log('created', doc)
    _id = _id || doc.upsertedId._id
    return getSpecies(_parent, { _id: ObjectID(_id) }, context, _info)
  } catch (e) {
    console.log('error', e)
    return null
  }
}
