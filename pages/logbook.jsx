import React from 'react';
import { useCurrentUser } from '../lib/hooks';
import PostEditor from '../components/post/editor';
import Posts from '../components/post/posts';

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <h1>Log Book</h1>
      <div>
        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
