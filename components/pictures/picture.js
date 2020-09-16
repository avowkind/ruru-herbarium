/*
  makes a GQL request for a picture field in an entity
  outputs an image tag with the URL
  allows drag/drop to update the same picture

  if GQL works the way I think then this component should add the request
  to that managed by any parent.
*/
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ImgDrop from './ImgDrop'

export const SpeciesPictureQuery = gql`
  query species($slug: String!) {
    species(slug: $slug) {
      _id
      imageUrl
    }
  }
`

export const Picture = ({ slug }) => {
  const { loading, error, data, refetch } =
    useQuery(SpeciesPictureQuery, {
      variables: { slug }
    })

  if (loading) return 'loading picture...'
  if (error) return <p className='panel-error'>Failed to load picture {error} </p>
  console.log(data)
  if (!data || !data.species) return ''
  return (
    <div className='relative'>
      <ImgDrop
        collection='species'
        _id={data.species._id}
        className='absolute top-0 left-0'
        onChange={() => refetch()}
      />
      <img className='object-cover' src={data.species.imageUrl} />
    </div>
  )
}

export default Picture
