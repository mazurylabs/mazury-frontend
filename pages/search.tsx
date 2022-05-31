import { Layout } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Search } from 'views';
import SearchPage from 'views/Search/SearchPage';

const SearchPagee: NextPage = () => {
  return (
    <>
      <Head>
        <title>Search - Mazury</title>
      </Head>
      <Layout variant="plain">
        <SearchPage />
      </Layout>
    </>
  );
};

export default SearchPagee;
