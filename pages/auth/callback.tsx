import { useEffect, useState } from 'react';

import { useAuth } from '8base-react-sdk';
import ERROR_CODES from '@8base/error-codes';
import { useApolloClient } from '@apollo/client';

import { Loading } from '@/src/components/ui/Loading';
import { useQueries } from '@/src/hooks/useQueries';
import { AUTH_PROFILE_ID } from '@/src/shared/constants';
import { CURRENT_USER_QUERY, USER_SIGN_UP_MUTATION } from '@/src/shared/graphql';
import { useHistory } from 'react-router-dom';

/**
 * Authorizes the user and performs the corresponding actions.
 *
 * @param {Object} param - Parameters to authorize the user.
 * @returns {Promise<boolean>} - A promise indicating whether the user was successfully authorized.
 */
const authorizeUser = async ({ authClient, apolloClient, history, data }: any) => {
  /* Get authResult from auth client after redirect */
  const { idToken, email, firstName, lastName } = await authClient.getAuthorizedData();
  /* Add the idToken to the auth state */
  authClient.setState({ token: idToken });

  const singUpUser = () =>
    apolloClient.mutate({
      mutation: USER_SIGN_UP_MUTATION,
      variables: {
        user: {
          email,
          firstName,
          lastName,
        },
        authProfileId: AUTH_PROFILE_ID,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
  }).then(() => {
    return true;
  }).catch((err: any) => {
    console.log('err: ', err);
    return true;
  });

  apolloClient
    .query({
      query: CURRENT_USER_QUERY,
      errorPolicy: 'all',
    })
    .then(({ errors }: any) => {
      /* Check user exist error */
      if (errors) {
        if (Array.isArray(errors)) {
          if (errors.some((err) => err?.code === ERROR_CODES.UserNotFoundErrorCode)) {
            /* If user does does not exist at 8base - create user */
            return singUpUser();
          }
        }

        if (errors?.code === ERROR_CODES.UserNotFoundErrorCode) {
          /* If user does does not exist at 8base - create user */
          return singUpUser();
        }
      }
    })
    .finally(() => {
      /* Redirect user to root path */
      history.replace('/task/list');
    });
};

/**
 * Callback container.
 *
 * This component is used to authorize the user and perform the corresponding actions after authorization.
 * Redirects the user to the main task page once authorized.
 *
 * @returns {ReactElement} The CallbackContainer component.
 */
export default function CallbackContainer() {
  const { authClient, authState } = useAuth();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const data = useQueries(CURRENT_USER_QUERY);
  
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      authorizeUser({ authClient, apolloClient, history, data });
    }
  }, []);

  return <Loading />;
};
