import { useAuth } from "8base-react-sdk";
import { useMutation } from '@apollo/client';
import { httpLink, setAuthToken } from "../shared/apollo";

/**
 * Custom Hook to perform GraphQL mutations.
 * Use `useMutation` from the `@apollo/client` package to perform the mutation.
 * @param {Object} graphql - GraphQL mutation operation.
 * @returns {Object} - Object containing the mutation function (`setEntryMutation`) and the mutation data (`newData`).
 */
export const useMutations = (graphql: any) => {
  /**
   * Cache update function.
   * Updates cache after mutation to reflect changes in data.
   * @param {Object} cache - Apollo cache.
   * @param {Object} data - Mutation data.
   */
  const updateCache = (cache: any, {data}: any) => {
    // Fetch the todos from the cache
    const existingTodos = cache.readQuery({
      query: graphql
    });
    // Add the new todo to the cache
    const newTodo = data.insert_todos.returning[0];
    cache.writeQuery({
      query: graphql,
      data: {todos: [newTodo, ...existingTodos.todos]}
    });
  };

  // Use useMutation to get the mutation function and the mutation data
  const [setEntryMutation, {data, client}] = useMutation(graphql, { update : updateCache });
  // Get the authentication status of the 8base-react-sdk package
  const { authState } = useAuth();

  // Verificar si hay un token de autenticación y configurar el enlace del cliente Apollo
  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }

  // Return the mutation function and the mutation data
  return {setEntryMutation, newData: data};
};
