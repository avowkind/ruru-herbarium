import useSWR from 'swr';
import fetcher from '../../lib/fetch';
import SpeciesTable from './SpeciesTable'
import config from '../../lib/config'

export default function SpeciesView() {
  const { data, error } = useSWR(`${config.HOST}/api/species`, fetcher)
 
  return (
    <>
      {error && <p className='panel-error'>Failed to load species</p>}
      {data && <SpeciesTable species={data} />}
    </>
  )
}
