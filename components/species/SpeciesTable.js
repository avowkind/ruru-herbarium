import React from 'react';
import Tags from './tags'
import Link from 'next/link'
import Reactable from 'reactable'

const Table = Reactable.Table;

const SpeciesRow = ({ species }) => {
 
  return (
    <Link href={`/species/${species.name}`}>
      <tr className='hover:bg-grey-400'>
        <td className='hover:bg-grey-200'><a>{species.name}</a></td>
        <td>{species.scientificName}</td>
        <td>{species.otherCommonNames}</td>
        <td><Tags tags={species.tags} /></td>
      </tr>
    </Link>
  );
}

const SpeciesTable1 = ({species}) => {
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

const SpeciesTable = ({species}) => {
  return (
    <div className='panel'>
    <Table 
      className="table" 
      id="SpeciesTable" 
      data={species}
      columns={[ 
        { key: 'name', label: 'Common Name' }, // common english name
        { key: 'otherCommonNames', label: 'Other names' }, // maori name 
        { key: 'scientificName', label: 'Scientific name' }, // genus, species, varietal
        ]}
      sortable={[
        'name',
        'scientificName'
      ]}
      defaultSort={{column: 'name', direction: 'desc'}}
      filterable={['name', 'otherCommonNames', 'scientificName']}
    />  
    </div>
  )
} 
export default SpeciesTable