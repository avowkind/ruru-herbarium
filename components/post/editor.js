import React, { useState } from 'react';
import { useCurrentUser } from '../../lib/hooks';

export default function PostEditor() {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in to post
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      posting: e.currentTarget.posting.value,
    };
    if (!e.currentTarget.posting.value) return;
    e.currentTarget.posting.value = '';
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Posted!');
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>
      <form 
        onSubmit={handleSubmit} 
        className='mb-4' 
        autoComplete="off">
        <label htmlFor="posting">
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name="posting"
            rows="5" 
            placeholder="What did you do today?"
          />
        </label>
        <button 
          type="submit" style={{ marginLeft: '0.5rem' }}
          className="btn-primary my-2"
          >
          Post
        </button>
      </form>
    </>
  );
}
