import React, { useRef } from 'react'
import Head from 'next/head'
import { useCurrentUser } from '../lib/hooks'

const ImgSection = () => {
  const profilePictureRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    if (profilePictureRef.current.files[0]) {
      console.log('pip:', profilePictureRef.current.files[0])
      formData.append('file', profilePictureRef.current.files[0])

      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData
      })
      console.log(res)
    }
  }

  return (
    <>
      <Head>
        <title>Test Image Upload</title>
      </Head>
      <section className='panel'>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='avatar'>
            Profile picture
            <input
              type='file'
              id='avatar'
              name='avatar'
              accept='image/png, image/jpeg'
              ref={profilePictureRef}
            />
          </label>
          <button className='btn-primary mt-2 ml-0' type='submit'>Save</button>
        </form>
      </section>

    </>
  )
}

const SettingPage = () => {
  const [user] = useCurrentUser()

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    )
  }
  return (
    <ImgSection />
  )
}

export default SettingPage
