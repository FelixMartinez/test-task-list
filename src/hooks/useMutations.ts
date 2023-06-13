import { useAuth } from "8base-react-sdk";
import { useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';

import { setAuthToken, httpLink } from "../shared/apollo";

export const useMutations = (graphql: any) => {
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

  const [setEntryMutation, {data, client}] = useMutation(graphql, { update : updateCache });
  const { authState } = useAuth();

  if (authState.token) {
    client.setLink(setAuthToken(authState.token).concat(httpLink));
  }

  return {setEntryMutation, newData: data};
};
