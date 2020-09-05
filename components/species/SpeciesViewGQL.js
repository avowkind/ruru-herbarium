import SpeciesTable from './SpeciesTable'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const SpeciesQuery = gql`
  query Species {
    specieslist {
      _id
      name
      slug
      scientificName
      otherCommonNames
      habit
    }
  }
`

export default function SpeciesView ({ changed }) {
  const { loading, error, data, refetch } = useQuery(SpeciesQuery)

  if (loading) return 'loading species...'
  if (error) return <p className='panel-error'>Failed to load species</p>
  if (changed) refetch()
  return (
    <>
      {data && <SpeciesTable species={data.specieslist} />}
    </>
  )
}
