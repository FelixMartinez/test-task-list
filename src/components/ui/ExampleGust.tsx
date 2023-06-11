import React from 'react';
import { AppProvider, gql } from '8base-react-sdk';

const ExampleGust = () => {
  // 8base api endpoint
  const API_ENDPOINT_URI = "https://api.8base.com/cjxotvdpv006501l68k94dz80";

  // Guest can query specific tables if he is allowed
  const CAT_BREEDS_LIST_QUERY = gql`
    query CatBreedsList {
      catBreedsList {
        items {
          id
          name
        }
      }
    }
  `;

  const CatBreeds = ({ loading, data }: any) => {
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Cat breeds</h2>
        <ul>
          {data.catBreedsList.items.map(({ id, name }: any) => (
            <li key={id}>
              <p key={id}>{name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div>ExampleGust</div>
  );
};

export default ExampleGust;
