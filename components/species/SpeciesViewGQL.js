import SpeciesTable from './SpeciesTable'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const SpeciesQuery = gql`
  query Species {
    species {
      _id
      name
      slug
      scientificName
      otherCommonNames
      habit
    }
  }
`

export default function SpeciesView () {
  const { loading, error, data } = useQuery(SpeciesQuery)

  if (loading) return 'loading species...'
  if (error) return <p className='panel-error'>Failed to load species</p>
  console.log('data', data)
  return (
    <>
      {data && <SpeciesTable species={data.species} />}
    </>
  )
}
