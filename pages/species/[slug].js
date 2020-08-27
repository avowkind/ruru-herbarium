import React, { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/fetch'
import config from '../../lib/config'
import { useRouter } from 'next/router'
import SpeciesDetail from '../../components/species/SpeciesDetail'
import SpeciesEditor from '../../components/species/SpeciesEditor'

export default function () {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { slug } = router.query

  const { data, error, mutate } = useSWR(`${config.HOST}/api/species/${slug}`, fetcher)
  const handleSave = () => {
    setEdit(false)
    mutate()
  }
  return (
    <>
      {error && <p className='panel-error'>Failed to load species</p>}
      {edit
        ? <SpeciesEditor species={data} onSave={handleSave} />
        : data &&
          <SpeciesDetail species={data}>
            <button className='btn-primary' onClick={() => setEdit(true)}>Edit</button>
          </SpeciesDetail>}
    </>
  )
}
