import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import middleware from '../../../middlewares/middleware';
import { useCurrentUser } from '../../../lib/hooks';
import Posts from '../../../components/post/posts';
import { getUser } from '../../../lib/db';
import ProfileCard from '../../../components/user/ProfileCard'

export default function UserPage({ user }) {
  if (!user) return <Error statusCode={404} />;
  const {
    name, email, bio, profilePicture,
  } = user || {};
  const [currentUser] = useCurrentUser();
  const isCurrentUser = currentUser?._id === user._id;
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <ProfileCard user={user} >
        {isCurrentUser && (
          <Link href="/settings">
            <button className='btn-primary float-right ' type="button">Edit</button>
          </Link>
        )}
        </ProfileCard>
      
      <div className='panel'>
        <h3>My posts</h3>
        <Posts creatorId={user._id} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res);
  const user = await getUser(context.req, context.params.userId);
  if (!user) context.res.statusCode = 404;
  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
}
