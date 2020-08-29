import React, { useState } from 'react'
import PlantView from '../components/plants/PlantView'
import PlantEditor from '../components/plants/PlantEditor'

export default function PlantPage () {
  const [newPlant, setNewPlant] = useState(false)
  return (
    <>
      <button
        onClick={() => setNewPlant(true)}
        className='btn-primary mt-2'
      >
        New Plant
      </button>
      {newPlant && <PlantEditor onSave={() => setNewPlant(false)} />}
      <PlantView />
    </>
  )
}
