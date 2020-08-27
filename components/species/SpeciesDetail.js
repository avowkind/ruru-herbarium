import React from 'react'
import Tags from './tags'
import ContentEditable from 'react-contenteditable'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const Html = ({ children }) =>
  <div dangerouslySetInnerHTML={{ __html: children }} />

// const NameList = ({ names }) => {
//   if (!names || names.length === 0) return ''
//   return (
//     <div className='pb-2 grid grid-flow-row grid-cols-4 gap-4 '>
//       {names.map(
//         (name, index) => <div className='text-gray-700 pl-1 divide-x-6 divide-gray-800' key={index}>{name}</div>
//       )}
//     </div>
//   )
// }

const updateSpecies = async (species, field) => {
  if (species && species._id) {
    fetch(`/api/species/${species.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: species._id, [field]: species[field] })
    })
  }
}
const SpeciesDetail = ({ species, children }) => {
  const handleChange = (e) => {
    const field = e.currentTarget.id
    console.log('input', field)
    species[field] = e.target.value
    // updateSpecies(species, field)
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
    <div className='max-w-full px-2 py-2 my-2 bg-white rounded-lg shadow-md '>
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
      <Tags tags={species.tags} />
    </div>
  )
}
export default SpeciesDetail
