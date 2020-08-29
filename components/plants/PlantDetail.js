import React from 'react'
import ContentEditable from 'react-contenteditable'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Link from 'next/link'
import slug from 'limax'

export const Html = ({ children }) =>
  <div dangerouslySetInnerHTML={{ __html: children }} />

const updatePlant = async (plant, field) => {
  if (plant && plant._id) {
    fetch(`/api/plants/${plant._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: plant._id, [field]: plant[field] })
    })
  }
}
const PlantDetail = ({ plant, children }) => {
  const handleChange = (e) => {
    const field = e.currentTarget.id
    plant[field] = e.target.value
    // updatePlant(plant, field)
  }
  const handleBlur = (e) => {
    const field = e.currentTarget.id
    console.log('blur', field, e.currentTarget)
    plant[field] = e.currentTarget.innerHTML
    updatePlant(plant, field)
  }

  const PlantItem = ({ tag, id, className }) =>
    <ContentEditable
      id={id}
      className={className}
      html={plant[id]} // innerHTML of the editable div
      onChange={handleChange} // handle innerHTML change
      onBlur={handleBlur}
      tagName={tag || 'span'}
    />

  const PlantProps = () =>
    <dl className='border-l pl-4 grid grid-flow-row grid-cols-2 max-w-md' height='100px'>
      <dt>Count</dt>
      <PlantItem id='plantCount' tag='dd' />
      <dt>Purchased</dt>
      <PlantItem id='purchaseDate' tag='dd' />
      <dt>From</dt>
      <PlantItem id='purchasedFrom' tag='dd' />
      <dt>Cost $</dt>
      <PlantItem id='cost' tag='dd' />
      <dt>Planted at</dt>
      <PlantItem id='location' tag='dd' />
    </dl>

  return (
    <div className='max-w-full px-2 py-2 my-2 bg-white rounded-lg shadow-md '>
      <div className='border-b-2 flex flex-row max-w-full'>
        <Link href={`/species/${slug(plant.species)}`}>
          <h1>
            {plant.plantCount}{" "} 
            <PlantItem id='species' />{" "} 
            {plant.variety && <span className='ml-2 italic font-serif text-lg text-gray-800'>(var: <PlantItem id='variety' />)</span> }
            {" - "}<PlantItem id='purchaseDate' tag='span' />
          </h1>
        </Link>
        <div className='ml-auto mr-2 mt-2'>{children}</div>
      </div>

      <div className='flex flex-row mt-2'>
        <Tabs className='w-2/3'>
          <TabList>
            <Tab>Notes</Tab>
            <Tab>Planting</Tab>
          </TabList>
          <TabPanel>
            <PlantItem id='notes' tag='section' className='mt-4 md:mt-0 prose' />
          </TabPanel>
          <TabPanel>
            <PlantItem id='planting' tag='section' className='mt-4 md:mt-0 prose' />
          </TabPanel>
        </Tabs>
        <PlantProps />
      </div>
    </div>
  )
}
export default PlantDetail
