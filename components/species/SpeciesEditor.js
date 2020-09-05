import React, { useState } from 'react'
import { useCurrentUser } from '../../lib/hooks'
import { useForm } from 'react-hook-form'
// import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import slug from 'limax'
import { useMutation } from '@apollo/client'
import { SpeciesMutate } from './SpeciesDetail'
export const blankSpecies = [
  {
    name: '', // common english name
    otherCommonNames: '', // maori name
    scientificName: '', // genus, species, varietal
    taxon: '', // family, group etc.
    description: '' // longer description
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

export default function SpeciesEditor ({ species, onSave }) {
  const [user] = useCurrentUser()
  const [msg, setMsg] = useState(null)
  const [speciesMutate, { data }] = useMutation(SpeciesMutate)
  const sp = { ...species }
  delete sp.imageUrl
  const { register, handleSubmit, errors } = useForm(
    {
      defaultValues: species || blankSpecies
    })

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in.
      </div>
    )
  }

  const onSubmit = async data => {
    data.slug = slug(data.name)
    const sp = (species && species._id)
      ? {
        _id: species._id,
        ...data
      }
      : data

    const res = await speciesMutate(
      {
        variables: {
          species: sp
        }
      }
    )

    // if (res.ok) {
    setMsg('New species added')
    setTimeout(() => setMsg(null), 5000)
    onSave(data)
    // }
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
        <h1>Edit Species</h1>
        <label htmlFor='name'>Name</label>
        <input name='name' type='text' className='max-w-sm' placeholder='Olive' ref={register({ required: true })} />
        {errors.name && <span>Gotta have a name</span>}
        <label htmlFor='otherCommonNames'>Other Common Names</label>
        <input name='otherCommonNames' type='text' className='max-w-md' placeholder='e.g maori name' ref={register} />

        <label htmlFor='scientificName'>Scientific Name</label>
        <input name='scientificName' type='text' className='max-w-md' placeholder='Olea europaea' ref={register} />

        <label htmlFor='taxon'>Family or group</label>
        <input name='taxon' type='text' className='max-w-md' placeholder='Olea europaea' ref={register} />

        <label htmlFor='imageUrl'>
            Paste Image imageUrl
        </label>
        <input
          type='url'
          id='imageUrl'
          name='imageUrl'
          ref={register}
        />
        {/* <input
            type='file'
            id='imageUrl'
            name='imageUrl'
            onChange={handlePicInput}
            accept='image/png, image/jpeg'
            // ref={register}
          />
          <ImgDropzone />
           */}

        <label htmlFor='habit'>Growth Habit</label>
        <div className='inline-block relative w-64'>
          <select
            name='habit'
            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            ref={register}
          >
            <option>Grass</option>
            <option>Herb</option>
            <option>Moss</option>
            <option>Lichen</option>
            <option>Shrub</option>
            <option>Tree</option>
            <option>Vine</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
          </div>
        </div>

        <label htmlFor='native'>Native</label>
        <div className='inline-block relative w-64'>
          <select
            name='native'
            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            ref={register}
          >
            <option>native</option>
            <option>Heirloom</option>
            <option>Introduced</option>
            <option>Exotic</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
          </div>
        </div>

        <label htmlFor='flowers'>Flowers</label>
        <input name='flowers' type='text' className='max-w-md' placeholder='blue clusters' ref={register} />
        <label htmlFor='flower_time'>Flowering Time</label>
        <input name='flower_time' type='text' className='max-w-md' placeholder='Spring, Summer' ref={register} />

        <label htmlFor='fruit'>Fruit</label>
        <input name='fruit' type='text' className='max-w-md' placeholder='berries' ref={register} />
        <label htmlFor='fruit_time'>Fruit Time</label>
        <input name='fruit_time' type='text' className='max-w-md' placeholder='Autumn, Winter' ref={register} />

        <label htmlFor='soil'>Soil Texture</label>
        <input name='soil' type='text' className='max-w-md' placeholder='loam, sand, clay' ref={register} />

        <label htmlFor='ph'>pH</label>
        <input name='ph' type='text' className='max-w-md' placeholder='acid, alkaline, neutral' ref={register} />

        <label htmlFor='tolerates'>Tolerates</label>
        <input name='tolerates' type='text' className='max-w-md' placeholder='Drought, Fire, Lime, Moderate frost' ref={register} />

        {/* <Tags
          name='tags'
          tagifyRef={register}
        /> */}
        {/* {
                // settings={settings}  // tagify settings object
          // value="a,b,c"
          // {...tagifyProps}   // dynamic props such as "loading", "showDropdown:'abc'", "value"
          // onChange={e => (e.persist(), console.log("CHANGED:", e.target.value))}

    soils: [], //
    uses: {
      medicinal: '',
      wood: '',
      other: ''
    },
    sun: [],
    pollination: [],
    tags: [],
    links: [] // list of references */}
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
