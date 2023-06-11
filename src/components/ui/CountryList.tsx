import React, { useEffect } from 'react'
import { GetStaticProps } from 'next';
import { useQuery } from '@apollo/client';

import { initializeApollo, addApolloState, setAuthToken, httpLink } from '@/src/apollo';
import QUERY_COUNTRIES from '@/src/graphql/queryCountries.graphql';
import QUERY_CON from '@/src/graphql/queryUser.graphql';
import { Loading } from './Loading';
import { useAuth } from '8base-react-sdk';

const CountryList = (props: any) => {
  const { authState } = useAuth();
  const { data, loading, error, client } = useQuery(QUERY_CON);

  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }
  // const data: any[] = [];

  if (loading) {
    return <Loading />
  }
  // // check for errors
  // if (error) {
  //   console.log('error: ', error)
  //   return <p> an error happened</p>;
  // }
  // useEffect(() => {
  //   if (authState.token) {
  //     client.setLink(setAuthToken(authState.token).concat(httpLink));
  //   }
  // }, [authState.token, client])
  console.log('data: ', data);
  console.log('props: ', props);


  return (
    <div>
      <h1>Countries</h1>
      {/* let the user know we are fetching the countries */}
      
      <div>
        {/* {data?.items.map((country: any) => (
          <div key={country.id}>{country.name}</div>
        ))} */}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  await client.query({
    query: QUERY_CON,
  });

  return addApolloState(client, {
    props: {},
  });
};

export default CountryList