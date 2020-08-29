import React, { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/fetch'
import config from '../../lib/config'
import { useRouter } from 'next/router'
import PlantDetail from '../../components/plants/PlantDetail'
import PlantEditor from '../../components/plants/PlantEditor'

export default function PlantsPage () {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { _id } = router.query

  const { data, error, mutate } = useSWR(`${config.HOST}/api/plants/${_id}`, fetcher)
  const handleSave = () => {
    setEdit(false)
    mutate()
  }
  return (
    <>
      {error && <p className='panel-error'>Failed to load plant</p>}
      {edit
        ? <PlantEditor plant={data} onSave={handleSave} />
        : data &&
          <PlantDetail plant={data}>
            <button className='btn-primary' onClick={() => setEdit(true)}>Edit</button>
          </PlantDetail>}
    </>
  )
}
