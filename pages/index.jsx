import React from 'react';
import { useCurrentUser } from '../lib/hooks';
import PostEditor from '../components/post/editor';
import Posts from '../components/post/posts';

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <h1>Home</h1>
      <div>
      
      </div>
    </>
  );
};

export default IndexPage;
