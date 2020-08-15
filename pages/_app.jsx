import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import '../styles.css'

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
