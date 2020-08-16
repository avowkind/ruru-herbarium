import React from 'react';
import SpeciesDetail from '../../components/species/SpeciesDetail'
import useSWR from 'swr';
import fetcher from '../../lib/fetch'
import config from '../../lib/config'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { name } = router.query
  const { data, error } = useSWR(`${config.HOST}/api/species/${name}`, fetcher)
  return (
    <>
      {error && <p className='panel-error'>Failed to load species</p>}
      {data && <SpeciesDetail species={data} />}
    </>
  )
}

export default Page
