import React, {useState} from 'react';
import SpeciesView from '../components/species/SpeciesView'
import SpeciesEditor from '../components/species/SpeciesEditor'

const Page = () => {
  const [newSpecies, setNewSpecies] = useState(false)
  return (
    <>
      <button
        onClick={() => setNewSpecies(true)}
        className='btn-blue mt-2'
      >
        New Species
      </button>
      {newSpecies && <SpeciesEditor onSave={() => setNewSpecies(false)}/>}
      <SpeciesView  />
    </>
  );
};

export default Page;
