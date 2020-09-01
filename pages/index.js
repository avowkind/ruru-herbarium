import React from 'react'
import { useCurrentUser } from '../lib/hooks'
import { withApollo } from '../apollo/client'
import SpeciesView from '../components/species/SpeciesViewGQL'

const IndexPage = () => {
  const [user] = useCurrentUser()

  return (
    <>
      <h1>Home</h1>
      {!user ? (
        <p>Please sign in.</p>
      ) : (
        <SpeciesView />
      )}
      <div />
    </>
  )
}

export default withApollo(IndexPage)
