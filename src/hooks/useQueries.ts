import { useAuth } from "8base-react-sdk";
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { setAuthToken, httpLink } from "../shared/apollo";

/**
 * Custom Hook to perform GraphQL queries.
 * Use `useQuery` from the `@apollo/client` package to perform the query.
 * @param {Object} graphql - GraphQL query operation.
 * @param {Object} variables - Query variables (optional).
 * @returns {Object} - Data from the query.
 */
export const useQueries = (graphql: DocumentNode, variables?: any) => {
  // Use useQuery to get the query and customer data
  const { data, client } = useQuery(graphql, {variables, pollInterval: 500});
  // Get the authentication status of the 8base-react-sdk package
  const { authState } = useAuth();

  // Check for an auth token and configure the Apollo client binding
  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }

  // Return the query data
  return data;
};
