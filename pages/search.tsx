import { Layout } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Search } from 'views';

const SearchPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Search - Mazury</title>
      </Head>
      <Layout variant="plain">
        <Search />
      </Layout>
    </>
  );
};

export default SearchPage;
