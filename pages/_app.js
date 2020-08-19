import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import '../styles.css'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Ruru House Herbarium</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
