import React from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import Header from './header'
import Footer from './footer'
const Layout = ({ children }) => {
  const [user, { mutate }] = useCurrentUser();
 
  return (
    <>
      <Head>
        <title>Ruru House Herbarium</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="The Ruru Herbarium is a garden and smallholding management app that helps you to track the plants you have in your garden or smallholding."
        />
        <meta property="og:title" content="Then Ruru Herbarium" />
        <meta
          property="og:description"
          content="The Ruru Herbarium is a garden and smallholding management app that helps you to track the plants you have in your garden or smallholding."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <div className="flex flex-col min-h-screen "> 
      <Header user={user} mutate={mutate} />
      <main className='container mx-auto flex-grow'>{children}</main>
      <Footer />
      </div>
    </>
  );
};

export default Layout
