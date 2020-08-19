import React from 'react';
import ReactMarkdown from 'react-markdown'
import Tags from './tags'

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
const  SpeciesDetail = ({ species, children }) => 
  <div className='max-w-full px-2 py-2 my-2 bg-white rounded-lg shadow-md '>
    <div className='border-b-2 flex flex-row max-w-full'>
      <h1 >{species.name}
        <span className='ml-2 italic font-serif text-lg text-gray-800'>{species.scientificName}</span>
      </h1>
      <div className='ml-auto mr-2 mt-2'>{children}</div>
    </div>
    <p className='text-gray-700 '>{species.otherCommonNames}</p>
    <div className='flex flex-wrap-reverse  md:flex-no-wrap flex-row'>
      <ReactMarkdown className='flex-auto flex-col mt-4 md:mt-0 prose' source={species.description}></ReactMarkdown>
      <img className='flex-auto  object-cover sm:ml-2' src={species.imageUrl}></img>
    </div>
    <table>
      <tr><th>Habit</th><td>{species.habit}</td></tr>
      <tr><th>Native</th><td>{species.native}</td></tr>

    </table>
    <Tags tags={species.tags} />
  </div>


export default SpeciesDetail