import { useAuth } from "8base-react-sdk";
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { setAuthToken, httpLink } from "../apollo";

export const useQueries = (graphql: DocumentNode) => {
  const { data, client } = useQuery(graphql);
  const { authState } = useAuth();

  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }

  return data;
};
