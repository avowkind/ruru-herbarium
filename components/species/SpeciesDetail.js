import React from 'react'
import Tags from './tags'
import ContentEditable from 'react-contenteditable'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import gql from 'graphql-tag'
import PlantTable from '../plants/PlantTable'
import { useMutation } from '@apollo/client'

export const Html = ({ children }) =>
  <div dangerouslySetInnerHTML={{ __html: children }} />

export const allSpeciesFields = gql`
fragment allSpeciesFields on Species {
  _id
  name
  slug
  scientificName
  otherCommonNames
  habit
  taxon
  imageUrl
  habit
  native
  flowers
  flower_time
  fruit
  fruit_time
  soil
  ph
  tolerates
  createdAt
  creatorId
  description
  notes
  planting
  maintenance
  uses
}
`
export const SpeciesDetailQuery = gql`
  query species($slug: String!) {
    species(slug: $slug) {
      ...allSpeciesFields
      plantslist {
        plantCount
        variety
        purchaseDate
        purchasedFrom
        location
      }
    }
  }
  ${allSpeciesFields}
`

export const SpeciesMutate = gql`
  mutation species($species: newSpecies!) {
    updateSpecies(species: $species) {
      ...allSpeciesFields
    }
  }
  ${allSpeciesFields}
`

const SpeciesDetail = ({ species, children }) => {
  const [speciesMutate, { data }] = useMutation(SpeciesMutate)

  const handleChange = (e) => {
    const field = e.currentTarget.id
    console.log('input', field)
    species[field] = e.target.value
  }
  const updateSpecies = async (species, field) => {
    if (species && species._id) {
      console.log('speciesMutate field', field, species)
      const res = await speciesMutate(
        {
          variables: {
            species: {
              _id: species._id,
              [field]: species[field]
            }
          }
        }
      )
      console.log(res)
    }
  }
  const handleBlur = (e) => {
    const field = e.currentTarget.id
    console.log('blur', field, e.currentTarget)
    species[field] = e.currentTarget.innerHTML
    updateSpecies(species, field)
  }

  const SpeciesItem = ({ tag, id, className }) =>
    <ContentEditable
      id={id}
      className={className}
      html={species[id]} // innerHTML of the editable div
      onChange={handleChange} // handle innerHTML change
      onBlur={handleBlur}
      tagName={tag || 'span'}
    />

  const SpeciesProps = () =>
    <dl className='border-l pl-4 grid grid-flow-row grid-cols-2 max-w-md' height='100px'>
      <dt>Habit</dt>
      <SpeciesItem id='habit' tag='dd' />
      <dt>Native</dt>
      <SpeciesItem id='native' tag='dd' />
      <dt>Flowers</dt>
      <SpeciesItem id='flowers' tag='dd' />
      <dt>Flowering Time</dt>
      <SpeciesItem id='flower_time' tag='dd' />
      <dt>Fruit</dt>
      <SpeciesItem id='fruit' tag='dd' />
      <dt>Fruit Time</dt>
      <SpeciesItem id='fruit_time' tag='dd' />
      <dt>Soil Texture</dt>
      <SpeciesItem id='soil' tag='dd' />
      <dt>pH</dt>
      <SpeciesItem id='ph' tag='dd' />
      <dt>Tolerates</dt>
      <SpeciesItem id='tolerates' tag='dd' />
    </dl>
  return (
    <>
      <div className='panel'>
        <div className='border-b-2 flex flex-row max-w-full'>
          <h1>
            <SpeciesItem id='name' />
            <SpeciesItem id='scientificName' className='ml-2 italic font-serif text-lg text-gray-800' />
          </h1>
          <div className='ml-auto mr-2 mt-2'>{children}</div>
        </div>
        <div className='text-gray-600 '>
        Common Names:
          <SpeciesItem id='otherCommonNames' className='ml-2' />
        </div>

        <div className='flex flex-wrap-reverse  md:flex-no-wrap flex-row'>
          <SpeciesItem id='description' tag='section' className='w-2/3 mt-4 md:mt-0' />
          <img className='w-1/3  object-cover sm:ml-2' src={species.imageUrl} />
        </div>

        <div className='flex flex-row mt-2'>
          <Tabs className='w-2/3'>
            <TabList>
              <Tab>Notes</Tab>
              <Tab>Planting</Tab>
              <Tab>Maintenance</Tab>
              <Tab>Uses</Tab>
            </TabList>

            <TabPanel>
              <SpeciesItem id='notes' tag='section' className='mt-4 md:mt-0 prose' />
            </TabPanel>
            <TabPanel>
              <SpeciesItem id='planting' tag='section' className='mt-4 md:mt-0 prose' />
            </TabPanel>
            <TabPanel>
              <SpeciesItem id='maintenance' tag='section' className='mt-4 md:mt-0 prose' />
            </TabPanel>
            <TabPanel>
              <SpeciesItem id='uses' tag='section' className='mt-4 md:mt-0 prose' />
            </TabPanel>
          </Tabs>
          <SpeciesProps />
        </div>
        <a href={`https://www.wikiwand.com/en/${species.scientificName}`}>
          {species.scientificName} on Wikipedia
        </a>
        <Tags tags={species.tags} />
      </div>

      <PlantTable plants={species.plantslist} omitspecies />
    </>
  )
}
export default SpeciesDetail
