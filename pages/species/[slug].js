import React, { useState } from 'react'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

import SpeciesDetail, { SpeciesDetailQuery } from '../../components/species/SpeciesDetail'
import SpeciesEditor from '../../components/species/SpeciesEditor'

function SpeciesDetailPage() {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { slug } = router.query
  const { loading, error, data } 
    = useQuery(SpeciesDetailQuery, {
    variables: { slug },
  })

  if (loading) return 'loading species...'
  if (error) return <p className='panel-error'>Failed to load species</p>
  console.log(data)
  const handleSave = () => {
    setEdit(false)
    mutate()
  }
  return (
    <>
      {edit
        ? <SpeciesEditor species={data.species} onSave={handleSave} />
        : data &&
          <SpeciesDetail species={data.species}>
            <button className='btn-primary' onClick={() => setEdit(true)}>Edit</button>
          </SpeciesDetail>}
    </>
  )
}
export default withApollo(SpeciesDetailPage)
