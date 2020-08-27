import React, { createContext, useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Tags from './tags'
import ContentEditable from 'react-contenteditable'

export const Html = ({ children }) =>
  <div dangerouslySetInnerHTML={{ __html: children }} />

const NameList = ({ names }) => {
  if (!names || names.length === 0) return ''
  return (
    <div className='pb-2 grid grid-flow-row grid-cols-4 gap-4 '>
      {names.map(
        (name, index) => <div className='text-gray-700 pl-1 divide-x-6 divide-gray-800' key={index}>{name}</div>
      )}
    </div>
  )
}

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

  return (
    <div className='max-w-full px-2 py-2 my-2 bg-white rounded-lg shadow-md '>
      <div className='border-b-2 flex flex-row max-w-full'>
        <h1>{species.name}
          <span className='ml-2 italic font-serif text-lg text-gray-800'>{species.scientificName}</span>
        </h1>
        <div className='ml-auto mr-2 mt-2'>{children}</div>
      </div>
      <p className='text-gray-600 '>{species.otherCommonNames}</p>
      <div className='flex flex-wrap-reverse  md:flex-no-wrap flex-row'>
        {/* <ReactMarkdown className='w-2/3 mt-4 md:mt-0 prose' source={species.description} /> */}
        <ContentEditable
          id='description'
          className='w-2/3 mt-4 md:mt-0 prose'
          html={species.description} // innerHTML of the editable div
          onChange={handleChange} // handle innerHTML change
          onBlur={handleBlur}
          tagName='section'
        />
        <img className='w-1/3  object-cover sm:ml-2' src={species.imageUrl} />
      </div>
      <h2>Notes</h2>
      <ContentEditable
        id='notes'
        className='flex-auto flex-col my-4 md:mt-0 prose'
        html={species.notes} // innerHTML of the editable div
        onChange={handleChange} // handle innerHTML change
        onBlur={handleBlur}
        tagName='section'
      />
      <dl className='grid grid-flow-row grid-cols-2 max-w-md' height='100px'>
        <dt>Habit</dt><dd>{species.habit}</dd>
        <dt>Native</dt><dd>{species.native}</dd>
        <dt>Flowers</dt><dd>{species.flowers}</dd>
        <dt>Flowering Time</dt><dd>{species.flower_time}</dd>
        <dt>Fruit</dt><dd>{species.fruit}</dd>
        <dt>Fruit Time</dt><dd>{species.fruit_time}</dd>
        <dt>Soil Texture</dt><dd>{species.soil}</dd>
        <dt>pH</dt><dd>{species.ph}</dd>
        <dt>Tolerates</dt><dd>{species.tolerates}</dd>
      </dl>

      <Tags tags={species.tags} />
    </div>
  )
}
export default SpeciesDetail
