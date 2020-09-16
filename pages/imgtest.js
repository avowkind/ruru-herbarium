import React, { useState } from 'react'
import Head from 'next/head'
// import { useCurrentUser } from '../lib/hooks'
import { withApollo } from '../apollo/client'
import { Picture, PictureWithName } from '../components/pictures/picture'

const ImgSection = () => {
  const [slug, setSlug] = useState('catalpa')
  return (
    <>
      <Head>
        <title>Test Image Upload</title>
      </Head>
      <section className='panel'>
        <h1>Picture</h1>
        <input
          type='text'
          name='picture'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Picture slug={slug} />
      </section>

    </>
  )
}

const Page = () => {
  return (
    <ImgSection />
  )
}

export default withApollo(Page)
