import React, { useState } from 'react'
import { withApollo } from '../apollo/client'
import SpeciesEditor from '../components/species/SpeciesEditor'
import SpeciesView from '../components/species/SpeciesViewGQL'

function SpeciesPage () {
  const [newSpecies, setNewSpecies] = useState(false)
  return (
    <>
      <button
        onClick={() => setNewSpecies(true)}
        className='btn-primary mt-2'
      >
        New Species
      </button>
      {newSpecies && <SpeciesEditor onSave={() => setNewSpecies(false)} />}
      <SpeciesView />
    </>
  )
}

export default withApollo(SpeciesPage)
