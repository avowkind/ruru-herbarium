import React, { useState } from 'react'
import { useCurrentUser } from '../../lib/hooks'
import { useForm } from 'react-hook-form'
// import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import slug from 'limax'

export const blankPlant = [
  {
    species: '', // common english name
    purchaseDate: '',
    purchasedFrom: '',
    imageUrl: '',
    cost: 1,
    location: '',
    variety: '',
    plantCount: 1
  }
]

// function ImgDropzone () {
//   const onDrop = useCallback(acceptedFiles => {
//     // Do something with the files
//     console.log('dropped', acceptedFiles)
//   }, [])
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

//   return (
//     <div
//       className='h-20 max-w-sm text-center align-middle bg-gray-200 border'
//       {...getRootProps()}>
//       <input {...getInputProps()} />
//       {
//         isDragActive
//           ? <p>Drop the files here ...</p>
//           : <p>Drag 'n' drop some files here, or click to select files</p>
//       }
//     </div>
//   )
// }

export default function PlantEditor ({ plant, onSave }) {
  const [user] = useCurrentUser()
  const [msg, setMsg] = useState(null)
  const sp = { ...plant }
  delete sp.imageUrl
  const { register, handleSubmit, errors } = useForm(
    {
      defaultValues: plant || blankPlant
    })

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in.
      </div>
    )
  }

  const onSubmit = async data => {
    let res
    if (plant && plant._id) {
      res = await fetch(`/api/plants/${plant._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: plant._id, ...data })
      })
    } else {
      res = await fetch('/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
    if (res.ok) {
      setMsg('New plant added')
      setTimeout(() => setMsg(null), 5000)
      onSave(data)
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='panel'
        autoComplete='off'
      >
        <h1>Edit Plant</h1>
        <label htmlFor='species'>Species</label>
        <input name='species' type='text' className='max-w-sm' placeholder='Ceanothus' ref={register({ required: true })} />
        {errors.name && <span>Gotta have a species</span>}
        <label htmlFor='purchaseDate'>Purchase date</label>
        <input name='purchaseDate' type='text' className='max-w-md' ref={register} />
        <label htmlFor='purchasedFrom'>Purchased from</label>
        <input name='purchasedFrom' type='text' className='max-w-md' ref={register} />
        <label htmlFor='variety'>Variety</label>
        <input name='variety' type='text' className='max-w-md' ref={register} />
        <label htmlFor='plantCount'>Number of plants</label>
        <input name='plantCount' type='number' className='max-w-md' ref={register} />
        <label htmlFor='cost'>Cost</label>
        <input name='cost' type='number' className='max-w-md' placeholder='$' ref={register} />
        <label htmlFor='location'>Where planted</label>
        <input name='location' type='text' className='max-w-md' ref={register} />

        <label htmlFor='imageUrl'>
            Paste Image imageUrl
        </label>
        <input
          type='url'
          id='imageUrl'
          name='imageUrl'
          ref={register}
        />

        <div className='block flex, flex-row'>
          <button
            type='submit'
            className=' btn-primary my-2'
          >
            Save
          </button>
          <button
            onClick={onSave}
            className=' btn-secondary my-2'
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
