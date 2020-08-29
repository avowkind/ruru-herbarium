import React from 'react'
import { useCurrentUser } from '../lib/hooks'

const IndexPage = () => {
  const [user] = useCurrentUser()

  return (
    <>
      <h1>Home</h1>
      {!user ? (
        <p>Please sign in.</p>
      ) : (
        <p>Hi</p>
      )}
      <div />
    </>
  )
}

export default IndexPage
