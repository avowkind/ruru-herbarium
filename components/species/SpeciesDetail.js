import React from 'react';
import ReactMarkdown from 'react-markdown'
import Tags from './tags'
export const speciesNew = [
  {
    name: '', // common english name
    otherCommonNames: '', // maori name 
    scientificName: '', // genus, species, varietal
    taxon: '', // family, group etc.
    description: '', // longer description
    morphology: '', // ( tree, bush, etc)
    native: '', //  ( native, heirloom, introduced, exotic )
    soils: [], // 
    uses: {
      medicinal: '',
      wood: '',
      other: ''
    },
    sun: [],
    pollination: [],
    tags: [],
    links: [] // list of references
  }
]
const NameList = ({names}) => {
  if (!names || names.length === 0 ) return ''
  return (
    <div className='pb-2 grid grid-flow-row grid-cols-4 gap-4 '>
    {names.map( 
      (name, index) => <div className='text-gray-700 pl-1 divide-x-6 divide-gray-800' key={index}>{name}</div>
    )}
    </div>
  )
}

const  SpeciesDetail = ({ species }) => {
  return (
    <div className='max-w-full px-2 py-2 my-2 bg-white rounded-lg shadow-md '>
        <h1 className='border-b-2'>{species.name}
          <span className='ml-2 italic font-serif text-lg text-gray-800'>{species.scientificName}</span>
        </h1>
        <p className='text-gray-700 '>{species.otherCommonNames}</p>
        <div className='flex flex-wrap-reverse  md:flex-no-wrap flex-row'>
          <ReactMarkdown className='flex-auto flex-col mt-4 md:mt-0 prose' source={species.description}></ReactMarkdown>
          <img className='flex-auto  object-cover sm:ml-2' src={species.imageUrl}></img>
        </div>
        <Tags tags={species.tags} />
    </div>
  );
}

export default SpeciesDetail