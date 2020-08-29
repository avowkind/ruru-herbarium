import useSWR from 'swr'
import fetcher from '../../lib/fetch'
import PlantTable from './PlantTable'
import config from '../../lib/config'

export default function PlantView () {
  const { data, error } = useSWR(`${config.HOST}/api/plants`, fetcher)

  return (
    <>
      {error && <p className='panel-error'>Failed to load plants</p>}
      {data && <PlantTable plants={data} />}
    </>
  )
}
