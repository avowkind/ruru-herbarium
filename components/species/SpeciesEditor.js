import React, { useState } from 'react';
import { useCurrentUser } from '../../lib/hooks';
import { useForm } from "react-hook-form";

export default function SpeciesEditor({onSave}) {
  const [user] = useCurrentUser();
  const [msg, setMsg] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in.
      </div>
    );
  }
  const onSubmit = async data => {

    const res = await fetch('/api/species', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMsg('New species added');
      setTimeout(() => setMsg(null), 5000);
      onSave()
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}
        className='panel' 
        autoComplete="off">
        <h1>New Species</h1>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" className='max-w-sm' placeholder="Olive" ref={register({ required: true })} />
        {errors.name && <span>Gotta have a name</span>}

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="5" 
          placeholder="describe the species"
          ref={register}
        />

        <label htmlFor="otherCommonNames">Other Common Names</label>
        <input name="otherCommonNames" type="text" className='max-w-md' placeholder="e.g maori name" ref={register} />

        <label htmlFor="scientificName">Scientific Name</label>
        <input name="scientificName" type="text" className='max-w-md' placeholder="Olea europaea" ref={register} />

        <label htmlFor="taxon">Family or group</label>
        <input name="taxon" type="text" className='max-w-md' placeholder="Olea europaea" ref={register} />
        
        <label htmlFor="habit">Habit</label>
        <div class="inline-block relative w-64">
          <select name='habit' class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Tree</option>
            <option>Shrub</option>
            <option>Bush</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <label htmlFor="native">Native</label>
        <div class="inline-block relative w-64">
          <select name='native' class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>native</option>
            <option>Heirloom</option>
            <option>Introduced</option>
            <option>Exotic</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
    {/* {
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

        <button 
          type="submit"
          className="block btn-primary my-2"
          >
          Save
        </button>
      </form>
    </>
  );
}
