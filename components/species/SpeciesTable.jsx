import React from 'react';
import Tags from './tags'
import Link from 'next/link'

const SpeciesRow = ({ species }) => {
 
  return (
    <Link href={`/species/${species.name}`}>
      <tr className='hover:bg-grey-200'>
        <td>{species.name}</td>
        <td>{species.scientificName}</td>
        <td>{species.otherCommonNames}</td>
        <td><Tags tags={species.tags} /></td>
      </tr>
    </Link>
  );
}

const SpeciesTable = ({species}) => {
  return (
    <div className='panel'>
    <table className='table-auto'>
      <thead>
        <th>Name</th>
        <th>Scientific name</th>
        <th>Other names</th>
        <th>tags</th>
      </thead>
      <tbody>
        {species.map( (sp, index) => <SpeciesRow key={index} species={sp} />)}
      </tbody>
    </table>
    </div>
  )
}
export default SpeciesTable